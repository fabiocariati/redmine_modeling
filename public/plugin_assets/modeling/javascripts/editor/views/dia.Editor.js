dia.Editor = Backbone.View.extend({
    initialize: function() {
        this.specifications = this.options.specifications;
        this.render();
    },

    render: function() {
        this.$el.append(dia.template("Editor", "body", {}));

        dia.setDialogEventLink();
    },

    showSpecification: function(id, graph_id) {
        var self = this;
        this.app.currentSpecification = this.specifications.get(id);

        if(!this.app.currentSpecification._is_loaded) {
            this.createViewForSpecification(this.app.currentSpecification);

            if(this.app.currentSpecification.get("id") == 'specification_example') {
                var graphs = dia.graphs([examples.classGraph, examples.activityGraph, examples.sequenceGraph, examples.stateGraph, examples.userCaseGraph])
                this.app.currentSpecification.addGraphs(graphs);
            } else {
                var graphs = [];
                this.app.currentSpecification.get("graphs").fetch({
                    success: function(model, resp) { //Todo ver fromJSON, acho que é melhor
                        _.each(resp, function(r){
                            var graph = self.app.currentSpecification.get("graphs").get(r.id);
                            var cells = r.cells;
                            _.each(cells, function(c){
                                c.id = c.id+"";
                                var types = c.type.split("."),
                                    module = types[0], entity = types[1];
                                graph.addCell(new window[module][entity](c)); //Todo: Tirar uml.Class e deixar genérico
                            })
                        })
                        self.changeTo('paper', graph_id);
                    }
                })
            }

            this.app.currentSpecification._is_loaded = true;
        }
        this.changeTo('specification', id);
    },

    showDiagram: function(specification_id, id){
        this.showSpecification(specification_id, id);
        this.changeTo('paper', id);
    },

    showSpecificationsList: function() {
        var self = this;
        $(".custom-modal").attr("id", "show_specifications")

        $(".custom-modal").html(dia.template('Specification', 'show', {
            specifications: this.specifications.models
        }))

        dia.setDialogEventLink();

        $(".custom-modal").find(".btn-danger").click(function(){
            var id = $(this).closest("tr").attr("specification");
            self.specifications.get(id).destroy({
                success: function() {
                    self.showSpecificationsList();
                },
                error: function() {

                }
            })
        });
    },

    showNewSpecificationDialog: function(app) {
        var self = this;
        $(".custom-modal").attr("id", "new_specification")

        $(".custom-modal").html(dia.template('Specification', 'edit',
            {
                specification: { name: "", type: "" }
            }
        ))
        $("#save_specification_buttom").click(function(evt){
            var $div = $("#save_specification");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;

            var specification = new dia.Specification({
                type: type,
                name: name,
                project_id: 1
            })

            specification.save(null, {
                success: function (model, resp) {
                    model.id = resp.id; //Todo: mudar isso
                    self.createViewForSpecification(model);
                    model._is_loaded = true;
                    self.specifications.add(model);
                    app.navigate("edit/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
                    log(resp.responseText)
                }
            });
        })
    },

    showEditSpecificationDialog: function(app, id) {
        var self = this;
        $(".custom-modal").attr("id", "edit_specification/" + id)

        var specification = this.specifications.get(id);

        $(".custom-modal").html(dia.template('Specification', 'edit',
            {
                specification:
                {
                    name: specification.get("name"),
                    type: specification.get("type")
                }
            }
        ))

        $("#save_specification_buttom").click(function(evt){
            var $div = $("#save_specification");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;

            specification.set("type", type);
            specification.set("name", name);

            // Update
            specification.save(null, {
                success: function (model, resp) {
                    model.id = resp.id; //Todo: mudar isso
                    self.updateViewForSpecification(model);
                    model._is_loaded = true;
                    app.navigate("edit/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
                    log(resp.responseText)
                }
            });
        })
    },

    showNewDiagramDialog: function() {
        var self = this;
        $(".custom-modal").attr("id", "new_diagram")

        $(".custom-modal").html(dia.template('Specification', 'edit_diagram', {
            specifications: this.specifications.models,
            graph: { name: "", type: "" }
        }))

        $("#save_diagram_buttom").click(function(evt){
            var $div = $("#save_diagram");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;

            var graph = new dia.Graph({
                type: type,
                name: name,
                specification_id: self.app.currentSpecification.get("id")
            })

            graph.save(null, {
                success: function (model, resp) {
                    self.app.navigate("graph/" + model.get("specification_id") + "/" + resp.id, { trigger: true, replace: true });
                    self.app.currentSpecification.addGraph(graph);
                },
                error: function(model, resp) {
                    log(resp.responseText)
                }
            });
        })
    },

    showEditDiagramDialog: function(id) {
        var self = this;

        var graph = self.app.currentSpecification.get("graphs").get(id);

        $(".custom-modal").attr("id", "edit_diagram/" + id)

        $(".custom-modal").html(dia.template('Specification', 'edit_diagram', {
            specifications: this.specifications.models,
            graph: { name: graph.get("name"), type: graph.get("type") }
        }))

        $("#save_diagram_buttom").click(function(evt){
            var $div = $("#save_diagram");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;

            graph.set("type", type);
            graph.set("name", name);

            // Update
            graph.save(null, {
                success: function (model, resp) {
                    self.app.navigate("graph/" + model.get("specification_id") + "/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
                    log(resp.responseText)
                }
            });
        })
    },

    changeTo: function(type, id) {
        if(id == 'body'){
            $('.paper').hide();
            // Todo: implementar a visualização da especificação
        } else {
            $('.'+type).hide();
            $('#'+type+'_'+ id).show();
        }
    },

    createViewForSpecification: function(specification) {
        this.$el.append('<div id="specification_' + specification.get('id') + '" class="specification" />')

        var view = new dia.SpecificationView({
            el: "#specification_" + specification.get("id"),
            model: specification
        })

        view.render();

        this.changeTo('specification', 'body');
    },

    updateViewForSpecification: function(specification) {
        this.$el.find("#specification_" + specification.get('id')).html("");

        var view = new dia.SpecificationView({
            el: "#specification_" + specification.get("id"),
            model: specification
        })

        view.render();
        view.updateSideBar();

        this.changeTo('specification', 'body');
    }
});