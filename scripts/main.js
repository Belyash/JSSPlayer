require(["jquery", "audioplayer", "bootstrap"], function($, audioplayer) {

    $(function () {

    	var $play = $("#play"),
	    	$playlist = $("#playlist"),
	    	$progress = $("#progress"),
	    	$progressBar = $progress.find(".progress-bar"),
	    	$timebox = $('<span class="badge">');

    	function toggleTrack ($el) {
			var title = $el.text(),
				source = $el.attr("href");

			if (audioplayer.status() === 2 && $el.hasClass("active")) {
				audioplayer.pause();
			} else {
				if ($el.hasClass("active")) {
					audioplayer.play();
				} else {
					audioplayer.play(source);
					$playlist.find(".active").removeClass("active");
					$el.addClass("active");
					$timebox.text("--:-- / --:--");
					$el.append($timebox);
				}
			}
		}

		$play.on("click", function () {
			var status = audioplayer.status(),
				$el;

			// if played
			if (status === 2) {
				audioplayer.pause();
			// if track was loaded
			} else if (status === 1) {
				audioplayer.play();
			// if track was not loaded
			} else {
				toggleTrack($playlist.find("a:first"));
			}

		});

		$progress.on("click", function (e) {
			var time = 0,
		 		$this = $(this);

		 	time = audioplayer.time().duration * e.offsetX / $this.width();

		 	audioplayer.time(time);

			return false;
		});
	    
	    $playlist.on("click", "a", function () {

    		toggleTrack($(this));
	    	
	    	return false;
	    });

	    audioplayer.onPlay = function () {
	    	$play.addClass("played");
	    };

	    audioplayer.onPause = function () {
	    	$play.removeClass("played");
	    };

	    audioplayer.onTimeupdate = function (time) {
	    	$timebox.text(time.parsed.current + " / " + time.parsed.duration);
	    	$progressBar.css({
	    		width: time.current / time.duration * 100 + "%"
	    	});
	    };

	    audioplayer.onEnded = function () {
	    	var $current = $playlist.find(".active"),
	    		$next = $current.next();

	    	if ($next.length) {
	    		toggleTrack($next);
	    	}
	    };
    });
});