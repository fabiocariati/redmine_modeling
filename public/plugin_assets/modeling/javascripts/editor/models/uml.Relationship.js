// General

dia.Link = joint.dia.Link.extend({
    initialize: function() {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
        this.attributes.superType = 'Link';
    }
});


uml.Association = dia.Link.extend({
    defaults: { type: 'uml.Association' }
});

// Class diagram

uml.Generalization = dia.Link.extend({
    defaults: {
        type: 'uml.Generalization',
        attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' }}
    }
});

uml.Implementation = dia.Link.extend({
    defaults: {
        type: 'uml.Implementation',
        attrs: {
            '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
            '.connection': { 'stroke-dasharray': '3,3' }
        }
    }
});

uml.Aggregation = dia.Link.extend({
    defaults: {
        type: 'uml.Aggregation',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white' }}
    }
});

uml.Composition = dia.Link.extend({
    defaults: {
        type: 'uml.Composition',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black' }}
    }
});

// State Machine diagram

uml.Transition = dia.Link.extend({
    defaults: {
        type: 'uml.Transition',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        }
    }
});

// Use case Diagram

uml.Include = dia.Link.extend({
    defaults: {
        type: 'uml.Include',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        },
        labels: [
            { position: .5, attrs: { text: { text: 'Include' } } }
        ]
    }
});

uml.Extends = dia.Link.extend({
    defaults: {
        type: 'uml.Extends',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        },
        labels: [
            { position: .5, attrs: { text: { text: 'Extend' } } }
        ]
    }
});

// Sequence Diagram

uml.Message = dia.Link.extend({
    defaults: {
        type: 'uml.Message',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        },
        linePosition: 100
    }
});


