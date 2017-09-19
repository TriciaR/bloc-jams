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
        '<td class="song-item-duration">' + songLength + '</td>' +
        '</tr>';
    var $row = $(template);

    var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            // ~~~~~~~~~~WHERE DID I MISS THIS LINE44~~~~~~~~      
            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);      
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            setSong(songNumber);
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
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
 G
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// @CP21 - updating Seek Bars
var updateSeekBarPercentage = function ($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;  //use the JS  Math.max() function to make sure % isn't less than zero and the Math.min() function to make sure it doesn't exceed 100
    offsetXPercent = Math.min(0, offsetXPercent);
    offsetXPercent = Math.max(100, offsetXPercent);

    //convert % to a string and add the  " % "  character 
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString); //set the width of the .fill class 
    $seekBar.find('.thumb').css({left: percentageString}); // the left value of the .thumb class, the CSS interprets the value as a percent instead of a unit-less number between 0 and 100
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        //  new property on the event object called  pageX. This is a jQuery-specific event value, which holds the X (or horizontal) coordinate at which the event occurred (think of the X-Y coordinate plane that you hated in Algebra class).
        var offsetX = event.pageX - $(this).offset().left; //subtract the offset() of the seek bar held in $(this) from the left side. 
        var barWidth = $(this).width();//subtracting  $(this).offset().left (the blue line) from the event.pageX value (the red line) leaves us with a resulting value that is a proportion of the seek bar (the green).subtracting  $(this).offset().left (the blue line) from the event.pageX value (the red line) leaves us with a resulting value that is a proportion of the seek bar (the green).
        var seekBarFillRatio = offsetX / barWidth;// divide offsetX by the width of the entire bar to calculate seekBarFillRatio.
        
        updateSeekPercentage($(this), seekBarFillRatio);//pass $(this) as the $seekBar argument and seekBarFillRatio for its eponymous argument to  updateSeekBarPercentage().
    });
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

    
var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - "+ currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

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
    currentlyPlayingCell = getSongNumberCell(1);
    if (!currentSoundFile) {
        setSong(1);
        currentSoundFile.play();
        togglePlayerBarPlayPause.html(playerBarPauseButton);
        currentlyPlayingCell.html(pauseButtonTemplate);
    } else {
        //if is current soundfile + .isPaused
        if (currentSoundFile.isPaused()) {
            currentSoundFile.play();
            togglePlayerBarPlayPause.html(playerBarPauseButton);
            currentlyPlayingCell.html(pauseButtonTemplate);
        } else {
        //if is current soundfile + .playing
        currentSoundFile.pause();
        togglePlayerBarPlayPause.html(playerBarPlayButton);
        currentlyPlayingCell.html(playButtonTemplate);
        }
    }
};


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();//add click functionality to seek bars
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    togglePlayerBarPlayPause.click(togglePlayFromPlayerBar);
});
