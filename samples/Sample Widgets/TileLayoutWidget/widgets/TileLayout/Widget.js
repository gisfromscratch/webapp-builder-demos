define(['dojo/_base/declare', 'jimu/BaseWidget'],
function (declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
        // Custom widget code goes here 

        baseClass: 'edu-widget-tile-layout',

        //this property is set by the framework when widget is loaded.
        name: 'TileLayout',


        //methods to communication with app container:

         postCreate: function() {
           this.inherited(arguments);
           console.log('postCreate');
         },

         startup: function () {
             this.inherited(arguments);
             console.log('startup');
         },

        // onOpen: function(){
        //   console.log('onOpen');
        // },

        // onClose: function(){
        //   console.log('onClose');
        // },

        // onMinimize: function(){
        //   console.log('onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('onMaximize');
        // },

        // onSignIn: function(credential){
        //   /* jshint unused:false*/
        //   console.log('onSignIn');
        // },

        // onSignOut: function(){
        //   console.log('onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('onPositionChange');
        // },

        // resize: function(){
        //   console.log('resize');
        // }

        //methods to communication between widgets:

    });
});