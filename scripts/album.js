var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1981',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21' },
    { title: 'Magenta', duration: '2:15'}
  ]
};

var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21' },
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
      +'<td class="song-item-number" data-song-number="' + songNumber + '">' +
      songNumber + '</td>'
      +'<td class="song-item-title">' + songName + '</td>'
      +'<td class="song-item-duration">' + songLength + '</td>'
    +'</tr>';
    return $(template);

//  Recall that this is a contextual object in JavaScript. Unless otherwise stated using apply(), call(), or bind(), this refers to the object that is calling the method which relies on this. As we refactor our play and pause button functions during this checkpoint, we'll use  this to reference the jQuery objects to which we've attached event listeners.

    var $row = $(template);
       var clickHandler = function() {
       // clickHandler logic -jQuery's click event listener executes the callback we pass to it when the target element is clicked. Notice that clickHandler() no longer takes any arguments, which we'll address in our clickHandler() refactor.
      var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
          // Revert to song number for currently playing song because user started playing new song.
          var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
          currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
          // Switch from Play -> Pause button to indicate new song is playing.
          $(this).html(pauseButtonTemplate);
          currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
          // Switch from Pause -> Play button to pause currently playing song.
          $(this).html(playButtonTemplate);
          currentlyPlayingSong = null;
        }
      };
      };

      // $2 -The hover() event listener at #2 combines the mouseover and mouseleave functions we relied on previously. The first argument is a callback that executes when the user mouses over the $row element and the second is a callback executed when the mouse leaves $row.
      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

      var offHover = function(event) {
        var songNumberCell = $(this).find  ('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
      // #1  Query find() method at #1 is similar to querySelector(). We call it here to find the element with the .song-item-number class that's contained in whichever row is clicked
      $row.find('.song-item-number').click(clickHandler);

      $row.hover(onHover, offHover);
      // #3 - we return $row, which is created with the event listeners attached.
      return $row;
};

var setCurrentAlbum = function(album) {
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

  for ( var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

// var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

// var findParentByClassName = function(element, targetClass) {
//     if (element) {
//         var currentParent = element.parentElement;
//         while (currentParent.className !== targetClass && currentParent.className !== null) {
//             currentParent = currentParent.parentElement;
//         }
//         return currentParent;
//     }
// };

// var getSongItem = function(element) {
//     switch (element.className) {
//         case 'album-song-button':
//         case 'ion-play':
//         case 'ion-pause':
//             return findParentByClassName(element, 'song-item-number');
//         case 'album-view-song-item':
//             return element.querySelector('.song-item-number');
//         case 'song-item-title':
//         case 'song-item-duration':
//             return findParentByClassName(element, 'album-view-son]g-item').querySelector('.song-item-number');
//         case 'song-item-number':
//             return element;
//         default:
//             return;
//     }
// };

// var clickHandler = function(targetElement) {

//     var songItem = getSongItem(targetElement);

//     if (currentlyPlayingSong === null) {
//     songItem.innerHTML = pauseButtonTemplate;
//     currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//          songItem.innerHTML = playButtonTemplate;
//          currentlyPlayingSong = null;
//     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//          var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//          songItem.innerHTML = pauseButtonTemplate;
//          currentlyPlayingSong = songItem.getAttribute('data-song-number');
//      }
//    };

//  window.onload = function() {
 $(document).ready(function() {
    setCurrentAlbum(albumPicasso);

    // songListContainer.addEventListener('mouseover', function(event) {
    //      if (event.target.parentElement.className === 'album-view-song-item') {

    //         var songItem = getSongItem(event.target);

    //         if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
    //             songItem.innerHTML = playButtonTemplate;
    //         }
    //     }

        // for (var i = 0; i < songRows.length; i++) {
            // songRows[i].addEventListener('mouseleave', function(event) {
            //     var songItem = getSongItem(event.target);
            //     var songItemNumber = songItem.getAttribute('data-song-number');

            //     if (songItemNumber !== currentlyPlayingSong) {
            //        songItem.innerHTML = songItemNumber;
            //    }
            // });

            // songRows[i].addEventListener('click', function (event) {
                // clickHandler(event.target);
            // });
        //    };
    //  })
});
