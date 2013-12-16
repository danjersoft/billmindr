BillMindr.module('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAccount: function(id) {
            var loadingView = new BillMindr.Common.Views.Loading({
                title: 'Artificial Loading Delay',
                message: 'Data loading is delayed to demonstrate using a loading view'
            });
            BillMindr.mainRegion.show(loadingView);

            var fetchingAccount = BillMindr.request("account:entity", id);
            $.when(fetchingAccount).done(function(account) {
                var accountView;
                if (account === undefined) {
                    accountView = new Show.MissingAccount();
                }
                else {
                    accountView = new Show.Account({
                        model: account
                    });
                }
                BillMindr.mainRegion.show(accountView);
            });
        }
    };
});