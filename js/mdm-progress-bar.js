;(function($, document) {
    "use strict";

    $.fn.MDMProgressBar = function (steps)
    {
        var container = this;
        var methods;
        var bar = container.children('.bar');
        var queueInterval = null;

        var last = 0;
        var max = steps - 1;

        methods = {
            update: function(event, data)
            {
                var width;

                last = data.current;

                if (bar.is(data.triggerer))
                {

                    return true;
                }

                width = container.width();

                max = data.max;

                bar.width(Math.min(width, last/max * width));

                console.log(bar.width());
            }
        };

        $(document).bind('mdm-animation.beat', methods.update);

        bar.drag("start", function(event, drag){
            drag.width = $(this).width();
        }).drag(function(event, drag){
            var width = Math.max(0, drag.width + drag.deltaX);
            var current;

            if (width <= container.width())
            {
                $(this).width(width);
            }
            else
            {
                $(this).width(container.width());
            }

            current = Math.max(0, Math.round(($(this).width() / container.width()) * max));

            if (last !== current)
            {
                if (queueInterval !== null)
                {
                    clearInterval(queueInterval);
                    queueInterval = null;
                }

                queueInterval = setTimeout(function() {
                    console.log('beat; current:' + current);
                    $(document).trigger('mdm-animation.beat', [{current: current, max: max, triggerer: $(this)}]);
                }, 6);
            }
        }, { handle:'.manipulator' });
    };
})(jQuery, document);
