BillMindr.module('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAccount: function(id) {
            var fetchingAccount = BillMindr.request("account:entity", id);
            $.when(fetchingAccount).done(function(account) {
                var accountView;
                if (account === undefined) {
                    accountView = new Show.MissingAccount();
                } else {
                    accountView= new Show.Account({
                        model: account
                    });
                }
                BillMindr.mainRegion.show(accountView);
            });
        }
    };
});