Ext.define('Finance.model.Stock', {
    extend: 'Ext.data.Model',
    fields: [
        'AverageDailyVolume',
        'Change',
        'DaysLow',
        'DaysHigh',
        'YearLow',
        'YearHigh',
        'MarketCapitalization',
        'LastTradePriceOnly',
        'DaysRange',
        'Name',
        'Symbol',
        'Volume',
        'StockExchange'
    ]
});
