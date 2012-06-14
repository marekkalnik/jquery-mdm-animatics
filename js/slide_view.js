(function($, document, window) {
    window.mdmAnimator = function(target)
    {
        "use strict";

        var container = target;

        var props = {
            loaded: false,
            images: [],
            current: 0,
            delay: 25,
            interaval: null,
            nbImages: 0,
            displayer: null
        }

        var methods = {
            loadImages: function (images)
            {
                props.loaded = false;
                props.images = images;

                var image = new Image(),
                    i, len;

                // preload images
                for (i = 0, len = images.length; i < len; i++)
                {
                    image.src = images[i];
                }

                props.nbImages = len;
                props.loaded = true;
            },
            eventChangeImage: function(event, data)
            {
                if (typeof props.images[data.current] !== 'undefined')
                {
                    console.log('Image: '+ parseInt(data.current + 1) + '/'+props.nbImages);
                    $(container).find('img').attr('src', props.images[data.current]);
                }
            },
            getMax: function()
            {
                return props.nbImages;
            }
        };

        $(document).bind('animation.beat', methods.eventChangeImage);

        return {
            loadImages: methods.loadImages,
            getMax: methods.getMax
        };
    };
})(jQuery, document, window);
