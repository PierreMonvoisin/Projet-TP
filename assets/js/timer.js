$(function(){
  $('#sideTimer').slideToggle('fast');
  $('#sideTimer').addClass('d-flex');
  // Stats menu toggle
  $('#menuToggle').click(function() {
    if ($('#sideTimer').is(":visible")) {
      // After animation ends, remove display flex
      $('#sideTimer').slideToggle('fast', function(){
        $('#sideTimer').removeClass('d-flex');
      });
    } else {
      $('#sideTimer').slideToggle('fast');
      $('#sideTimer').addClass('d-flex');
    }
  });
});
