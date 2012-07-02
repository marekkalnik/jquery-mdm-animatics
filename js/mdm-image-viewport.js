/*!
 * @license MIT
 * @author Marek Kalnik
 * @copyright (c) Maisons du Monde
 */
;(function ($, document)
{
    "use strict";

    $.fn.MDMImageViewport = function (images, settings)
    {
        if (!$.isArray(images) || images.length === 0)
        {
            throw "MDMImageViewport: You need to pass an non-empty array of image paths to viewport on instantiation";
        }

        return this.each(function ()
        {
            var container = $(this),
                config = $.extend({}, settings),
                cache,

                props = {
                    loaded:false,
                    images:[],
                    current:0,
                    nbImages:0,
                    loadedImages:0
                },

                methods = {
                    construct:function ()
                    {
                        $(document).bind('mdm-animation.beat', methods.eventChangeImage);
                        container.addClass('mdm-image-viewport');
                        container.append('<div class="cache"></div>');
                        cache = container.children('.cache');
                        cache.hide();

                        if (config.width)
                        {
                            methods.setWidth(config.width);
                        }

                        if (config.height)
                        {
                            methods.setHeight(config.height);
                        }

                        methods.loadImages(images);
                        container.data('maxImages', props.nbImages);
                    },
                    loadImages:function (images)
                    {
                        var image = new Image(), i, len;

                        props.loaded = false;
                        props.images = images;

                        image.src = images[0];

                        image.onload = function ()
                        {
                            if (typeof config.width === 'undefined')
                            {
                                methods.setWidth('auto');
                            }
                            if (typeof config.height === 'undefined')
                            {
                                methods.setHeight('auto');
                            }

                            methods.imageLoaded();
                        };
                        cache.append($(document.createElement('img')).attr({src: images[0]}));

                        for (i = 1, len = images.length; i < len; i++)
                        {
                            image = new Image();
                            image.src = images[i];
                            image.onload = methods.imageLoaded;
                            cache.append($(document.createElement('img')).attr({src: images[i]}));
                        }

                        props.nbImages = len;
                    },
                    imageLoaded: function()
                    {
                        props.loadedImages++;
                        if (props.loadedImages === props.nbImages)
                        {
                            props.loaded = true;
                            $(document).trigger('mdm-image-viewport.images-loaded');
                            methods.setContainerImage(0);
                        }
                    },
                    eventChangeImage:function (event, data)
                    {
                        if (typeof props.images[data.current] !== 'undefined')
                        {
                            methods.setContainerImage(data.current);
                        }
                    },
                    setContainerImage:function (index)
                    {
                        container.find('img').first().attr('src', props.images[index]);
                    },
                    setWidth:function (width)
                    {
                        container.width(width);
                        container.find('img').first().width(width);
                    },
                    setHeight:function (height)
                    {
                        container.height(height);
                        container.find('img').first().height(height);
                    }
                };

            methods.construct();
        });
    };
})(jQuery, document);
