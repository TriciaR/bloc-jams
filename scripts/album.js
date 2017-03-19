// CREATING ALBUM OBJECTS USING JS INSTEAD OF STATIC/REDUNDANT HTML

// In a real-world scenario, we would pull this information from a database, where we could store hundreds or thousands of albums and their corresponding details.

// first example album...

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
    { title: 'Magenta', duration: '2:15' }    
  ]
};

// another example album...
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

// create a function named createSongRow that generates the song row content 
// must declare the objects before the function because the createSongRow function uses the information stored in the album objects.

var createSongRow = function(songNumber, songName, songLength) {
  var template = 
    '<tr class="album-view-song-item">'
      +'<td class="song-item-number" data-song-number="' + songNumber + '">' +
      songNumber + '</td>'
      +'<td class="song-item-title">' + songName + '</td>'
      +'<td class="song-item-duration">' + songLength + '</td>'
    +'</tr>'
    ;  //why can't this go on above line after the closing </tr> tag?
    
    return template;

};

// create a function named setCurrentAlbum that the program calls when the window loads. It will take one of our album objects as an argument and will utilize the object's stored information by injecting it into the template

var setCurrentAlbum = function(album) {
  // select all of the HTML elements required to display on the albuam page: title, artist, release info, image, and song list. To populate these elements with information, assign the corresponding values of the album objects' properties to the HTML elements
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

//  the firstChild property identifies the first child node of an element, and nodeValue returns or sets the value of a node. Alternatively, we could technically use innerHTML to insert plain text (like we did in collection.js), but it's excessive and semantically misleading in this context because we aren't adding any HTML
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  //  clear the album song list HTML to make sure there are no interfering elements. (same as before with the innerHTML last checkpoint)

  albumSongList.innerHTML = '';

  // use a for loop, at #4, to go through all the songs from the specified album object and insert them into the HTML using the  innerHTML property. The createSongRow function is called at each loop, passing in the song number, name, and length arguments from our album object.
  
  for (var i = 0; i < album.songs.length; i++) {
      albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};
 
// Elements we'll be adding listeners to - on album.html
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');
 
// PLAY TEMPLATE - album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

// ADD PAUSE BUTTON TEMPLATE 

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

// Look up DOM tree to find Parent

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

// get Song Item - why can't we just write this out 
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
            //cached the song item that we're leaving in a variable.
                var songItem = getSongItem(event.target);
                var songItemNumber = songItem.getAttribute('data-song-number');
       
             //added the conditional that checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't.
                if (songItemNumber !== currentlyPlayingSong) {
                   songItem.innerHTML = songItemNumber;
               }
            });  
            songRows[i].addEventListener('click', function (event) {
              // Selects first child element, which is the song-item-number element
              clickHandler(event.target);
            });
           };
     })
}
