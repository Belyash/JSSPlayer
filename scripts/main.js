require(["jquery", "audioplayer", "bootstrap"], function($, audioplayer) {

    $(function () {

    	var $play = $("#play"),
	    	$playlist = $("#playlist"),
	    	$progress = $("#progress");

    	function selectTrack ($el) {
			var title = $el.text(),
				source = $el.attr("href");

			$playlist.find(".active").removeClass("active");
			$el.addClass("active");

			audioplayer.play(source);
			$progress.text(title);
		}

		$play.on("click", function () {
			var status = audioplayer.status(),
				$el;

			// if played
			if (status === 2) {
				audioplayer.pause();
			// if track is loaded
			} else if (status === 1) {
				audioplayer.play();
			// if not loaded track
			} else {
				selectTrack($playlist.find("a:first"));
			}

		});
	    
	    $playlist.on("click", "a", function () {

	    	selectTrack($(this));
	    	
	    	return false;
	    });

	    audioplayer.onPlay = function () {
	    	$play.addClass("played");
	    };

	    audioplayer.onPause = function () {
	    	$play.removeClass("played");
	    };

	    audioplayer.onTimeupdate = function (time, duration) {
	    	$progress.css({
	    		width: time / duration * 100 + "%"
	    	});
	    };

	    audioplayer.onEnded = function () {
	    	var $current = $playlist.find(".active"),
	    		$next = $current.next();

	    	if ($next.length) {
	    		selectTrack($next);
	    	}
	    };
    });
});