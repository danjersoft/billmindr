BillMindr.module('AccountsApp.List', function(List, BillMindr, Backbone, Marionette, $, _) {
    List.Controller = {
        listAccounts: function() {
            var accounts = BillMindr.request('account:entities');
            var accountsListView = new List.Accounts({
               collection: accounts
            });
            BillMindr.mainRegion.show(accountsListView);
            accountsListView.on('itemview:account:delete', function(childView, model) {
                accounts.remove(model);
            });
            accountsListView.on('itemview:account:show', function(childView, model) {
                console.log('Received itemview:account:show event on model', model);
            });
        }
    }
});