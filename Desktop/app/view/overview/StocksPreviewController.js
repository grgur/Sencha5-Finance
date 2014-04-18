Ext.define('Finance.view.overview.StocksPreviewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.stockspreview',

    requires: [
    	'Ext.data.proxy.JsonP'
    ],

    historyCache: [],

    refreshInterval: 2000,

    listen: {
    	component: {
    		stockspreviewgrid: {
    			//select: 'onCustomEvent',
    		},

    		'button#smybolclicker' : {
    			tap: 'onSymbolClick'
    		}
    	}
    },

    init: function () {
    	var store = this.getView().getStore();

    	this.refreshStore = this.refreshStore || Ext.Function.createBuffered(this.doRefreshStore, 200, this, store);
    	setInterval(this.refreshStore, this.refreshInterval);
    },

	/**
	 * Dynamically updated to a buffered function
	 * @type {Function}
	 */
    refreshStore: null,

    doRefreshStore: function (store) {
    	store = store || this.getView().getStore();
    	store.reload();
    },

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
        
        // kick this out of the loop for now
        Ext.defer(this.compareWithCache, 1, this, [store]);

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
        var me        = this,
            proxy     = store.getProxy(),
            params    = Ext.clone(proxy.getExtraParams()),
            symbols   = [],
            now       = Date.now(),
            endDate   = Ext.Date.format(new Date(now), 'Y-m-d'),
            startDate = Ext.Date.format(new Date(now - 1000*60*60*24*10), 'Y-m-d'); // 10 days ago

        store.each(function (rec) {
            symbols.push('"' + rec.get('Symbol') + '"');
        });

        params.q = [
        	'select Close, Symbol from yahoo.finance.historicaldata ',
        		'where symbol in (',
        			symbols.join(','),
        		')  and startDate = "',
        		startDate,
        		'" and endDate = "',
        		endDate,
        		'"'
        	].join('');

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
    },

    onDataChanged: function () {
    	console.log('data changed', arguments);

    },

    cached: null,

    cacheAll: function (store) {
    	var data = {};
    	
    	store.each(function (rec) {
    		data[rec.get('Symbol')] = rec.get('Change');
    	});

    	this.cached = data;
    },

    compareWithCache: function (store) {
    	var cache = this.cached,
    		grid = this.getView(),
    		selModel = grid.getSelectionModel(),
    		select = [];

    	if (!cache) {
    		return;
    	}

    	store.each(function (rec) {
    		if (rec.get('Change') !== cache[rec.get('Symbol')]) {
    			select.push(rec);
    		}
    	});

    	// <debug>
		if (select.length === 0) {
			var random = store.getAt( Math.round(Math.random() * (store.getCount() - 1)) );
			console.log('simulating entry', random.get('Symbol'));
			select.push(random);
		}
		// </debug>

    	selModel.select(select);

    	Ext.defer(this.deselectAll, 600, this, [selModel]);
    },

    deselectAll: function (selModel) {
    	selModel.deselectAll();
    },

    onSymbolClick: function () {
    	alert('yeah')
    }    
});
