/**
 * A simple XMPP connection.
 */
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/topic", "js/XmlPrinter"], function (declare, dojo, topic, xmlPrinter) {
    return declare(null, {

        _url: "http://esprimo:7070/http-bind/ ",

        _connection: null,
        _userJid: "",
        _connected: false,

        _handlers: [],

        connectedEvent: "connected",
        disconnectedEvent: "disconnected",

        getUserJid: function () {
            return this._userJid;
        },

        connect: function (user, pass) {
            if (this._connection) {
                return;
            }

            this._connection = new Strophe.Connection(this._url, { sync: false });
            this._connection.connect(user, pass, dojo.hitch(this, this.onStatusChanged));
            this._userJid = user;
        },

        disconnect: function () {
            if (!this._connection) {
                return;
            }

            this._connection.disconnect(dojo.hitch(this, this.onStatusChanged));
            delete this._connection;
        },

        sendMessage: function(userJid, message) {
            if (!this._connection || !this._connected) {
                return;
            }

            var xmppMessage = $msg({ from: this._userJid, to: userJid, type: "chat" }).c("body").t(message);
            this._connection.send(xmppMessage);
        },

        onMessageReceived: function(message) {
            // TODO: Handle messages
            try {
                var printer = new xmlPrinter();
                printer.printPrettyXml(message);
            } finally {
                // This handler should be called again
                return true;
            }
        },

        onPresenceChanged: function(presence) {
            // TODO: Handle presence of users
        },

        onStatusChanged: function(status) {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    this._connected = true;
                    topic.publish(this.connectedEvent);

                    // Add a presence and message handler and send the default presence
                    // User will shown as online
                    var presenceHandler = this._connection.addHandler(dojo.hitch(this, this.onPresenceChanged));
                    this._handlers.push(presenceHandler);
                    var messageHandler = this._connection.addHandler(dojo.hitch(this, this.onMessageReceived));
                    this._handlers.push(messageHandler);

                    var presence = $pres();
                    this._connection.send(presence);
                    break;

                case Strophe.Status.DISCONNECTED:
                    this._connected = false;
                    topic.publish(this.disconnectedEvent);

                    // Delete all handlers
                    var handler;
                    for (var index in this._handlers) {
                        handler = this._handlers[index];
                        this._connection.deleteHandler(handler);
                    }
                    this._handlers = [];
                    break;
            }
        }
    });
});