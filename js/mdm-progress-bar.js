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
                max = steps - 1;

            methods = {
                construct:function ()
                {
                    container.addClass('mdm-progress-bar');
                    container.html(TEMPLATE);
                    progressBar = container.find('.progress');
                    manipulator = container.find('.manipulator');
                    total = container.find('.total');

                    $(document).bind('mdm-animation.beat', methods.update);

                    manipulator.drag("start", methods.startDrag).drag(methods.changeOnDrag, { handle:'.manipulator' });

                    total.click(methods.changeOnClick);
                },
                startDrag:function (event, drag)
                {
                    drag.width = progressBar.width();
                },
                changeOnDrag:function (event, drag)
                {
                    var width = Math.max(0, drag.width + drag.deltaX);
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
                        methods.lanuchChangeEvent(current, $(event.currentTarget));
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
                    methods.lanuchChangeEvent(slide, $(event.currentTarget));
                },
                lanuchChangeEvent:function (current, triggerer)
                {
                    if (queueInterval !== null)
                    {
                        clearInterval(queueInterval);
                        queueInterval = null;
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
                    return Math.max(0, Math.round((position / container.width()) * max));
                },
                update:function (event, data)
                {
                    var width;

                    last = data.current;

                    if (manipulator.is(data.triggerer))
                    {

                        return true;
                    }

                    width = container.width();

                    max = data.max;

                    progressBar.width(Math.min(width, last / max * width));
                }
            };

            methods.construct();
        });
    };
})(jQuery, document);
