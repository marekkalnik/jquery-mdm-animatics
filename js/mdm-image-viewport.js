;(function($, document) {
    "use strict";

    $.fn.MDMImageViewport = function(config)
    {
        var container = $(this);
        var defaults = {
        };

        var config = jQuery.extend({}, defaults, config);

        var props = {
            loaded: false,
            images: [],
            current: 0,
            delay: 25,
            interaval: null,
            nbImages: 0,
            displayer: null
        };

        var methods = {
            construct: function ()
            {
                container.addClass('mdm-image-viewport');

                if (config.width)
                {
                    methods.setWidth(config.width);
                }

                if (config.height)
                {
                    methods.setHeight(config.height);
                }
            },
            loadImages: function (images)
            {
                var image = new Image(),
                    i, len;

                props.loaded = false;
                props.images = images;

                image.src = images[0];

                image.onload = function(){
                    if (typeof config.width === 'undefined')
                    {
                        methods.setWidth(this.width);
                    }
                    if (typeof config.height === 'undefined')
                    {
                        methods.setHeight(this.height);
                    }
                };

                for (i = 1, len = images.length; i < len; i++)
                {
                    image.src = images[i];
                }

                props.nbImages = len;
                props.loaded = true;
                methods.setContainerImage(0);
            },
            eventChangeImage: function(event, data)
            {
                if (typeof props.images[data.current] !== 'undefined')
                {
                    console.log('Image: '+ parseInt(data.current + 1) + '/'+props.nbImages);
                    methods.setContainerImage(data.current);
                }
            },
            getMax: function()
            {
                return props.nbImages;
            },
            setContainerImage: function(index)
            {
                container.find('img').first().attr('src', props.images[index]);
            },
            setWidth: function(width)
            {
                container.width(width);
                container.find('img').first().width(width);
            },
            setHeight: function(height)
            {
                container.height(height);
                container.find('img').first().height(height);
            }
        };

        $(document).bind('mdm-animation.beat', methods.eventChangeImage);
        methods.construct();

        return {
            loadImages: methods.loadImages,
            getMax: methods.getMax
        };
    };
})(jQuery, document);
