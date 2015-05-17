/**
 * Prints xml messages.
 */
define(["dojo/_base/declare", "dojo/_base/lang", "js/XmppMessageParser"], function (declare, dojo, xmppMessageParser) {
    return declare(null, {

        _messageParser: new xmppMessageParser(),

        printPrettyXml: function (xml) {

            var message = this._messageParser.parseMessage(xml);
            if (message && message.extent) {
                var extent = message.extent;
            }

            console.log("Raw message:");
            console.log(xml);
        }
    });
});