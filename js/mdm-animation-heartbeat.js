/*!
 * @license MIT
 * @author Marek Kalnik
 * @copyright (c) Maisons du Monde
 */
;(function ($, document)
{
    "use strict";

    $.MDMAnimationHeartbeat = function (steps, speed)
    {
        var max = steps,
            current = 0,
            delay,
            interval,
            beat;

        // set default speed if none is passed as parameter
        delay = typeof speed !== 'undefined' ? speed : 70;

        $(document).bind('mdm-animation.stop', function ()
        {
            clearInterval(interval);
        });

        $(document).bind('mdm-animation.start', function ()
        {
            if (current > max)
            {
                $(document).trigger('mdm-animation.reset');
            }

            interval = setInterval(beat, delay);
        });

        $(document).bind('mdm-animation.reset', function ()
        {
            current = 0;
        });

        $(document).bind('mdm-animation.beat', function (event, animation)
        {
            current = animation.current + 1;
        });

        beat = function ()
        {
            $(document).trigger('mdm-animation.beat', [
                {'current':current, 'max':max}
            ]);

            if (current > max)
            {
                $(document).trigger('mdm-animation.stop');
            }
        };
    };
})(jQuery, document);
