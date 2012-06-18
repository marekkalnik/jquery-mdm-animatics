/*!
 * @license MIT
 * @author Marek Kalnik
 * @copyright (c) Maisons du Monde
 */
;(function ($, document)
{
    "use strict";

    $.fn.MDMAnimationLauncher = function ()
    {
        return this.each(function ()
        {
            var container = $(this),

                animStart = function ()
                {
                    $(document).trigger('mdm-animation.start');
                },
                animStop = function ()
                {
                    $(document).trigger('mdm-animation.stop');
                },
                setStopped = function ()
                    {
                        container.unbind('click', animStop);
                        container.bind('click', animStart);
                    },
                setStarted = function ()
                {
                    container.unbind('click', animStart);
                    container.bind('click', animStop);
                };

                container.addClass('mdm-animation-launcher');
                container.bind('click', animStart);
                $(document).bind('mdm-animation.stop', setStopped);
                $(document).bind('mdm-animation.start', setStarted);
        });
    };
})(jQuery, document);