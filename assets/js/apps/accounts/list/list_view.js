BillMindr.module("AccountsApp.List", function(List, BillMindr, Backbone, Marionette, $, _) {
    List.Layout = Marionette.Layout.extend({
        template: '#account-list-layout',
        regions: {
            panelRegion: '#panel-region',
            accountsRegion: '#accounts-region'
        }
    });
    List.Panel = Marionette.ItemView.extend({
        template: '#account-list-panel',
        triggers: {
            'click button.js-new': 'account:new'
        },
        events: {
            'submit #filter-form': 'filterAccounts'
        },
        ui: {
            criterion: 'input.js-filter-criterion'
        },
        filterAccounts: function(e) {
            e.preventDefault();
            var criterion = this.$('.js-filter-criterion').val();
            this.trigger('accounts:filter', criterion);
        },
        onSetFilterCriterion: function(criterion) {
            this.ui.criterion.val(criterion);
        }
    });
    List.Account = Marionette.ItemView.extend({
        template: '#account-list-item',
        tagName: 'tr',
        events: {
            'click': 'highlightName',
            'click button.js-delete': 'deleteClicked',
            'click td a.js-show': 'showClicked',
            'click td a.js-edit': 'editClicked'
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
        },
        editClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('account:edit', this.model);
        },
        flash: function(cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                setTimeout(function() {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        }
    });
    var NoAccountsView = Marionette.ItemView.extend({
        template: '#account-list-none',
        tagName: 'tr',
        className: 'warning'
    });
    List.Accounts = Marionette.CompositeView.extend({
        tagName: 'table',
        itemView: List.Account,
        emptyView: NoAccountsView,
        className: 'table table-hover',
        template: '#account-list',
        itemViewContainer: 'tbody',
        initialize: function() {
            this.listenTo(this.collection, 'reset', function() {
                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.append(itemView.el);
                };
            });
        },
        onCompositeCollectionRendered: function() {
            this.appendHtml = function(collectionView, itemView, index) {
                collectionView.$el.prepend(itemView.el);
            };
        }
    });
});