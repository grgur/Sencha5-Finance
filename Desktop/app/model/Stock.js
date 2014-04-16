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
            name: 'History',
            defaultValue: 'AAAAAAA'
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

    ]
});
