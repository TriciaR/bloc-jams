// var albumPicasso = {
//   title: 'The Colors',
//   artist: 'Pablo Picasso',
//   label: 'Cubism',
//   year: '1981',
//   albumArtUrl: 'assets/images/album_covers/01.png',
//   songs: [
//     { title: 'Blue', duration: '4:26' },
//     { title: 'Green', duration: '3:14' },
//     { title: 'Red', duration: '5:01' },
//     { title: 'Pink', duration: '3:21' },
//     { title: 'Magenta', duration: '2:15'}
//   ]
// };

// var albumMarconi = {
//   title: 'The Telephone',
//   artist: 'Guglielmo Marconi',
//   label: 'EM',
//   year: '1909',
//   albumArtUrl: 'assets/images/album_covers/20.png',
//   songs: [
//     { title: 'Hello, Operator?', duration: '1:01' },
//     { title: 'Ring, ring, ring', duration: '5:01' },
//     { title: 'Fits in your pocket', duration: '3:21' },
//     { title: 'Can you hear me now?', duration: '3:14' },
//     { title: 'Wrong phone number', duration: '2:15' }
//   ]
// };
// 
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
      +'<td class="song-item-number" data-song-number="' + songNumber + '">' +
      songNumber + '</td>'
      +'<td class="song-item-title">' + songName + '</td>'
      +'<td class="song-item-duration">' + songLength + '</td>'
    +'</tr>';
    return $(template);

    var $row = $(template);
      var clickHandler = function() {
        // var songNumber = $(this).attr('data-song-number');
      var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
        // if (currentlyPlayingSong !== null) {
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
          // var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
          currentlyPlayingCell.html(currentlyPlayingSongNumber);
          // currentlyPlayingCell.html(currentlyPlayingSong);
        }
        
        if (currentlyPlayingSongNumber !== songNumber) {         // Switch from Play -> Pause button to indicate new song is playing.
        // if (currentlyPlayingSong !== songNumber) {
            $(this).html(pauseButtonTemplate);
            // currentlyPlayingSong = songNumber;
          currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
          updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {         // Switch from Pause -> Play button to pause currently playing song.
        // } else if (currentlyPlayingSong === songNumber) {
          $(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
          // currentlyPlayingSong = null;
          currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
        }
      };
      };

      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        // if (songNumber !== currentlyPlayingSong) {
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

      var offHover = function(event) {
        var songNumberCell = $(this).find  ('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
        // if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        };
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
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
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
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

// var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

// var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';

var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;

var currentlyPlayingSongNumber = null;

var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');

var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
