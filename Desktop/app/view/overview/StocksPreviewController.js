Ext.define('Finance.view.overview.StocksPreviewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.stockspreview',

    requires: [
    	'Ext.data.proxy.JsonP'
    ],

    historyCache: [],

    /**
     * Load historical data from cache if exists. Otherwise load from YQL
     * @param  {[type]} store [description]
     * @return {[type]}       [description]
     */
    loadHistoryCache: function (store) {
        var history = this.historyCache,
            len = history.length,
            i = 0,
            historyRec, loadedRec;

        // <debug>
        window.store = store;
        // </debug>

        if (!len) {
            return this.loadHistory(store);
        }

        for (; i < len; i++) {
            historyRec = history[i];
            loadedRec = store.findRecord('Symbol', historyRec.get('Symbol'));
            if (Ext.isObject(loadedRec)) {
                loadedRec.set('History', historyRec.get('History'));
            }
        }
    },

    /**
     * Load historical data for each stock from YQL
     * @return {[type]} [description]
     */
    loadHistory: function (store) {
        var me = this,
            proxy = store.getProxy(),
            params = Ext.clone(proxy.getExtraParams()),
            symbols = [];

        store.each(function (rec) {
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
            results,
            store = me.getView().getStore();

        // make sure the entire object structure exists
        if (Ext.isObject(res) && Ext.isObject(res.query) && Ext.isObject(res.query.results)) {
            results = res.query.results.quote;
        } else {
            return me.onHistoryFailure(res.error ? res.error.description : 'Something happened on the way to haven.');
        }

        // go through data and add them to the History field for each
        store.each(me.parseHistory.bind(me, results, store));
    },

    /**
     * Parse history returned from YQL
     * @param  {[type]} results [description]
     * @param  {[type]} store   [description]
     * @param  {[type]} rec     [description]
     * @return {[type]}         [description]
     */
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

        this.historyCache.push(rec);
    },

    onHistoryFailure: function (error) {
        if (!error) {
            error = 'Something went wrong :(';
        }

        var msg = (Ext.isObject(error) && Ext.isFunction(error.getError)) ? error.getError() : error;
        
        Ext.Msg.alert('Oops', msg);
    }



});
