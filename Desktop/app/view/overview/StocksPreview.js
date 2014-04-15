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

    xtype    : 'stockspreviewgrid',

    controller: 'stockspreview',
    viewModel: 'stocksprview',
    
    store            : 'Stocks',
    collapsible      : true,
    title            : 'Stocks',
    trackMouseOver   : false,
    disableSelection : true,

    viewConfig: {
        stripeRows: true,
        enableTextSelection: false
    },

    initComponent: function () {
        var me = this;

        me.columns = [{
            text: 'Button',
            width: 105,
            xtype: 'widgetcolumn',
            dataIndex: 'Symbol',
            widget: {
                width: 90,
                xtype: 'button',
                ui: 'cell',
                handler: function (btn) {
                    var rec = btn.getWidgetRecord();
                    Ext.Msg.alert("Button clicked", "Hey! " + rec.get('Name'));
                }
            }
        }, {
            text: 'Line',
            width: 100,
            dataIndex: 'Change',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklineline',
                tipTpl: 'Value: {y:number("0.00")}'
            }
        }, 
        // {
        //     text: 'Bar',
        //     width: 100,
        //     dataIndex: 'change',
        //     xtype: 'widgetcolumn',
        //     widget: {
        //         xtype: 'sparklinebar'
        //     }
        // }
        ];

        me.callParent();
        window.store = this.store;
    }
});
