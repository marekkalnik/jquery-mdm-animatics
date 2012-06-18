;(function($, document) {
    "use strict";

    $.MDMAnimationHeartbeat = function (steps)
    {
        var max = steps;
        var delay = 70;
        var current = 0;
        var interval;
        var beat;

        $(document).bind('mdm-animation.stop', function()
        {
            console.log('mdm-animation.stop event caught');
            clearInterval(interval);
        });

        $(document).bind('mdm-animation.start', function()
        {
            console.log('mdm-animation.start event caught');

            if (current > max)
            {
                $(document).trigger('mdm-animation.reset');
            }

            interval = setInterval(beat, delay);
        });

        $(document).bind('mdm-animation.reset', function()
        {
            console.log('mdm-animation.reset event caught');

            current = 0;
        });

        $(document).bind('mdm-animation.beat', function(event, animation)
        {
            current = animation.current + 1;
        });

        beat = function ()
        {
            $(document).trigger('mdm-animation.beat', [{'current': current, 'max': max}]);

            if (current > max)
            {
                $(document).trigger('mdm-animation.stop');
            }
        }
    }
})(jQuery, document);
