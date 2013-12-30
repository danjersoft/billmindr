BillMindr.module('AboutApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAbout: function() {
            var view = new Show.Message();
            BillMindr.mainRegion.show(view);
        }
    };
});