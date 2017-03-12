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
// Assignment#11

var albumClementi = {
  title: 'Sonatinas',
  artist: 'Muzio Clementi',
  label: 'Classical',
  year: '1793',
  albumArtUrl: 'assets/images/album_covers/Muzio_Clementi.jpg',
  songs: [
    { title: 'Sonatina Clementi: Opus 36, No. 1 - Spiritoso, Andante and Vivace', duration: '4:26' },
    { title: ' Sonatina Clementi: Opus 36, No. 2 - Allegretto, Allegretto and Allegro', duration: '3:14' },
    { title: 'Sonatina Clementi: Opus 36, No. 3 - Spiritoso, Un Poco Adagio and Allegro', duration: '5:01' },
    { title: 'Sonatina Clementi: Opus 36, No. 4 - Con Spirito, Andante Con Espressione and Rondo (Allegro Vivace)', duration: '3:21' },
    { title: 'Sonatina Clementi: Opus 36, No. 5 - Presto, Air Suisse and Rondo', duration: '2:15' }    
  ]
};


// create a function named createSongRow that generates the song row content 
// must declare the objects before the function because the createSongRow function uses the information stored in the album objects.

var createSongRow = function(songNumber, songName, songLength) {
  var template = 
  '<tr class="album-view-song-item">'
    +'<td class="song-item-number">' + songNumber + '</td>'
    +'<td class="song-item-title">' + songName + '</td>'
    +'<td class="song-item-duration">' + songLength + '</td>'
    +'</tr>'
    ;  //why can't this go on above line after the closing </tr> tag?
    
    return template;

};

// create a function named setCurrentAlbum that the program calls when the window loads. It will take one of our album objects as an argument and will utilize the object's stored information by injecting it into the template

var setCurrentAlbum = function(album) {
  // select all of the HTML elements required to display on the album page: title, artist, release info, image, and song list. To populate these elements with information, assign the corresponding values of the album objects' properties to the HTML elements
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
 
window.onload = function() {
     setCurrentAlbum(albumPicasso);

  // Add an event listener to the album cover. When a user clicks it, the album page content should toggle between the three album objects: albumPicasso, albumMarconi, and your album object.
    
    var albums = [albumClementi, albumPicasso, albumMarconi];
    var index = 1;
    // i is declared OUTSIDE of function so it increases by 1 , that state is remembered and carried to next event
    albumImage.addEventListener("click", function(event){
      setCurrentAlbum(albums[index]);
      index++;
      // click, to set current album @ index i
        if (index == albums.length) {
          index = 0;
        } 
      }); 
};
