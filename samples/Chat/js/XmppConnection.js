/**
 * A simple XMPP connection.
 */
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/topic"], function (declare, dojo, topic) {
    return declare(null, {

        _url: "http://esprimo:7070/http-bind/ ",

        _connection: null,

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

        onStatusChanged: function(status) {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    topic.publish(this.connectedEvent);
                    break;

                case Strophe.Status.DISCONNECTED:
                    topic.publish(this.disconnectedEvent);
                    break;
            }
        }
    });
});