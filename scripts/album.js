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
    // return template;
    return $(template);
};

var setCurrentAlbum = function(album) {
// refactor the DOM selectors in the setCurrentAlbum function - replace each instance of getElementsByClassName with a jQuery selector and use CSS-style syntax to select the elements. Additionally, we add a $ to the start of each variable name because they now reference jQuery objects.
    //var albumTitle = document.getElementsByClassName('album-view-title')[0];
    //var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    //var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    //var albumImage = document.getElementsByClassName('album-cover-art')[0];
    //var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

// Refactor the values assigned to the album detail elements - We call jQuery's text() method to replace the content of the text nodes, instead of setting firstChild.nodeValue. We also change the setAttribute() method to jQuery's attr() method, which changes the element attribute using the same arguments.
// When a jQuery selector returns a single element, we can access it without array-index syntax. For example, we can call a jQuery method directly on a selector without recovering the first (and only) item in the array.
    //albumTitle.firstChild.nodeValue = album.title;
    //albumArtist.firstChild.nodeValue = album.artist;
    //albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    //albumImage.setAttribute('src', album.albumArtUrl);
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

//   albumSongList.innerHTML = '';
    $albumSongList.empty();

  for ( var i = 0; i < album.songs.length; i++) {
    // albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-son]g-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {

    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
   };

 window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        // the target property on the event object (above) stores the DOM element where the event occurred. Enable Live Preview and open up the Developer Console. Mouse over the table, and the element where the event is dispatched will be logged to the console.
                 // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {

            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }

        for (var i = 0; i < songRows.length; i++) {
            songRows[i].addEventListener('mouseleave', function(event) {
                var songItem = getSongItem(event.target);
                var songItemNumber = songItem.getAttribute('data-song-number');

                if (songItemNumber !== currentlyPlayingSong) {
                   songItem.innerHTML = songItemNumber;
               }
            });

            songRows[i].addEventListener('click', function (event) {
              clickHandler(event.target);
            });
           };
     })
}
