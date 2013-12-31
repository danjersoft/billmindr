define(['app', 'apps/accounts/list/list_view'], function(BillMindr, View) {
    BillMindr.module('AccountsApp.List', function(List, BillMindr, Backbone, Marionette, $, _) {
        List.Controller = {
            listAccounts: function(criterion) {
                // var loadingView = new BillMindr.Common.Views.Loading();
                // BillMindr.mainRegion.show(loadingView);

                require(['entities/account'], function() {
                    var fetchingAccounts = BillMindr.request('account:entities');

                    var accountsListLayout = new View.Layout();
                    var accountsListPanel = new View.Panel();
                    $.when(fetchingAccounts).done(function(accounts) {
                        // var filteredAccounts = BillMindr.Entities.FilteredCollection({
                        //     collection: accounts,
                        //     filterFunction: function(filterCriterion) {
                        //         var criterion = filterCriterion.toLowerCase();
                        //         return function(account) {
                        //             if (account.get('name').toLowerCase().indexOf(criterion) !== -1
                        //                     || account.get('webSite').toLowerCase().indexOf(criterion) !== -1
                        //                     || account.get('phoneNum').toLowerCase().indexOf(criterion) !== -1) {
                        //                 return account;
                        //             }
                        //         };
                        //     }
                        // });
                        // if (criterion) {
                        //     filteredAccounts.filter(criterion);
                        //     accountsListPanel.once('show', function() {
                        //         accountsListPanel.triggerMethod('set:filter:criterion', criterion);
                        //     });
                        // }
                        var accountsListView = new View.Accounts({
                        //   collection: filteredAccounts
                            collection: accounts
                        });
                        accountsListPanel.on('accounts:filter', function(filterCriterion) {
                            filteredAccounts.filter(filterCriterion);
                            BillMindr.trigger('accounts:filter', filterCriterion);
                        });
                        accountsListLayout.on('show', function() {
                            accountsListLayout.panelRegion.show(accountsListPanel);
                            accountsListLayout.accountsRegion.show(accountsListView);
                        });

                        accountsListPanel.on('account:new', function() {
                            var newAccount = new BillMindr.Entities.Account();
                            var view = new BillMindr.AccountsApp.New.Account({
                                model: newAccount
                            });
                            view.on('form:submit', function(data) {
                                var highestId = accounts.max(function(a) { return a.id; });
                                highestId = highestId.get('id');
                                data.id = highestId + 1;
                                if (newAccount.save(data)) {
                                    accounts.add(newAccount);
                                    view.trigger('dialog:close');
                                    var newAccountView = accountsListView.children.findByModel(newAccount);
                                    if (newAccountView) {
                                        newAccountView.flash('success');
                                    }
                                } else {
                                    view.triggerMethod('form:data:invalid', newAccount.validationError);
                                }
                            });
                            BillMindr.dialogRegion.show(view);
                        });

                        accountsListView.on('itemview:account:delete', function(childView, model) {
                            model.destroy();
                        });
                        accountsListView.on('itemview:account:show', function(childView, model) {
                            BillMindr.trigger('account:show', model.get('id'));
                        });
                        accountsListView.on('itemview:account:edit', function(childView, model) {
                            var view = new BillMindr.AccountsApp.Edit.Account({
                                model: model
                            });
                            view.on('form:submit', function(data) {
                                if (model.save(data)) {
                                    childView.render();
                                    view.trigger('dialog:close');
                                    childView.flash('success');
                                } else {
                                    view.triggerMethod('form:data:invalid', model.validationError);
                                }
                            });
                            BillMindr.dialogRegion.show(view);
                        });
                        BillMindr.mainRegion.show(accountsListLayout);
                    });
                });
            }
        };
    });

    return BillMindr.AccountsApp.List.Controller;
});