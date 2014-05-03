uml.MessageView = joint.dia.LinkView.extend({

    initialize: function() {
        joint.dia.LinkView.prototype.initialize.apply(this, arguments);

        this.model.on({
           'change': this.update
        })

    },

    render: function() {
        var children = V(dia.template('Message', 'markup', {}));

        // custom markup may contain only one children
        if (!_.isArray(children)) children = [children];

        // Cache all children elements for quicker access.
        this._V = {} // vectorized markup;
        _.each(children, function(child) {
            var c = child.attr('class');
            c && (this._V[$.camelCase(c)] = child);
        }, this);

        // Only the connection path is mandatory
        if (!this._V.connection) throw new Error('link: no connection path in the markup');

        $(this.el).empty();
        V(this.el).append(children);

        this.renderLabel();
        this.renderTools();

        this.update();

        this.renderVertexMarkers();

        return this;
    },

    update: function() {
        var linepos = this.model.get('linePosition'),
            source =  this.model.get('source'),
            target =  this.model.get('target'),
            sourceView = this.paper.findViewByModel(source.id),
            sourceBox = sourceView.$('.main-reference')[0].getBBox(),//ver qual main
            targetView = this.paper.findViewByModel(target.id),
            targetBox = targetView.$('.main-reference')[0].getBBox(),
            sourcePosition = sourceView.model.get('position'),
            targetPosition = targetView.model.get('position');


        // Update attributes.
        _.each(this.model.get('attrs'), function(attrs, selector) {
            var $selected = this.findBySelector(selector);
            $selected.attr(attrs);
        }, this);

        // Update life rect
        this._V.lifeRectSource.attr({
            width:10, height: 50,
            x: sourcePosition.x + (sourceBox.width/2) - 5, y: linepos
        })

        if(source.id != target.id) {
            if(targetPosition.x - sourcePosition.x >= sourceBox.width/2 - targetBox.width/2) {
                var disp = -5;
            } else {
                var disp = 5;
            }

            this._V.markerTarget.translateAndAutoOrient({ x: targetPosition.x + (targetBox.width/2) + disp, y: linepos }, { x: sourcePosition.x, y: linepos }, this.paper.viewport);

            this._V.lifeRectTarget.attr({
                width: 10, height: 30,
                x: targetPosition.x + (targetBox.width/2) - 5, y: linepos
            })

            var pathData = [
                'M', sourcePosition.x + sourceBox.width/2, linepos,
                targetPosition.x + targetBox.width/2, linepos
            ].join(' ');
        } else {
            this._V.markerTarget.translateAndAutoOrient({ x: targetPosition.x + (targetBox.width/2) + 25, y: linepos + 25 }, { x: sourcePosition.x + 60 , y: linepos + 25 }, this.paper.viewport);

            this._V.lifeRectTarget.attr({
                width: 10, height: 20,
                x: targetPosition.x + (targetBox.width/2) + 5, y: linepos + 15
            })

            var pathData = [
                'M', sourcePosition.x + sourceBox.width/2, linepos,
                targetPosition.x + 50 + targetBox.width/2, linepos,
                targetPosition.x + 50 + targetBox.width/2, linepos + 15 + 10,
                targetPosition.x + targetBox.width/2, linepos + 15 + 10,
            ].join(' ');
        }

        this._V.connection.attr('d', pathData);
        this._V.connectionWrap.attr('d', pathData);

        this.updateLabelPosition();

        this.updateToolsPosition();
    },

    updateLabelPosition: function() {
        var connectionElement = this._V.connection.node;
        var connectionLength = connectionElement.getTotalLength();

        var labelCoordinates = connectionElement.getPointAtLength(connectionLength / 2);

        if(this.model.get('source').id == this.model.get('target').id) {
            this._labelCache.attr('transform', 'translate(' + (labelCoordinates.x - 15) + ', ' + (labelCoordinates.y - 32.5) + ')');
        } else {
            this._labelCache.attr('transform', 'translate(' + labelCoordinates.x + ', ' + (labelCoordinates.y - 20) + ')');
        }
    },

    renderLabel: function() {
        var labelTemplate = _.template(this.model.labelMarkup);

        var labelNode = V(labelTemplate()).node;
        // Cache label nodes so that the `updateLabels()` can just update the label node positions.
        this._labelCache = V(labelNode);

        var $text = $(labelNode).find('text');

        $text.attr({ 'text-anchor': 'middle' });

        V($text[0]).text(this.model.get('name'));

        this.$('.labels').append(labelNode);
    },

    pointermove: function(evt, x, y) {
        if(this.paper.tool == 'dragger') {
            this.model.set('linePosition', y)
        } else if(this.paper.tool == uml.Message) {
            alert('implementar')
        }
    }

});

