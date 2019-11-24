$(function(){
  var mouseX, mouseY;

  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    console.log('mouseY = ' + mouseY);
    if ( mouseY < 2) {
      $('header').slideDown('fast');
    }
    if ( mouseY > ($('header').height() + 20)) {
      $('header').slideUp('slow');
    }
  });

  $('#buttonLeft').click(function() {
    if ($('#sideTimer').is(":visible")) {
      $('#sideTimer').toggle('fast');
      $('#scramble, #timer').animate({right: '-=150px'});
    } else {
      $('#sideTimer').toggle('fast');
      $('#scramble, #timer').animate({right: '+=150px'});
    }
  });
});
