requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        backbone: 'vendor/backbone/backbone-min',
        jquery: 'vendor/jquery/jquery.min',
        json2: 'vendor/json2/json2',
        underscore: 'vendor/underscore/underscore-min',
        marionette: 'vendor/marionette/lib/backbone.marionette.min',
        'jquery-ui': 'vendor/jquery-ui/ui/minified/jquery-ui.min',
        localstorage: 'vendor/backbone.localstorage/backbone.localStorage-min',
        tpl: 'vendor/requirejs-tpl/tpl'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'jquery-ui': ['jquery'],
        localstorage: ['backbone']
    },
    waitSeconds: 0
});

require(['app'], function(BillMindr) {
    BillMindr.start();
});