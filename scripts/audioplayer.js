define(function (require) {

    var audioTag = new Audio(),
        player,
        status = 0;

    function secToTimeCode (time) {
    	var parsedTime = [
    			Math.floor(time / 3600) % 24,
            	Math.floor(time / 60) % 60,
            	Math.floor(time % 60)
        	],
        	i,
            response = "";

        for (i = 0; i < parsedTime.length; i += 1) {
        	if (i !== 0 || parsedTime[i] !== 0) {
	        	if (parsedTime[i] < 10 && response !== "") {
	    			response += "0" + parsedTime[i];
	        	} else {
	        		response += parsedTime[i];
	        	}
	        	if (i < parsedTime.length - 1) {
	        		response += ":";
	        	}
        	}
        }

        return response || "00:00";
    }

    player = {
        play: function (source) {

            if (source) {
                // Включаем новый трек
                audioTag.src = source;

                if (audioTag.readyState === 0) {
                    // Воспроизведение нового трека начнется после того,
                    // как отработает событие canplay (см. ниже)
                    audioTag.load();
                }

            } else {
                audioTag.play();
            }
        },
        pause: function () {
            audioTag.pause();
            this.onPause(audioTag.currentTime);
        },
        status: function () {
        	return status;
        },
        time: function (time) {

        	if (time) {
        		audioTag.currentTime = time;
        	}
            
            return {
    			current: audioTag.currentTime,
    			duration: audioTag.duration,
    			parsed: {
    				current: secToTimeCode(audioTag.currentTime),
    				duration: secToTimeCode(audioTag.duration)
    			}
    		};
        },
        onPlay: function (time) {
        	console.log("onPlay: %s", time);
        },
        onPause: function (time) {
        	console.log("onPause: %s", time);
        },
        onTimeupdate: function (time, duration) {
        	console.log("onTimeupdate, currentTime: %s, duration: %s", time, duration);
        },
        onEnded: function () {
        	console.log("Ended");
        },
        onError: function (text, error) {
        	console.log(text, error);
        }
    };

    audioTag.addEventListener("play", function () {
    	status = 2;
    	player.onPlay(player.time());
    });

    audioTag.addEventListener("pause", function () {
    	status = 1;
    	player.onPause(player.time());
    });

    audioTag.addEventListener("timeupdate", function () {
        player.onTimeupdate(player.time());
    });

    audioTag.addEventListener("ended", function () {
        player.onEnded();
    });

    audioTag.addEventListener("canplay", function () {
        audioTag.play();
    });

    audioTag.addEventListener('error', function (e) {
    	var text = "";

        switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
            text = 'Воспроизведение было прервано.';
            break;
        case e.target.error.MEDIA_ERR_NETWORK:
            text = 'Проблемы с сетью, загрузка аудиофайла прервана.';
            break;
        case e.target.error.MEDIA_ERR_DECODE:
            text = 'Браузер не смог декодировать аудиозапись.';
            break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            text = 'Браузер не поддерживает данный формат аудиозаписи.';
            break;
        default:
            text = 'Ошибка воспроизведения аудиозаписи.';
            break;
        }

        player.onError(text, e.target.error);
    }, true);

    return player;
});