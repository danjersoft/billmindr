BillMindr.module('AccountsApp', function(AccountsApp, BillMindr, Backbone, Marionette, $, _) {
    AccountsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "accounts": "listAccounts",
            "accounts/:id": "showAccount"
        }
    });

    var API = {
        listAccounts: function() {
            AccountsApp.List.Controller.listAccounts();
        },
        showAccount: function(id) {
            AccountsApp.Show.Controller.showAccount(id);
        }
    };

    BillMindr.on('accounts:list', function() {
        BillMindr.navigate('accounts');
        API.listAccounts();
    });

    BillMindr.on('account:show', function(id) {
        BillMindr.navigate('accounts/' + id);
        API.showAccount(id);
    });

    BillMindr.addInitializer(function() {
        new AccountsApp.Router({
            controller: API
        });
    });
});