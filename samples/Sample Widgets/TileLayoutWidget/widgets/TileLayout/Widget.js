define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/on',
    'jimu/BaseWidget',
    './ImageNode',
     'jimu/dijit/TileLayoutContainer'],
function (declare, array, html, lang, on, BaseWidget, ImageNode, TileLayoutContainer) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
        // Custom widget code goes here 

        baseClass: 'edu-widget-tile-layout',

        //this property is set by the framework when widget is loaded.
        name: 'TileLayout',

        /**
         * Injected UI elements
         */
        addButton: null,
        removeButton: null,
        imageList: null,

        /**
         * The image items.
         */
        imageItems: [],

        /**
         * The tile layout container
         */
        tileLayoutContainer: null,

        /**
         * The selected image index.
         */
        selectedImageIndex: -1,

        //methods to communication with app container:

        postCreate: function () {
            this.inherited(arguments);
            console.log('postCreate');
        },

        startup: function () {
            this.inherited(arguments);

            this.tileLayoutContainer = new TileLayoutContainer({
                strategy: 'fixWidth',
                itemSize: { width: 250, height: 200 },
                hmargin: 16,
                vmargin: 5
            }, this.imageList);
            this.tileLayoutContainer.startup();

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

        onMinimize: function () {
            this.resize();
            console.log('onMinimize');
        },

        onMaximize: function () {
            this.resize();
            console.log('onMaximize');
        },

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

        resize: function () {
            var box = html.getMarginBox(this.domNode);
            var listHeight = box.h - 37 - 21 - 61;

            //fix for IE8
            if (listHeight < 0) {
                listHeight = 0;
            }
            html.setStyle(this.imageList, 'height', listHeight + 'px');
            if (this.tileLayoutContainer) {
                this.tileLayoutContainer.resize();
            }
        },

        /**
         * Add button was clicked.
         */
        _onAddButtonClicked: function () {
            var imageItem = this._createRandomImageItem();
            var imageNode = this._createImageNode(imageItem);
            this.imageItems.push(imageItem);

            this.tileLayoutContainer.addItem(imageNode);
            this.resize();
        },

        /**
         * Remove button was clicked.
         */
        _onRemoveButtonClicked: function () {
            if (-1 === this.selectedImageIndex) {
                return;
            }

            // Remove the selected and copy the other items
            this.tileLayoutContainer.empty();
            this.imageItems.splice(this.selectedImageIndex, 1);
            var itemsCopy = [];
            array.forEach(this.imageItems, function (imageItem) {
                var newImageItem = this._createImageNode(imageItem);
                itemsCopy.push(newImageItem);
            }, this);
            this.tileLayoutContainer.addItems(itemsCopy);

            this.selectedImageIndex = -1;
            html.addClass(this.removeButton, 'jimu-state-disabled');
            this.resize();
        },

        /**
         * Creates a random image item.
         * @return A new created random image item.
         */
        _createRandomImageItem: function() {
            var randomIndex = Math.floor((Math.random() * 10) + 1);
            var imageIndex = (randomIndex < 10) ? '0' + randomIndex : randomIndex;
            var image = this.folderUrl + 'images/' + imageIndex + '.jpg';
            return {
                img: image,
                label: 'Baskets'
            };
        },

        /**
         * Creates a new image node widget.
         * @param imageItem the image item for the widget.
         * @return A new created image node widget.
         */
        _createImageNode: function(imageItem) {
            var item = new ImageNode(imageItem);
            on(item.domNode, 'click', lang.hitch(this, lang.partial(this._onItemClick, imageItem)));
            return item;
        },

        /**
         * Handles the image item click event and updates the selected image index.
         * @param imageItem the image item which was clicked.
         */
        _onItemClick: function (imageItem) {
            var imageIndex = this.imageItems.indexOf(imageItem);
            if (-1 !== imageIndex) {
                this.selectedImageIndex = imageIndex;
                html.removeClass(this.removeButton, 'jimu-state-disabled');
            } else {
                html.addClass(this.removeButton, 'jimu-state-disabled');
            }
        }
    });
});