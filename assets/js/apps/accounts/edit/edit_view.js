BillMindr.module('AccountsApp.Edit', function(Edit, BillMindr, Backbone, Marionette, $, _) {
    Edit.Account = Marionette.ItemView.extend({
        template: '#account-form',
        events: {
            'click button.js-submit': 'submitClicked'
        },
        submitClicked: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        }
    });
});