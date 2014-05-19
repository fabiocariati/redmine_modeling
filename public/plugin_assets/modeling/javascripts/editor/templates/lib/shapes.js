shapes = {
    rect_border: _.template(
        '<g class="uml-class-tools-background">'+
            '<path style="fill:#1E90FF; opacity: 0.3;" d="'+
            'M-<%= borderWidth %>,-<%= borderWidth %>'+
            'V<%= height+borderWidth %>'+
            'h<%= width+(borderWidth*2) %>'+
            'V-<%= borderWidth %>'+
            'M<%= width-4 %>,<%= height-4 %>'+
            'H4 V4 h<%= width-8 %>" />'+
        '</g>'
    ),

    bar_rect_icon:
        '<rect width="22.5" height="22.5" y="-.8" x="-1" rx="2" ry="2" style="fill:#EDF4F7;stroke:blue;stroke-width:.06" />' +
        '<rect class="icon-select" width="22.5" height="22.5" y="-.8" x="-1" rx="2" ry="2" style="fill:#E0E6F8;stroke:black;stroke-width:1; display:none" />' +
        '<rect class="icon-focus" width="22.5" height="22.5" y="-.8" x="-1" rx="2" ry="2" style="fill:#E0E6F8; display:none" />',

    rect_select: '<rect style="stroke-width:1; stroke:blue; stroke-opacity:0.3; fill:blue; fill-opacity:0.1" />',

    arrow: _.template(
        '<polygon transform="scale(<%= scale %>) translate(10,15)" id="arrow-10-icon" ' +
            'points="462,256.001 270.662,123.732 270.662,225.137 50,225.137 50,286.863 270.662,286.863 270.662,388.268 ">' +
        '</polygon>'
    ),

    plus: _.template('<polygon fill="<%= color %>" points="10,4 6,4 6,0 4,0 4,4 0,4 0,6 4,6 4,10 6,10 6,6 10,6"/>'),

    settings: '<path fill="white" transform="scale(.5) translate(29, -16)" ' +
            'd="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>',

    remove: _.template(
        '<path fill="<%= color %>" transform="scale(.8) translate(-16.2, -16.2)" ' +
            'd="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>'
    ),

    save: '<path transform="scale(.04)" ' +
            'd= "M285.666,102.333h43V180h-43V102.333z M456,123v339H56V50h327L456,123z M150.5,202H354V80H150.5V202z M398.333,269.666H113.667v159.666h284.666V269.666z" />',

    undo: '<path transform="scale(.04)" ' +
        'd= "M358.015,445.368C537.294,217.01,266.97,85.223,164.091,215.34l42.175,42.176H50V101.363l38.633,38.521 C317.602-77.554,626.059,238.543,358.015,445.368z" />',

    redo: '<path transform="scale(.04)" ' +
        'd= "M423.367,139.884L462,101.364v156.152H305.734l42.175-42.176 c-102.878-130.117-373.203,1.67-193.923,230.027C-114.058,238.544,194.399-77.554,423.367,139.884z" />',

    zoomin: '<path transform="scale(.04)" d= "M460.475,408.443L351.4,299.37c15.95-25.137,25.2-54.923,25.2-86.833'+
        'C376.601,122.914,303.687,50,214.062,50c-89.623,0-162.537,72.914-162.537,162.537s72.914,162.537,162.537,162.537' +
        'c30.326,0,58.733-8.356,83.055-22.876L406.918,462L460.475,408.443z M96.315,212.538c0-64.927,52.819-117.748,117.746-117.748' +
        'c64.926,0,117.748,52.821,117.748,117.748c0,64.926-52.822,117.747-117.748,117.747C149.135,330.285,96.315,277.464,96.315,212.538z' +
        'M282.276,231.882h-47.729v47.729h-36.859v-47.729h-47.73v-36.86h47.73v-47.729h36.859v47.729h47.729V231.882z" />',

    zoomout: '<path transform="scale(.04)" d= "M460.475,408.443L351.4,299.37c15.95-25.137,25.2-54.923,25.2-86.833'+
        'C376.601,122.914,303.687,50,214.062,50c-89.623,0-162.537,72.914-162.537,162.537s72.914,162.537,162.537,162.537'+
        'c30.325,0,58.732-8.356,83.055-22.876L406.918,462L460.475,408.443z M96.315,212.538c0-64.927,52.819-117.748,117.746-117.748'+
        'c64.926,0,117.748,52.821,117.748,117.748c0,64.926-52.822,117.747-117.748,117.747C149.135,330.285,96.315,277.464,96.315,212.538z'+
        'M282.276,231.882H149.957v-36.86h132.319V231.882z" />',

    cursor: '<polygon transform="scale(.04)" points="121.5,50 390.4,260.8 275.6,280.3 348.6,429 281.6,462 208,311.6 121.5,390 "></polygon>',

    note: '<path transform="scale(.58) translate(2,2)" ' +
        'd="M19.883,5.71H2.746c-0.163,0-0.319,0.071-0.435,0.188c-0.118,0.117-0.18,0.272-0.18,0.435v18.364c0,0.164,0.063,0.318,0.18,0.436c0.123,0.117,0.287,0.18,0.435,0.18h25.75c0.164,0,0.324-0.066,0.438-0.18c0.118-0.114,0.182-0.273,0.182-0.436V14.551c-0.002-0.102-0.01-0.188-0.021-0.271c-0.186-1.543-1.543-3.424-3.236-5.168C24.039,7.31,21.869,5.753,19.883,5.71zM26.914,12.314c-0.008-0.005-0.019-0.007-0.029-0.01c-1.092-0.293-2.33-0.355-3.199-0.355c-0.162,0-0.312,0.002-0.445,0.004c-0.037-0.604-0.129-1.604-0.356-2.625c-0.11-0.461-0.246-0.94-0.433-1.42c0.857,0.541,1.748,1.264,2.535,2.068C25.74,10.718,26.41,11.551,26.914,12.314zM3.365,6.947h16.517c0.058,0,0.12,0,0.183,0.004c0.694,0.105,1.307,1.221,1.616,2.646c0.335,1.484,0.354,2.997,0.354,3l0.007,0.656l0.651-0.051c0,0,0.398-0.027,0.99-0.025c0.809,0,1.977,0.062,2.871,0.312c0.939,0.275,1.352,0.635,1.326,1.051h0.002v9.542H3.365V6.951V6.947z" />',

    arrowhead: '<path transform="scale(.5) translate(35,30 ) rotate(180)" fill="white" stroke="black" d="M 20 0 L 0 10 L 20 20 z" />',

    headlozenge: _.template('<path transform="scale(.4) translate(10,15)" fill="<%= color %>" stroke="black" d="M 40 10 L 20 20 L 0 10 L 20 0 z" />'),

    startnode: '<circle cx="10" cy="10.4" r="8" fill="black "/>',

    endnode:
        '<circle cx="10" cy="10.4" r="8" fill="white" stroke="black" />' +
        '<circle cx="10" cy="10.4" r="5" fill="black" />',

    fragment:
        '<rect width="16.5" height="11" y="5" x="2" style="fill:white;stroke:black;stroke-width:1" />' +
        '<line x1="2" y1="9" x2="8" y2="9" style="stroke:black;stroke-width:1"/>' +
        '<line x1="8" y1="9" x2="10" y2="7" style="stroke:black;stroke-width:1"/>' +
        '<line x1="10" y1="7" x2="10" y2="5" style="stroke:black;stroke-width:1"/>',

    sendsignal: '<path d="M 0 0 <%= width + 10 %> 0 <%= width + 10 %> 0 <%= width + 30 %> 15 <%= width + 30 %> 15 <%= width + 10 %> 30 <%= width + 10 %> 30 0 30 0 30 0 0" style="fill:white; stroke: black; stroke-width:<%= stroke %>;" />',

    acceptevent: '<path d="M 0 0 <%= width + 10 %> 0 <%= width + 10 %> 0 <%= width + 10 %> 30 <%= width + 10 %> 30 0 30 0 30 15 15 15 15 0 0" style="fill:white; stroke: black; stroke-width:<%= stroke %>;" />',

    accepttime: '<path d="M 0 0 30 0 30 0 15 15 15 15 30 30 30 30 0 30 0 30 15 15 15 15 0 0" style="fill:white; stroke: black; stroke-width:<%= stroke %>;" />',

    sendrepo: '<path d="M176.161,327.119v-21.013c9.024-1.684,18.373-4.224,29.349-7.942l8.021,19.293C200.559,322.035,188.166,325.363,176.161,327.119z M325.023,250.828l29.307-33.891l-29.307-28.233V250.828z M248.558,152.921l61.875,15.036l89.688-61.98l-66.914,70.609l67.903,64.363L454.38,50L248.558,152.921z M283.177,280.598c7.904-5.624,15.558-11.619,22.874-17.923v-28.243c-9.593,9.438-20.051,18.325-31.078,26.441L283.177,280.598z M225.127,290.223l7.998,19.228c10.964-4.921,21.815-10.685,32.365-17.152l-8.09-19.453C246.915,279.432,236.085,285.28,225.127,290.223zM327.623,294.486c0,10.701,0,32.946,0,37.369c0,53.37-65.892,31.989-65.892,31.989s20.175,64.336-29.593,64.336c-27.11,0-40.638,0-140.698,0V136.951h121.957c32.558-16.279,38.719-19.36,67.636-33.82H57.62V462h175.035c57.634,0,128.787-75.309,128.787-127.225v-79.397C347.686,271.286,343.801,275.778,327.623,294.486z" />'

}