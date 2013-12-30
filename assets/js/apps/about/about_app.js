BillMindr.module('AboutApp', function(AboutApp, BillMindr, Backbone, Marionette, $, _) {
    AboutApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'about': 'showAbout'
        }
    });

    var API = {
        showAbout: function() {
            AboutApp.Show.Controller.showAbout();
            BillMindr.execute('set:active:header', 'about');
        }
    };

    BillMindr.on('about:show', function() {
        BillMindr.navigate('about');
        API.showAbout();
    });

    BillMindr.addInitializer(function() {
        new AboutApp.Router({
            controller: API
        });
    });
});