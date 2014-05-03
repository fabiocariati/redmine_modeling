uml.SequenceDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function() {
        dia.ToolbarView.prototype.initialize.apply(this, arguments);

        this.icons = _.union(this.icons, ['lifeline', 'actorlifeline', 'message', 'combinedfragment', 'interactionuse'], this.aftericons);
    },

    lifeline: function() {
        var lifeline = new uml.Lifeline({
            position: { x: 10 },
            name: 'newLifeline'
        });
        this.paper.model.addCell(lifeline);
    },

    actorlifeline: function() {
        var actor_lifeline = new uml.Lifeline({
            position: { x: 10 },
            name: 'newActor',
            subtype: 'Actor'
        });
        this.paper.model.addCell(actor_lifeline);
    },

    message: function() {
       this.paper.tool = uml.Message;
    },

    combinedfragment: function() {
        this.paper.tool = 'uml.CombinedFragment';
    },

    interactionuse: function() {

    }

});