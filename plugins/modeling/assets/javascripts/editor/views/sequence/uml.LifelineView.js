uml.LifelineView = dia.ElementView.extend({

    initialize: function() {
        var self = this;
        this.createTextFieldFor('name');
        _.bindAll(this, 'updateSize');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:name', function() {
            self.updateSize();
            self.trigger('change:attrs');
        });
    },

    render: function() {
        var subtype = !_.isUndefined(this.model.get('subtype')) &&  this.model.get('subtype') ?  this.model.get('subtype') : '';

        V(this.el).append(
            V(dia.template(subtype + 'Lifeline', 'markup', { lineY: 40 }))
        );

        if(subtype == 'Actor') {
            this.model.get('attrs').text['ref-y'] = .99
        } else {
            this.model.get('attrs').text['y-alignment'] = 'middle'
        }

        this.update();
        this.resize();
        this.translate();

        this.updateSize();
        return this;
    },

    updateSize: function() {
        var width = this.$('text')[0].getBBox().width + 20;
        if(this.model.get('subtype') != 'Actor') {
            this.$('.main-reference').attr('width', width);
            this.$('.lifeline').attr('x1', width/2).attr('x2', width/2);
        }
    },

    pointermove: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
            if(!this.pointerMoving) this.model.toFront();
            this.pointerMoving = true;

            var messages = _.filter(this.paper.model.get('cells').models, function(model) {
                return model.get('type') == 'uml.Message';
            })
            _.each(messages, function(msg) {
                msg.toFront();
            })
        } else if(this.paper.isToolLink()) {
            var disp = this.model.get('subtype') == 'Actor' ? 5 : this.getBBox().width / 2
            this.paper.virtualSource.position(this.model.get('position').x + disp, y);
            this.paper.moveLink(this, x, y);
        }
        this.pointerMoving = true;
    },

    pointerup: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            dia.ElementView.prototype.pointerup.apply(this, arguments);
        } else if(this.paper.isToolLink()) {
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            if(target && target.model) {
                var message = new uml.Message({
                    source: { id: this.model.id },
                    target: { id: target.model.id },
                    linePosition: y,
                    name: 'newMessage',
                    age: 'new'
                });
                this.paper.model.addCell(message);
            } else {
                var message = new uml.Message({
                    source: { id: this.model.id },
                    target: { id: this.model.id },
                    linePosition: y,
                    name: 'newSelfMessage',
                    age: 'new'
                });
                this.paper.model.addCell(message);
            }
            this.paper.removeVirtualTools();
        }
    },

    pointerdown: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
        } else if (this.paper.isToolLink()){
            // Cria um link virtual
            this.paper.virtualTarget.position(x, y);

            this.paper.currentLink = new uml.Association({
                source: { id: this.paper.virtualSource.id },
                target: { id: this.paper.virtualTarget.id }
            });
            this.paper.model.addCells([this.paper.virtualSource, this.paper.virtualTarget, this.paper.currentLink]);
            var disp = this.model.get('subtype') == 'Actor' ? 5 : this.getBBox().width / 2
            this.paper.virtualSource.position(this.model.get('position').x + disp, y);
        }
    }
});