BillMindr.module('AccountsApp', function(AccountsApp, BillMindr, Backbone, Marionette, $, _) {
    AccountsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "accounts(/filter/criterion::criterion)": "listAccounts",
            "accounts/:id": "showAccount",
            "accounts/:id/edit": "editAccount"
        }
    });

    var API = {
        listAccounts: function(criterion) {
            AccountsApp.List.Controller.listAccounts(criterion);
            BillMindr.execute('set:active:header', 'accounts');
        },
        showAccount: function(id) {
            AccountsApp.Show.Controller.showAccount(id);
            BillMindr.execute('set:active:header', 'accounts');
        },
        editAccount: function(id) {
            AccountsApp.Edit.Controller.editAccount(id);
            BillMindr.execute('set:active:header', 'accounts');
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
    BillMindr.on('accounts:filter', function(criterion) {
        if (criterion) {
            BillMindr.navigate('accounts/filter/criterion:' + criterion);
        } else {
            BillMindr.navigate('accounts');
        }
    });

    BillMindr.addInitializer(function() {
        new AccountsApp.Router({
            controller: API
        });
    });
});