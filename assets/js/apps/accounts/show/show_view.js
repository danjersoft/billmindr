BillMindr.module('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.MissingAccount = Marionette.ItemView.extend({
        template: '#missing-account-view'
    });
    Show.Account = Marionette.ItemView.extend({
        template: '#account-view'
    });
});