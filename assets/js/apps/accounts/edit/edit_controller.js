BillMindr.module('AccountsApp.Edit', function(Edit, BillMindr, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editAccount: function(id) {
            var loadingView = new BillMindr.Common.Views.Loading({
                title: 'Loading Account',
                message: 'Loading account for editing'
            });
            BillMindr.mainRegion.show(loadingView);

            var fetchingAccount = BillMindr.request('account:entity', id);
            $.when(fetchingAccount).done(function(account) {
                var view;
                if (account === undefined) {
                    view = new BillMindr.AccountsApp.Show.MissingAccount();
                } else {
                    view = new Edit.Account({
                        model: account
                    });
                    view.on('form:submit', function(data) {
                        if (account.save(data)) {
                            BillMindr.trigger('account:show', account.get('id'));
                        } else {
                            view.triggerMethod('form:data:invalid', account.validationError);
                        }
                    });
                }
                BillMindr.mainRegion.show(view);
            });
        }
    };
});