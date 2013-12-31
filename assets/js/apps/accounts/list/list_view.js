define(['app'
        , 'tpl!apps/accounts/list/templates/layout.tpl'
        , 'tpl!apps/accounts/list/templates/list.tpl'
        , 'tpl!apps/accounts/list/templates/list_item.tpl'
        , 'tpl!apps/accounts/list/templates/none.tpl'
        , 'tpl!apps/accounts/list/templates/panel.tpl'
        ], function(BillMindr, layoutTpl, listTpl, listItemTpl, noneTpl, panelTpl) {
    BillMindr.module("AccountsApp.List.View", function(View, BillMindr, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            regions: {
                panelRegion: '#panel-region',
                accountsRegion: '#accounts-region'
            }
        });
        View.Panel = Marionette.ItemView.extend({
            template: panelTpl,
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
        View.Account = Marionette.ItemView.extend({
            template: listItemTpl,
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
            template: noneTpl,
            tagName: 'tr',
            className: 'warning'
        });
        View.Accounts = Marionette.CompositeView.extend({
            tagName: 'table',
            itemView: View.Account,
            emptyView: NoAccountsView,
            className: 'table table-hover',
            template: listTpl,
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

    return BillMindr.AccountsApp.List.View;
});