JSSPlayer
=========

JavaScript Simple Audio Player

####[Demo JSSPlayer](http://belyash.github.io/JSSPlayer/)

Use [RequireJS](http://requirejs.org/) to load JSSPlayer.

##How to use

<pre>
require(["audioplayer"], function(audioplayer) {

    // Start playback
    audioplayer.play("http://path/to/file.mp3");

    // Pause
    audioplayer.pause();

    // Go to 15 second
    audioplayer.time(15);

    // Get info about time
    // { current: 0; duration: 253; parsed: {current: "0:00"; duration: "4:13"} }
    audioplayer.time();

    // Get current playback status
    // 2 - if played
    // 1 - if track was loaded
    // 0 - if track was not loaded
    audioplayer.status()

    // Callbacks
    audioplayer.onPlay = function () { /* ... */ };
    audioplayer.onPause = function () { /* ... */ };
    audioplayer.onEnded = function () { /* ... */ };
    audioplayer.onTimeupdate = function () { /* ... */ };
    audioplayer.onError = function () { /* ... */ };

});
</pre>