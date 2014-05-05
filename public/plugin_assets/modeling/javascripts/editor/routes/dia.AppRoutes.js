var AppRoutes = Backbone.Router.extend({

    initialize: function(options) {
        this.editor = options.editor;
        this.editor.app = this;
    },

    routes: {
        'show_specifications': "showSpecifications",
        'new_specification': "newSpecification",
        'edit_specification/:id': "editSpecification",
        'new_diagram': "newDiagram",
        'edit_diagram/:id': "editDiagram",
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

    editSpecification: function(id) {
        this.editor.showEditSpecificationDialog(this, id);
    },

    newDiagram: function() {
        this.editor.showNewDiagramDialog();
    },

    editDiagram: function(id) {
        this.editor.showEditDiagramDialog(id);
    },

    edit: function(id) {
        this.editor.showSpecification(id);
    },

    showDiagram: function(specification_id, id) {
        this.editor.showDiagram(specification_id, id);
    }

});