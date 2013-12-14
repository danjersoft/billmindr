var BillMindr = new Marionette.Application();

BillMindr.addRegions({
    mainRegion: '#main-region'
});

BillMindr.on('initialize:after', function() {
    BillMindr.AccountsApp.List.Controller.listAccounts();
});