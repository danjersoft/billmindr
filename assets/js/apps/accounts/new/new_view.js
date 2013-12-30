BillMindr.module('AccountsApp.New', function(New, BillMindr, Backbone, Marionette, $, _) {
    New.Account = BillMindr.AccountsApp.Common.Views.Form.extend({
        title: 'New Account',
        onRender: function() {
            this.$('.js-submit').text('Create Account');
        }
    })
});