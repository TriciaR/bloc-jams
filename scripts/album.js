var setSong = function (songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber-1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {

        formats: [ 'mp3' ],
        preload: true
    });

    setVolume(currentVolume);
};

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' +
        '<td class="song-item-number" data-song-number="' + songNumber + '">' +
        songNumber + '</td>' +
        '<td class="song-item-title">' + songName + '</td>' +
        '<td class="song-item-duration">' + filterTimeCode(songLength) + '</td>' +
        '</tr>';
    var $row = $(template);

    var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);      
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            setSong(songNumber);
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updateSeekBarWhileSongPlays();
            var $volumeFill = $('.volume .fill');
            var $volumeThumb = $('.volume .thumb');
            $volumeFill.width(currentVolume + '%');
            $volumeThumb.css({left: currentVolume + '%'});
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
            }         
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function(album) {

    currentAlbum = album;

    var $albumTitle = $('.album-view-title');

    var $albumArtist = $('.album-view-artist');

    var $albumReleaseInfo = $('.album-view-release-info');

    var $albumImage = $('.album-cover-art');

    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);

    $albumArtist.text(album.artist);

    $albumReleaseInfo.text(album.year + ' ' + album.label);

    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        setCurrentTimeInPlayerBar();
        currentSoundFile.bind('timeupdate', function(event) {
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
        
        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });

        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};
    
var updatePlayerBarSong = function() {
    setTotalTimeInPlayerBar();
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - "+ currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setCurrentTimeInPlayerBar = function (currentTime) {
    $('.current-time').text(filterTimeCode(currentTime));    // -----sets the text of the element of .current-time class = current time in the song. 
    console.log(currentTime);
    console.log(setCurrentTimeInPlayerBar());
    //----- Add the method to updateSeekBarWhileSongPlays() so the current time updates with song playback.
    // ~~~~~ Wrap the arguments passed to setCurrentTimeInPlayerBar() in a filterTimeCode() call so the time output below the seek bar is formatted.
};

var setTotalTimeInPlayerBar = function(totalTime) {
    if (totalTime !== null) {
        $('.total-time').text(filterTimeCode(totalTime));//--- sets the text of the element with the .total-time class to the length of the song.
        //---++++---Add the method to updatePlayerBarSong() so the total time is set when a song first plays.
        //~~~~ Wrap the arguments passed setTotalTimeInPlayerBar() in a filterTimeCode() call so the time output below the seek bar is formatted.
        setTotalTimeInPlayerBar();
    } else { 
        return setTotalTimeInPlayerBar(0);
    }
};

var filterTimeCode = function(timeInSeconds) {

    var songToTime = parseFloat(parseInt(timeInSeconds)); //---Use the parseFloat() method to get the seconds in number form.
    console.log(songToTime);

    var getSongInMinutes = Math.floor(songToTime / 60);  //------ Store variables for whole seconds and whole minutes (hint: use Math.floor() to round numbers down).
    console.log(getSongInMinutes);

    var getSongInSeconds = songToTime % 60;  // ----Find remainder of song in seconds
    console.log(getSongInSeconds);

    return getSongInMinutes + ":" + getSongInSeconds;//------ Return the time in the format X:XX
};

//	++ FINISH AS-21 ------ Wrap the songLength variable in createSongRow() in a filterTimeCode() call so the time lengths are formatted.

var previousSong = function() {
    var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    var lastSongNumber = parseInt(currentlyPlayingSongNumber);
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var nextSong = function() {
    var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
    }
    
    var lastSongNumber = parseInt(currentlyPlayingSongNumber);
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = parseInt(null);
var currentSongFromAlbum = null;
var currentSoundFile = null;

var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var togglePlayerBarPlayPause = $('.main-controls .play-pause');

var togglePlayFromPlayerBar = function () {
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

    if (!currentSoundFile) {
        setSong(1);
        updatePlayerBarSong();
        currentSoundFile.play();
        togglePlayerBarPlayPause.html(playerBarPauseButton);
        
        currentlyPlayingCell = getSongNumberCell(1);
        currentlyPlayingCell.html(pauseButtonTemplate);
    } else {
        if (currentSoundFile.isPaused()) {
            currentSoundFile.play();
            togglePlayerBarPlayPause.html(playerBarPauseButton);
            currentlyPlayingCell.html(pauseButtonTemplate);
        } else {
            currentSoundFile.pause();
            togglePlayerBarPlayPause.html(playerBarPlayButton);
            currentlyPlayingCell.html(playButtonTemplate);
        }
    }
};

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();//click functionality to seek bars doesn't work
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    togglePlayerBarPlayPause.click(togglePlayFromPlayerBar);
});
