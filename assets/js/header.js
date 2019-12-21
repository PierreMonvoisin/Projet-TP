$(function(){
  var mouseX, mouseY;
  // Check mouse position to trigger top navigation tabs
  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    // If the mouse is at the top of the screen, open the menu
    if ( mouseY < 10) {
      $('header').slideDown('fast');
    }
    // Else, close the menu
    if ( mouseY > ($('header').height() + 20)) {
      $('header').slideUp('slow');
    }
  });
  // If mouse leaves screen, open menu [Might delete later]
  // $(document).mouseleave(function() {
  //   $('header').slideDown('fast');
  // });
});
