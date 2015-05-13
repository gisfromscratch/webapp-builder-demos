/**
 * A simple XMPP connection.
 */
define(["dojo/_base/declare"], function (declare) {
    return declare(null, {

        _user: "",
        _pass: "",
        _url: "http://esprimo:7070/http-bind/ ",

        _connection: undefined,

        connect: function (user, pass) {
            if (this._connection) {
                return;
            }

            this._connection = new Strophe.Connection(this._url, { sync: false });
            this._connection.connect(user, pass, this.onStatusChanged);
        },

        disconnect: function () {
            if (!this._connection) {
                return;
            }

            this._connection.disconnect(this.onStatusChanged);
            delete this._connection;
        },

        onStatusChanged: function(status) {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    break;

                case Strophe.Status.DISCONNECTED:
                    break;
            }
        }
    });
});