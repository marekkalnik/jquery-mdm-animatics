;(function ($, document)
{
    "use strict";

    $.fn.MDMImageViewport = function (images, settings)
    {
        if (!$.isArray(images) || images.length == 0)
        {
            throw "MDMImageViewport: You need to pass an non-empty array of image paths to viewport on instantiation";
        }

        return this.each(function ()
        {
            var container = $(this),
                config = $.extend({}, settings),

                props = {
                    loaded:false,
                    images:[],
                    current:0,
                    nbImages:0
                },

                methods = {
                    construct:function ()
                    {
                        $(document).bind('mdm-animation.beat', methods.eventChangeImage);
                        container.addClass('mdm-image-viewport');

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
