BillMindr.module('AccountsApp.List', function(List, BillMindr, Backbone, Marionette, $, _) {
    List.Controller = {
        listAccounts: function() {
            var fetchingAccounts = BillMindr.request('account:entities');
            $.when(fetchingAccounts).done(function(accounts) {
                var accountsListView = new List.Accounts({
                   collection: accounts
                });
                BillMindr.mainRegion.show(accountsListView);
                accountsListView.on('itemview:account:delete', function(childView, model) {
                    model.destroy();
                });
                accountsListView.on('itemview:account:show', function(childView, model) {
                    BillMindr.trigger('account:show', model.get('id'));
                });
            });
        }
    }
});