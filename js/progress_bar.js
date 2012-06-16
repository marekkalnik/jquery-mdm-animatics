(function($, document, window) {
    window.mdmScroll = function (target, steps)
    {
        var container = target;
        var bar = container.children('#bar');

        var last = 0;
        var max = steps;

        methods = {
            update: function(event, data)
            {
                var width;

                if (bar.is(data.triggerer))
                {
                    return;
                }

                width = container.width();

                max = data.max;
                last = data.current + 1;

                bar.width(last/max * width);

                console.log(bar.width());
            }
        };

        $(document).bind('animation.beat', methods.update);

        bar.drag("start",function(event, drag){
            drag.width = $(this).width();
        })
            .drag(function(event, drag){
                var width = Math.max(20, drag.width + drag.deltaX);
                var current;

                if (width <= container.width())
                {
                    $(this).width(width);
                }
                else
                {
                    $(this).width(container.width());
                }

                current = Math.round(($(this).width() / container.width()) * max);
                console.log('current:' + current);

                if (last !== current)
                {
                    $(document).trigger('animation.beat', [{current: current - 1, max: max, triggerer: $(this)}]);
                }
            }, { handle:'.handle' });
    };
})(jQuery, document, window);
