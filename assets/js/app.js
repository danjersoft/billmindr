define(['marionette', 'apps/config/marionette/regions/dialog'], function(Marionette) {
    var BillMindr = new Marionette.Application();

    BillMindr.addRegions({
        headerRegion: '#header-region',
        mainRegion: '#main-region',
        dialogRegion: Marionette.Region.Dialog.extend({
            el: '#dialog-region'
        })
    });

    BillMindr.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    BillMindr.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    BillMindr.on('initialize:after', function() {
        if (Backbone.history) {
            require(['apps/accounts/accounts_app'], function() {
                Backbone.history.start();
                if (BillMindr.getCurrentRoute() === '') {
                    BillMindr.trigger('accounts:list');
                }
            });
        }
    });

    return BillMindr;
});