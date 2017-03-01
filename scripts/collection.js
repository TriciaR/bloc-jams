var collectionItemTemplate =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;

window.onload = function() {

    // #1 we select the first (and only, as we've designed it) element with an album-covers class name. We assign this specified element to a variable named collectionContainer
   
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    
    // #2 We assign an empty string to collectionContainer's innerHTML property to clear its content. This ensures we're working with a clean slate before we insert content with JavaScript
    
    collectionContainer.innerHTML = '';
    
    // #3 create a for loop that inserts 12 albums using the += operator, which appends content to strings. Each loop adds the contents of  collectionItemTemplate (the template) to the innerHTML of collectionContainer, thereby generating the albums that display on the collection page
    
        for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}
