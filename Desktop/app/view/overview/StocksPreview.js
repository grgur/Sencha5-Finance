Ext.define('Finance.view.overview.StocksPreview', {
    extend   : 'Ext.grid.Panel',
    requires : [
        'Ext.grid.column.Action',
        'Finance.view.overview.StocksPreviewModel',
        'Finance.view.overview.StocksPreviewController',
        'Ext.window.MessageBox',
        'Ext.sparkline.Bar',
        'Ext.sparkline.Line'
    ],

    xtype : 'stockspreviewgrid',

    controller : 'stockspreview',
    viewModel  : 'stockspreview',
    
    bind             : '{stocks}',
    collapsible      : true,
    title            : 'Stocks',

    viewConfig: {
        stripeRows          : true,
        enableTextSelection : false
    },

    listeners: {
        // select: 'onCustomEvent',
        scope: 'controller'
    },

    columns : [{
        text      : 'Button',
        width     : 105,
        xtype     : 'widgetcolumn',
        dataIndex : 'Symbol',
        widget    : {
            width   : 90,
            xtype   : 'button',
            itemId  : 'smybolclicker',
            ui      : 'cell',
            // listeners: {
            //     click: 'onSymbolClick',
            //     scope: 'controller'
            // }
            // handler: 'onSymbolClick',
            // scope : 'controller'
            // handler : function (btn) {
            //     debugger;
            //     var rec = btn.getWidgetRecord();
            //     Ext.Msg.alert("Button clicked", "Hey! " + rec.get('Name'));
            // }
        }
    }, {
        text      : 'Change',
        width     : 100,
        dataIndex : 'Change'
    }, {
        text      : 'Trend',
        width     : 100,
        dataIndex : 'History',
        xtype     : 'widgetcolumn',
        widget    : {
            xtype : 'sparklineline'
        }
    }]
});
