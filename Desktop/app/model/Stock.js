Ext.define('Finance.model.Stock', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Number',
        'Ext.data.field.String'
    ],

    fields: [
        'AverageDailyVolume',
        'DaysLow',
        'DaysHigh',
        'YearLow',
        'YearHigh',
        'MarketCapitalization',
        'LastTradePriceOnly',
        'DaysRange',
        'Name',
        'Volume',
        'StockExchange',
        'History',
        {
            name: 'Change',
            type: 'float'
        },
        {
            name: 'Symbol',
            type: 'string',
            sortDir: 'ASC'
        },

    ]
});
