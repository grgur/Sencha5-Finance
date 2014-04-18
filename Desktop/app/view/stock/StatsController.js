Ext.define('Finance.view.stock.StatsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.stats',

	requires: [
		'Ext.data.proxy.JsonP'
	],

	listen: {
		component: {
			'button#symbolBtn' : {
				click: 'onSymbolButtonClick'
			}
		}
	},

	init: function () {
		this.requestStats('AAPL');
	},

	onSymbolButtonClick: function () {
		alert('symbol')
		// this.requestStats();
	},

	requestStats: function (symbol) {
		var me = this;

		Ext.data.JsonP.request({
            url    : 'https://query.yahooapis.com/v1/public/yql',
            params : {
	            q		     : 'SELECT * FROM yahoo.finance.keystats WHERE symbol="' + symbol + '"',
	            format       : 'json',
	            diagonostics : false,
	            env          : 'store://datatables.org/alltableswithkeys'
	        },
            success : me.onStatsLoadSuccess,
            failure : me.onStatsLoadFailure,
            scope   : me
        });
	},

	onStatsLoadSuccess: function (res) {
		var me = this,
            results,
            vm = this.getViewModel(),
            data = vm.getData();

        // make sure the entire object structure exists
        if (Ext.isObject(res) && Ext.isObject(res.query) && Ext.isObject(res.query.results)) {
            results = res.query.results.stats;
        } else {
            return me.onStatsLoadFailure(res.error ? res.error.description : 'Something happened on the way to haven.');
        }

        // go through data and add them to the History field for each
        data.stats = results;
        vm.setData(data);

	},

	onStatsLoadFailure: function () {
		if (!error) {
            error = 'Something went wrong :(';
        }

        var msg = (Ext.isObject(error) && Ext.isFunction(error.getError)) ? error.getError() : error;
        
        Ext.Msg.alert('Oops', msg);
	}
});