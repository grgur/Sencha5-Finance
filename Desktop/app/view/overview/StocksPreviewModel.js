/**
 *
 */
Ext.define('Finance.view.overview.StocksPreviewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockspreview',

    stores: {
        stocks: {
            model: 'Stock',

            autoLoad: true,

            // Associate this store with the data session (an Ext.data.session.Session).
            // This ensures the Organization records are cached and distinct going forward.
            isolated: false
        }
    }
});
