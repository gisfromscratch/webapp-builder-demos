/**
 * Parses XMPP messages.
 */
define(["dojo/_base/declare", "js/XmppMessage"], function (declare, xmppMessage) {

    return declare(null, {

        parseMessage: function (xml) {
            var message = new xmppMessage();

            if (xml && "message" === xml.tagName && xml.childNodes) {
                var childNode;
                for (var index in xml.childNodes) {
                    childNode = xml.childNodes[index];
                    if (childNode && "body" === childNode.tagName) {
                        this._parseBody(childNode, message);
                    } else if (childNode && "extent" === childNode.tagName) {
                        this._parseExtent(childNode, message);
                    }
                }
            }

            return message;
        },

        _parseBody: function (xml, message) {
            message.text = xml.textContent;
        },

        _parseExtent: function (xml, message) {
            var childNode;
            var extent = {};
            for (var index in xml.childNodes) {
                childNode = xml.childNodes[index];
                if (childNode && childNode.tagName) {
                    extent[childNode.tagName] = childNode.textContent;
                }
            }
            message.extent = extent;
        }

    });
});