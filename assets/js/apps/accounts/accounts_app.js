BillMindr.module('AccountsApp', function(AccountsApp, BillMindr, Backbone, Marionette, $, _) {
    AccountsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "accounts": "listAccounts",
            "accounts/:id": "showAccount",
            "accounts/:id/edit": "editAccount"
        }
    });

    var API = {
        listAccounts: function() {
            AccountsApp.List.Controller.listAccounts();
        },
        showAccount: function(id) {
            AccountsApp.Show.Controller.showAccount(id);
        },
        editAccount: function(id) {
            AccountsApp.Edit.Controller.editAccount(id);
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
    BillMindr.on('account:edit', function(id) {
        BillMindr.navigate('accounts/' + id + '/edit');
        API.editAccount(id);
    });

    BillMindr.addInitializer(function() {
        new AccountsApp.Router({
            controller: API
        });
    });
});