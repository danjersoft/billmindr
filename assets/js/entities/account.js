BillMindr.module('Entities', function(Entities, BillMindr, Backbone, Marionette, $, _) {
    Entities.Account = Backbone.Model.extend({
        defaults: {
            phoneNum: '',
            webSite: 'www...'
        }
    });
    Entities.AccountCollection = Backbone.Collection.extend({
        model: Entities.Account,
        comparator: 'name'
    });

    var accounts;

    var initializeAccounts = function() {
        accounts = new Entities.AccountCollection([
            { id: 1, name: 'Chase', phoneNum: '888...', webSite: 'chase.com'
            }, { id: 2, name: 'USAA', phoneNum: '888...', webSite: 'usaa.com'
            }, { id: 3, name: 'Citi', phoneNum: '888...', webSite: 'citi.com'
            }

        ]);
    };

    var API = {
        getAccountEntities: function() {
            if (accounts === undefined) {
                initializeAccounts();
            }
            return accounts;
        }
    };

    BillMindr.reqres.setHandler('account:entities', function() {
        return API.getAccountEntities();
    });
});