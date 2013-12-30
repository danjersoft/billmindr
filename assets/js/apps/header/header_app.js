BillMindr.module('HeaderApp', function(Header, BillMindr, Backbone, Marionette, $, _) {
    var API = {
        listHeader: function() {
            Header.List.Controller.listHeader();
        }
    };
    BillMindr.commands.setHandler('set:active:header', function(name) {
        BillMindr.HeaderApp.List.Controller.setActiveHeader(name);
    });
    Header.on('start', function() {
        API.listHeader();
    });
});