jQuery.MDMAnimatics Plugin
==========================

This is a set of jQuery plugins allowing to create a full animatics view. It usese an event-oriented architecture to provide scalability and extensibility.

The plugin and all its components are published under MIT License. See the included LICENSE file for detailed information.

Dependencies
------------

 * jQuery 1.7
 * jquery.event.drag plugin [http://threedubmedia.com/code/event/drag] (included)

Examples
--------

See index.html for working example.

mdm-animation-heartbeat
-----------------------

MDMAnimationHeartbeat is the core of the plugin. In a specified frequency it diffuses a global event that tells the listeners to update the frame.

### Configuration

Accepts two parameters on instantiation:
 * steps - the number of total steps
 * speed - the delay between each beat

### Events:

* Triggers:
 * mdm-animation.reset - tells the listeners that the animation has been reset (ie. restarted)
 * mdm-animation.beat - tells the listeners to update the current frame; passes 'current' and 'max' as properties of the 2nd object
* Listens:
 * mdm-animation.start - tells the plugin to start beating
 * mdm-animation.stop - tells the plugin to start beating
 * mdm-animation.beat - updates the current frame by 1

mdm-animation-launcher
----------------------

This plugin is a simple event binder allowing the target Node to launch start/stop events on click.
Click binding is exchanged on each event trigger.

### Events:

* Triggers:
 * mdm-animation.start
 * mdm-animation.stop

mdm-image-viewport
------------------

This is the viewport for displaying images. It handles image loading and switching.

### Configuration

Accepts two parameters on instantiation:

 * images - An array of image urls. Images will be displayed in the order of the array. Required.
 * settings - An optional object parameter. Two properties (height and width) are used to configure viewport HTML element.

### Events

 * Listens:
  * mdm-animation.beat - updates the image according to received data

mdm-progress-bar
----------------

MDMProgressBar displays the animation progress and lets the user interact with it by moving the bar.

### Configuration

Requires one argument:

 * steps - the number of total animation steps

### Events

 * Triggers
  * mdm-animation.beat - launches a single beat with image number on scrollbar drag or click to change the image
 * Listens
  * mdm-animation.beat - updates the progress bar according to received data
