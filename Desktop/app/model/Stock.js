Ext.define('Finance.model.Stock', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Number',
        'Ext.data.field.String'
    ],

    fields: [
        'Name',
        'StockExchange',
        {
            name: 'History'
        },
        {
            name: 'Change',
            type: 'float'
        },
        {
            name: 'Symbol',
            type: 'string',
            sortDir: 'ASC'
        },

    ],

    proxy: {
        type: 'jsonp',
        url: 'https://query.yahooapis.com/v1/public/yql',
        extraParams: {
            format       : 'json',
            diagonostics : false,
            q            : 'select Symbol, Name, Change from yahoo.finance.quote where symbol in ("YHOO","AAPL","GOOG","MSFT")',
            env          : 'store://datatables.org/alltableswithkeys'
        },
        reader: {
            type            : 'json',
            rootProperty    : 'query.results.quote',
            messageProperty : 'error.description'
        }
    }
});
