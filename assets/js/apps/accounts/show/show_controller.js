BillMindr.model('AccountsApp.Show', function(Show, BillMindr, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAccount: function(model) {
            console.log('showAccount called for model', model);
        }
    };
});