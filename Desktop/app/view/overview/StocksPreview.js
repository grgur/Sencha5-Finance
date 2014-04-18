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
        width     : 80,
        xtype     : 'widgetcolumn',
        dataIndex : 'Symbol',
        widget    : {
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
        text      : 'Price',
        width     : 80,
        align     : 'right',
        dataIndex : 'Price'
    }, {
        text      : '&#916;',
        width     : 60,
        align     : 'right',
        dataIndex : 'Change'
    }, {
        text      : 'Trend',
        width     : 90,
        dataIndex : 'History',
        xtype     : 'widgetcolumn',
        widget    : {
            xtype : 'sparklineline'
        }
    }]
});
