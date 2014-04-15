Ext.define('Finance.store.Stocks', {
    extend: 'Ext.data.ArrayStore',

    model    : 'Finance.model.Stock',
    autoLoad : true,
    sorters  : 'Symbol',
    
    proxy: {
        type: 'jsonp',
        url: 'https://query.yahooapis.com/v1/public/yql',
        extraParams: {
            format       : 'json',
            diagonostics : false,
            q            : 'select * from yahoo.finance.quote where symbol in ("YHOO","AAPL","GOOG","MSFT")',
            env          : 'store://datatables.org/alltableswithkeys'
        },
        reader: {
            type            : 'json',
            rootProperty    : 'query.results.quote',
            messageProperty : 'error.description'
        }
    },

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
    }]
});
