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
        },
        onFormDataInvalid: function(errors) {
            var self = this;
            var $view = this.$el;

            var clearFormErrors = function() {
                var $form = $view.find('form');
                $form.find('.help-block').each(function() {
                    $(this).remove();
                });
                $form.find('.control-group.has-error').each(function() {
                    $(this).removeClass('has-error');
                });
            };

            var markErrors = function(value, key) {
                var $controlGroup = self.$el.find('#account-' + key).parent();
                var $errorEl = $('<span>', { class: 'help-block', text: value });
                $controlGroup.append($errorEl).addClass('has-error');
            };

            clearFormErrors();
            _.each(errors, markErrors);
        }
    });
});