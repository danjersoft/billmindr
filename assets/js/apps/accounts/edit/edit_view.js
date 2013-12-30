BillMindr.module('AccountsApp.Edit', function(Edit, BillMindr, Backbone, Marionette, $, _) {
    Edit.Account = BillMindr.AccountsApp.Common.Views.Form.extend({
        initialize: function() {
            this.title = 'Edit ' + this.model.get('name');
        },

        onRender: function() {
            if (this.options.generateTitle) {
                //console.log('default view');
                this.$el.find('h1').show().text(this.title);
            } else {
                this.$el.find('h1').hide();
            }
            this.$('.js-submit').text('Update Account');
        }
    });
});