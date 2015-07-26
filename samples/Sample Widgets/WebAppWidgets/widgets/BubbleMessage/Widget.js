define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/on',
    'jimu/BaseWidget'],
function (declare, array, html, lang, domConstruct, on, BaseWidget) {
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
        messageText: null,
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
         * Adds a message to the DOM.
         */
        _onAddSelfMessageButtonClicked: function () {
            if (!this.messageList) {
                console.error('this.messageList was not injected!');
                return;
            }

            if (this.messageText) {
                var message = this.messageText.value;
                
                // Create and add a new dom message node
                var messageNode = domConstruct.toDom('<div class=\'base-message-text self-message-text\'>' + message + '</div><br>');
                domConstruct.place(messageNode, this.messageList);
                
                this.messageText.value = '';
            } else {
                console.error('this.messageText was not injected!');
            }
        },

        /**
         * Adds a message from an other user to the DOM.
         */
        _onAddOtherMessageButtonClicked: function () {
            if (!this.messageList) {
                console.error('this.messageList was not injected!');
                return;
            }

            if (this.messageText) {
                var message = this.messageText.value;

                // Create and add a new dom message node
                var messageNode = domConstruct.toDom('<div class=\'base-message-text other-message-text\'>' + message + '</div><br>');
                domConstruct.place(messageNode, this.messageList);

                this.messageText.value = '';
            } else {
                console.error('this.messageText was not injected!');
            }
        },
        
        /**
         * Clear all the existing messages.
         */
        _onClearMessageButtonClicked: function () {
            if (!this.messageList) {
                console.error('this.messageList was not injected!');
                return;
            }

            domConstruct.empty(this.messageList);
        }
    });
});