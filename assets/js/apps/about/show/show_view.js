BillMindr.module('AboutApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Message = Marionette.ItemView.extend({
        template: '#about-message'
    });
});