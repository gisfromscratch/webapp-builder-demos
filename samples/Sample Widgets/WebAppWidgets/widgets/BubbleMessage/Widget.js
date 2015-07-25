define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/on',
    'jimu/BaseWidget'],
function (declare, array, html, lang, on, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
        // Custom widget code goes here 

        baseClass: 'edu-widget-bubble-message',

        //this property is set by the framework when widget is loaded.
        name: 'BubbleMessage',

        /**
         * Injected UI elements
         */
        addSelfMessageButton: null,
        addOtherMessageButton: null,
        messageList: null,

        //methods to communication with app container:

        postCreate: function () {
            this.inherited(arguments);
            console.log('postCreate');
        },

        startup: function () {
            this.inherited(arguments);
            console.log('startup');
        },

        destroy: function () {
            this.tileLayoutContainer.destroy();
            this.inherited(arguments);
        },

        // onOpen: function(){
        //   console.log('onOpen');
        // },

        // onClose: function(){
        //   console.log('onClose');
        // },

        //onMinimize: function () {
        //    console.log('onMinimize');
        //},

        //onMaximize: function () {
        //    console.log('onMaximize');
        //},

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

        /**
         * Add button was clicked.
         */
        _onAddSelfMessageButtonClicked: function () {
            // TODO: Add a new message
        },

        /**
         * Remove button was clicked.
         */
        _onAddOtherMessageButtonClicked: function () {
            // TODO: Add a new message
        }
    });
});