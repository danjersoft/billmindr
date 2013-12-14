BillMindr.module("AccountsApp.List", function(List, BillMindr, Backbone, Marionette, $, _) {
    List.Account = Marionette.ItemView.extend({
        template: '#account-list-item',
        tagName: 'tr',
        events: {
            'click': 'highlightName',
            'click button.js-delete': 'deleteClicked',
            'click a.js-show': 'showClicked'
        },
        highlightName: function() {
            this.$el.toggleClass('warning');
        },
        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger('account:delete', this.model);
        },
        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('account:show', this.model);
        },
        remove: function() {
            var self = this;
            this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });
    List.Accounts = Marionette.CompositeView.extend({
        tagName: 'table',
        itemView: List.Account,
        className: 'table table-hover',
        template: '#account-list',
        itemViewContainer: 'tbody'
    });

});