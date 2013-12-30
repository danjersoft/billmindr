BillMindr.module('HeaderApp.List', function(List, BillMindr, Backbone, Marionette, $, _) {
    List.Controller = {
        listHeader: function() {
            var links = BillMindr.request('header:entities');
            var headers = new List.Headers({ collection: links });

            headers.on('brand:clicked', function() {
                BillMindr.trigger('accounts:list');
            });

            headers.on('itemview:navigate', function(childView, model) {
                var url = model.get('url');
                if (url === 'accounts') {
                    BillMindr.trigger('accounts:list');
                } else if (url === 'about') {
                    BillMindr.trigger('about:show');
                } else {
                    throw 'No such sub-application: ' + url;
                }
            });

            BillMindr.headerRegion.show(headers);
        },

        setActiveHeader: function(headerUrl) {
            var links = BillMindr.request('header:entities');
            var headerToSelect = links.find(function(header) {
                return (header.get('url') === headerUrl);
            });
            headerToSelect.select();
            links.trigger('reset');
        }
    };
});