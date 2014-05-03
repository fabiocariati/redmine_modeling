uml.UseCaseView = dia.ElementView.extend({

    initialize: function() {
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);
    },

    pointerup: function(evt, x, y) {
        //
        if (this.paper.tool == 'dragger') {
            dia.ElementView.prototype.pointerup.apply(this, arguments);
        } else if(this.paper.isToolLink()) {
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            if(target) {
                var targetType = target.model.get('type');
                if(this.paper.tool == uml.Include || this.paper.tool == uml.Extends) {
                    if(targetType == 'uml.UseCase') {
                        this.paper.addLinkToTheTarget(this, target);
                    } else {
                        this.paper.removeVirtualTools();
                    }
                } else if(this.paper.tool == uml.Association) {
                    if(targetType == 'uml.Actor') {
                        this.paper.addLinkToTheTarget(this, target);
                    } else {
                        this.paper.removeVirtualTools();
                    }
                }
            } else {
                this.paper.removeVirtualTools();
            }
        }
    }
});