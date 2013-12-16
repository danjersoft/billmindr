BillMindr.module('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAccount: function(id) {
            var account = BillMindr.request("account:entity", id);
            //var model = accounts.get(id);
            var accountView;
            if (account === undefined) {
                accountView = new Show.MissingAccount();
            } else {
                accountView= new Show.Account({
                    model: account
                });
            }
            BillMindr.mainRegion.show(accountView);
        }
    };
});