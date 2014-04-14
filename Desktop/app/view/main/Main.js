/**
 * Main Viewport
 */
Ext.define('Finance.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'mainviewport',

    requires: [
        'Finance.view.overview.StocksPreview'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            xtype: 'stockspreviewgrid'
        }]
    }]
});
