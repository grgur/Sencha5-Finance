Ext.define('Finance.view.overview.StocksPreviewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.stockspreview',

    listen: {
        controller: {
            dashboard: {
                edituser: 'onEditUser',
                viewticket: 'onViewTicket'
            },
            ticketsearch: {
                viewticket: 'onViewTicket'
            }
        }
    }
});
