(function($, document, window) {
    "use strict";

    $.MDMAnimationHeartbeat = function (steps)
    {
        var max = steps;
        var delay = 70;
        var current = 0;
        var interval;
        var beat;

        $(document).bind('animation.stop', function()
        {
            console.log('animation.stop event caught');
            clearInterval(interval);
        });

        $(document).bind('animation.start', function()
        {
            console.log('animation.start event caught');

            if (current > max)
            {
                $(document).trigger('animation.reset');
            }

            interval = setInterval(beat, delay);
        });

        $(document).bind('animation.reset', function()
        {
            console.log('animation.reset event caught');

            current = 0;
        });

        $(document).bind('animation.beat', function(event, animation)
        {
            current = animation.current + 1;
        });

        beat = function ()
        {
            $(document).trigger('animation.beat', [{'current': current, 'max': max}]);

            if (current > max)
            {
                $(document).trigger('animation.stop');
            }
        }
    }
})(jQuery, document, window);
