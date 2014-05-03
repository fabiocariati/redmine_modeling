var AppRoutes = Backbone.Router.extend({

    initialize: function(options) {
        this.editor = options.editor;
        this.editor.app = this;
    },

    routes: {
        'show_specifications': "showSpecifications",
        'new_specification': "newSpecification",
        'new_diagram': "new_diagram",
        'edit/:id': "edit",
        'graph/:specification/:id': "showDiagram",
        'examples': "editExamples"
    },

    showSpecifications: function() {
        this.editor.showSpecificationsList();
    },

    newSpecification: function() {
        this.editor.showNewSpecificationDialog(this);
    },

    new_diagram: function() {
        this.editor.showNewDiagramDialog();
    },

    edit: function(id) {
        this.editor.showSpecification(id);
    },

    showDiagram: function(specification_id, id) {
        this.editor.showDiagram(specification_id, id);
    }

});