uml.InteractionUse = dia.Element.extend({

    defaults: joint.util.deepSupplement({
        type: 'uml.InteractionUse',

        attrs: {
            'rect': { fill: 'none', stroke: 'black' },
            'polygon': { ref: 'rect', fill: 'white', 'fill-opacity': 0.85 },
            'text': { text: '', ref: 'rect', x: 2, y: 2,  fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-interactionuse-operator': {
                'font-size': 14, 'font-family': 'Times New Roman', fill: '#000000'
            }
        }
    }, dia.Element.prototype.defaults)
});