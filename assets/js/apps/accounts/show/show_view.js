BillMindr.module('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.MissingAccount = Marionette.ItemView.extend({
        template: '#missing-account-view',
        events: {
            'click a.js-edit' : 'editClicked'
        },
        editClicked: function(e) {
            e.preventDefault();
            this.trigger('account:edit', this.model);
        }
    });
    Show.Account = Marionette.ItemView.extend({
        template: '#account-view'
    });
});