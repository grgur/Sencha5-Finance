Ext.define('Finance.store.Stocks', {
    extend: 'Ext.data.ArrayStore',

    model    : 'Finance.model.Stock',
    autoLoad : true,
    sorters  : 'Symbol',

    historyCache: [],
    
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
    }],

    constructor: function (config) {
        var me = this;

        me.callParent(arguments);
        me.on('load', me.loadHistory, me, {single: true});
    },

    /**
     * Load historical data for each stock from YQL
     * @return {[type]} [description]
     */
    loadHistory: function () {
        var me = this,
            proxy = me.getProxy(),
            params = Ext.clone(proxy.getExtraParams()),
            symbols = [];

        me.each(function (rec) {
            symbols.push('"' + rec.get('Symbol') + '"');
        });

        params.q = 'select Close, Symbol from yahoo.finance.historicaldata where symbol in (' + symbols.join(',') + ')  and startDate = "2014-04-05" and endDate = "2014-04-15"';

        Ext.data.JsonP.request({
            url : proxy.getUrl(),
            params: params,
            success: me.onHistorySuccess,
            failure: me.onHistoryFailure,
            scope: me
        });

        // reset cache
        me.historyCache.length = 0;
    },

    onHistorySuccess: function (res) {
        var me = this,
            results;

        // make sure the entire object structure exists
        if (Ext.isObject(res) && Ext.isObject(res.query) && Ext.isObject(res.query.results)) {
            results = res.query.results.quote;
        } else {
            return me.onHistoryFailure(res.error ? res.error.description : 'Something happened on the way to haven.');
        }

        // go through data and add them to the History field for each
        me.each(me.parseHistory.bind(me, results, me));
    },

    parseHistory: function (results, store, rec) {
        var history = [],
            symbol = rec.get('Symbol'),
            lastClose;

        while (Ext.isObject(results[0]) && results[0].Symbol === symbol) {
            lastClose = results[0].Close;
            history.push(lastClose);
            results.splice(0, 1);
        }

        // account for the most current change
        history.push(parseFloat(lastClose) + rec.get('Change'));

        rec.set('History', history);

        store.historyCache.push(rec);
    },

    onHistoryFailure: function (error) {
        if (!error) {
            error = 'Something went wrong :(';
        }

        var msg = (Ext.isObject(error) && Ext.isFunction(error.getError)) ? error.getError() : error;
        
        Ext.Msg.alert('Oops', msg);
    }
});
