/*!
 * @license MIT
 * @author Marek Kalnik
 * @copyright (c) Maisons du Monde
 */
;(function ($, document)
{
    "use strict";

    $.fn.MDMProgressBar = function (steps)
    {
        return this.each(function ()
        {
            var container = $(this),
                TEMPLATE = '<div class="total"><div class="progress"><div class="manipulator">&nbsp;</div></div></div>',
                methods,
                progressBar,
                manipulator,
                total,
                queueInterval = null,
                last = 0,
                max = steps - 1,
                progressBarMaxSize;

            methods = {
                construct:function ()
                {
                    container.addClass('mdm-progress-bar');
                    container.html(TEMPLATE);
                    progressBar = container.find('.progress');
                    manipulator = container.find('.manipulator');
                    total = container.find('.total');
                    progressBarMaxSize = container.width() - manipulator.width();

                    $(document).bind('mdm-animation.beat', methods.update);

                    manipulator.draggable({containment: ".total", drag: methods.changeOnDrag, axis: "x"});

                    total.click(methods.changeOnClick);
                },
                changeOnDrag:function (event, drag)
                {
                    var width = Math.max(0, drag.position.left);
                    var current;

                    if (width <= container.width())
                    {
                        progressBar.width(width);
                    }
                    else
                    {
                        progressBar.width(container.width());
                    }

                    current = methods.calculateSlide(progressBar.width());

                    if (last !== current)
                    {
                        methods.launchChangeEvent(current, $(event.currentTarget));
                    }
                },
                changeOnClick:function (event)
                {
                    var slide;

                    if ($(event.target).is(manipulator))
                    {
                        return false;
                    }

                    slide = methods.calculateSlide(event.offsetX);
                    methods.launchChangeEvent(slide, $(event.currentTarget));
                },
                launchChangeEvent:function (current, triggerer)
                {
                    if (queueInterval !== null)
                    {
                        clearInterval(queueInterval);
                    }

                    queueInterval = setTimeout(function ()
                    {
                        $(document).trigger('mdm-animation.beat', [
                            {current:current, max:max, triggerer:triggerer}
                        ]);
                    }, 6);
                },
                calculateSlide:function (position)
                {
                    return Math.max(0, Math.round((position / progressBarMaxSize) * max));
                },
                update:function (event, data)
                {
                    var width;

                    last = data.current;

                    if (manipulator.is(data.triggerer))
                    {

                        return true;
                    }

                    max = data.max;
                    width = Math.min(progressBarMaxSize, last / max * progressBarMaxSize);

                    progressBar.width(width);
                    manipulator.css({left: width});
                }
            };

            methods.construct();
        });
    };
})(jQuery, document);
