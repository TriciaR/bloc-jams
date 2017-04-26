// #5 we remove the DOM selector (at #5) that gets the .point elements by class name. The jQuery selection of .point, added at #7, is terse enough that we don't need to store it in a variable anymore.
var animatePoints = function() {
  var revealPoint = function() {
  // we use the jQuery css() method in place of the multiple style property instances. Due to jQuery's cross-browser compatibility, we don't need to use vendor prefixes on the transform property.
  //  also the revealPoint function now refers to $(this) instead of a specific  .point element. To use this with jQuery, we must wrap it in a jQuery object.  $(this) (at #7) references a different .point element each time jQuery executes the  revealPoint() callback.
  $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });

  };
  // the revealPoint function no longer requires an argument. We replace the  for loop with the jQuery $.each() function. The $.each() function iterates over each .point element and executes the callback function, revealPoint.
  $.each($('.point'), revealPoint);
};

$(window).load(function() {      
  // we update the .innerHeight property to jQuery's height() method, which gets or sets an object's height. Since we pass no arguments to the function, we get the height.
     if ($(window).height() > 950) {
         animatePoints();
     }

    // we no longer need a separate variable to hold the .selling-points element since jQuery can select the element with many fewer characters. We replace  getBoundingClientRect() with jQuery's .offset() method.
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;



//  the addEventListener() method becomes jQuery's scroll() method, which takes a function as an argument. jQuery's scroll() "method" is still an event handler like addEventListener(), but the jQuery wrapper obscures the appearance of events. When the window scrolls, the function executes.
    $(window).scroll(function(event) {
      // we replace  document.documentElement.scrollTop || document.body.scrollTop with the jQuery equivalent of $(window).scrollTop().
        if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();

      }
    })
});
