define(function (require) {

    var audioTag = new Audio(),
        player,
        status = 0;

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
    			duration: audioTag.duration
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
    	player.onPlay(audioTag.currentTime);
    });

    audioTag.addEventListener("pause", function () {
    	status = 1;
    	player.onPause(audioTag.currentTime);
    });

    audioTag.addEventListener("timeupdate", function () {
        player.onTimeupdate(this.currentTime, audioTag.duration);
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

        player.onError(text, e);
    }, true);

    return player;
});