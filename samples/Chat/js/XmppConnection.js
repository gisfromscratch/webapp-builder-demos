/**
 * A simple XMPP connection.
 */
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/topic"], function (declare, dojo, topic) {
    return declare(null, {

        _url: "http://esprimo:7070/http-bind/ ",

        _connection: null,
        _connected: false,

        _handlers: [],

        connectedEvent: "connected",
        disconnectedEvent: "disconnected",

        connect: function (user, pass) {
            if (this._connection) {
                return;
            }

            this._connection = new Strophe.Connection(this._url, { sync: false });
            this._connection.connect(user, pass, dojo.hitch(this, this.onStatusChanged));
        },

        disconnect: function () {
            if (!this._connection) {
                return;
            }

            this._connection.disconnect(dojo.hitch(this, this.onStatusChanged));
            delete this._connection;
        },

        sendMessage: function(message) {
            if (!this._connection || !this._connected) {
                return;
            }

            // TODO: Send the message
        },

        onPresenceChanged: function(presence) {
            // TODO: Handle presence of users
        },

        onStatusChanged: function(status) {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    this._connected = true;
                    topic.publish(this.connectedEvent);

                    // Add a handler and send the default presence
                    // User will shown as online
                    var handler = this._connection.addHandler(dojo.hitch(this, this.onPresenceChanged));
                    this._handlers.push(handler);
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