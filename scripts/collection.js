// var collectionItemTemplate =
// #1 We change the name of the variable that stores the template from  collectionItemTemplate to template. Although we don't use any jQuery methods, we may later. To support that, we wrap template in a jQuery object (at #2) to future-proof it
// Note that when naming action-oriented functions, it's a convention to start the function name with a verb. In that spirit, we name the function  buildCollectionItemTemplate (at #1).

var buildCollectionItemTemplate = function() {
    var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/0P1.png"/>'
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

    return $(template);
};
     // Change window.onload to its jQuery equivalent of  $(window).load()    

// window.onload = function() {
$(window).load(function() {
// #3 - substitute DOM selection with the shorter jQuery alternative. When the element selection becomes a jQuery object, we prefix the collectionContainer variable name with a $, a convention that identifies jQuery-related variables.
    // var collectionContainer = document.getElementsByClassName('album-covers')[0];
    var $collectionContainer = $('.album-covers');
//#4 - replace the vanilla DOM scripting innerHTML property with the jQuery empty() method. The empty() method, like many jQuery operations, is literal in what it does – it empties, or removes, any text or other elements from the element(s) it is called on.
     // collectionContainer.innerHTML = '';
    $collectionContainer.empty();

    for (var i = 0; i < 12; i++) {
// #5 - replace += in the for loop with the append() method. With each loop, we append the template content to the collection container.
        // collectionContainer.innerHTML += collectionItemTemplate;
        var $newThumbnail = buildCollectionItemTemplate();
        $collectionContainer.append($newThumbnail);
    }
});
