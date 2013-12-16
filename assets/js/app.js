var BillMindr = new Marionette.Application();

BillMindr.addRegions({
    mainRegion: '#main-region'
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
        Backbone.history.start();
        if (this.getCurrentRoute() === '') {
            //this.navigate('accounts');
            //BillMindr.AccountsApp.List.Controller.listAccounts();
            BillMindr.trigger('accounts:list');
        }
    }
});