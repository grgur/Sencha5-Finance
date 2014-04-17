/**
 *
 */
Ext.define('Finance.view.overview.StocksPreviewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockspreview',

    requires: [
    	'Finance.model.Stock'
    ],

    stores: {
        stocks: {
            model: 'Finance.model.Stock',

            autoLoad: true,

            sorters  : 'Symbol',

            data: [{
		        Name: 'Apple',
		        Symbol: 'AAPL'
		    }, {
		        Name: 'Google',
		        Symbol: 'GOOG'
		    }, {
		        Name: 'Microsoft',
		        Symbol: 'MSFT'
		    }, {
		        Name: 'Yahoo',
		        Symbol: 'YHOO'
		    }],

		    listeners: {
		    	load: 'loadHistoryCache',
		    	datachanged: 'onDataChanged'
		    }
        }
    }
});
