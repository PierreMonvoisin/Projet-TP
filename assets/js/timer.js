$(function(){
  var mouseX, mouseY;

  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    console.log('mouseY = ' + mouseY);
    if ( mouseY < 2) {
      $('header').slideDown('fast');
    }
    if ( mouseY > $('header').height()) {
      $('header').slideUp('slow');
    }
  });

  $('#buttonLeft').click(function() {
    if ($('#sideTimer').is(":visible")) {
      $('#scramble, #timer').animate({right: '-=150px'})
      $('#sideTimer').toggle('fast');
    } else {
      $('#scramble, #timer').animate({right: '+=150px'})
      $('#sideTimer').toggle('fast');
    }
  });
});
