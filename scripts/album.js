var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  // #1  assign a new Buzz sound object. We've passed the audio file via the audioUrl property on the currentSongFromAlbum object.-
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    // #2 - we've passed in a settings object that has two properties defined, formats and preload. 
    // formats is an array of strings with acceptable audio formats. We've only included the 'mp3' string because all of our songs are mp3s. 
    // Setting the preload property to  true tells Buzz that we want the mp3s loaded as soon as the page loads. 
    formats: [ 'mp3' ],
    preload: true
  });  
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '<td class="song-item-number" data-song-number="' + songNumber + '">' +
    songNumber + '</td>'
    + '<td class="song-item-title">' + songName + '</td>'
    + '<td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';

  var $row = $(template);

  var clickHandler = function() {
    var songNumber =  parseInt($(this).attr('data-song-number'));
      if (currentlyPlayingSongNumber !== null) {
      // Revert to song number for currently playing song because user started playing new song.
        var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber)
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
      }
      if (currentlyPlayingSongNumber !== songNumber) {      
        // Switch from Play -> Pause button to indicate new song is playing.
        $(this).html(pauseButtonTemplate);
        setSong(songNumber);
        updatePlayerBarSong();
      } else if (currentlyPlayingSongNumber === songNumber) {    
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      setSong(null);
      }
  };

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber =  songNumberCell.attr('data-song-number');
    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber =   songNumberCell.attr('data-song-number');
    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
    }

  console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
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

  $albumSongList.empty();

  for ( var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function() {
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  // Save the last song number before changing it
  var lastSongNumber = currentlyPlayingSongNumber;

  // Set a new current song
  setSong(currentSongIndex + 1);

  // Update the Player Bar information
  updatePlayerBarSong();

  $('.main-controls .play-pause').html(playerBarPauseButton);

  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  // Note that we're _decrementing_ the index here
  currentSongIndex--;

  if (currentSongIndex < 0) {
      currentSongIndex = currentAlbum.songs.length - 1;
  }

  // Save the last song number before changing it
  var lastSongNumber = currentlyPlayingSongNumber;

  // Set a new current song
  setSong(currentSongIndex + 1);

  // Update the Player Bar information
  updatePlayerBarSong();

  $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';

var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;

var currentlyPlayingSongNumber = null;

var currentSongFromAlbum = null;

var currentSoundFile = null;

var $previousButton = $('.main-controls .previous');

var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});

// PLAY & PAUSE - have to hover off then hover on again to change from PLAY to PAUSE o reverse
// PLAYER-BAR can't go PLAY/PAUSE with song list
