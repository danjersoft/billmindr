BillMindr.module('Entities', function(Entities, BillMindr, Backbone, Marionette, $, _) {
    Entities.Account = Backbone.Model.extend({
        defaults: {
            phoneNum: '',
            webSite: 'www...'
        },
        urlRoot: 'accounts'
    });
    Entities.configureStorage(Entities.Account);
    Entities.AccountCollection = Backbone.Collection.extend({
        model: Entities.Account,
        comparator: 'name',
        url: 'accounts'
    });
    Entities.configureStorage(Entities.AccountCollection);

    //var accounts;

    var initializeAccounts = function() {
        var accounts = new Entities.AccountCollection([
            { id: 1, name: 'Chase', phoneNum: '888...', webSite: 'chase.com'
            }, { id: 2, name: 'USAA', phoneNum: '888...', webSite: 'usaa.com'
            }, { id: 3, name: 'Citi', phoneNum: '888...', webSite: 'citi.com'
            }
        ]);
        accounts.forEach(function(account) {
            account.save();
        });
        return accounts.models;
    };

    var API = {
        getAccountEntities: function() {
            var accounts = new Entities.AccountCollection();
            var defer = $.Deferred();
            accounts.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();
            $.when(promise).done(function(accounts) {
                if (accounts.length === 0) {
                    var models = initializeAccounts();
                    accounts.reset(models);
                }
            });
            return promise;
        },
        getAccountEntity: function(accountId) {
            var account = new Entities.Account({ id: accountId });
            var defer = $.Deferred();
            setTimeout(function() {
                account.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    },
                    error: function(data) {
                        defer.resolve(undefined);
                    }
                });
            }, 2000);
            //account.fetch();
            return defer.promise();
        }
    };

    BillMindr.reqres.setHandler('account:entities', function() {
        return API.getAccountEntities();
    });
    BillMindr.reqres.setHandler('account:entity', function(id) {
        return API.getAccountEntity(id);
    });
});