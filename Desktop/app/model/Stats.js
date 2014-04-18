Ext.define('Finance.model.Stats', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'MarketCap',
			mapping: 'MarketCap.content'
		}
	],

	proxy: {
        type: 'jsonp',
        url: 'https://query.yahooapis.com/v1/public/yql',
        extraParams: {
            format       : 'json',
            diagonostics : false,
            q            : 'SELECT * FROM yahoo.finance.keystats WHERE symbol="AAPL"',
            env          : 'store://datatables.org/alltableswithkeys'
        },
        reader: {
            type            : 'json',
            rootProperty    : 'query.results.stats',
            messageProperty : 'error.description'
        }
    },

    loadSymbol: function () {

    }
});