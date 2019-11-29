$(function(){
  var mouseX, mouseY;

  // Top nav barre
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
  // Side timer stats
  $('#buttonLeft').click(function() {
    if ($('#sideTimer').is(":visible")) {
      $('#sideTimer').toggle('fast');
      $('#scramble, #timer').animate({right: '-=150px'});
    } else {
      $('#sideTimer').toggle('fast');
      $('#scramble, #timer').animate({right: '+=150px'});
    }
  });

  // Timer
  var hours = minutes = seconds = milliseconds = 0;
  var prev_hours = prev_minutes = prev_seconds = prev_milliseconds = undefined;
  var timeUpdate;

  if ($("#hours").html() == '00'){
    $("#hours, #separatorHours").hide();
  }
  if ($("#minutes").html() == '00'){
    $("#minutes, #separatorMinutes").hide();
  }
  // Spacebar to trigger button
  $(document).keyup(function (e) {
    if (e.keyCode == 32) {
      $("#start_stop").button().click();
    }
  });
  // Start/Stop button
  $("#start_stop").button().click(function(){
    // Start button
    if($(this).text() == "Start"){  // check button label
      $(this).html("<span class='ui-button-text'>Stop</span>");
      updateTime(0,0,0,0);
    }
    // Pause button
    else if($(this).text() == "Stop"){
      $(this).html("<span class='ui-button-text'>Start</span>");
      clearInterval(timeUpdate);
    }
  });
  // Update time in stopwatch periodically - every 1ms
  function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds){
    var startTime = new Date();    // fetch current time
    timeUpdate = setInterval(function () {
      var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in milliseconds
      // calculate hours
      hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;
      // calculate minutes
      minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
      if (minutes > 60) minutes %= 60;
      // calculate seconds
      seconds = parseInt(timeElapsed / 1000) + prev_seconds;
      if (seconds > 60) seconds %= 60;
      // calculate milliseconds
      milliseconds = timeElapsed + prev_milliseconds;
      if (milliseconds > 1000) milliseconds %= 1000;
      // set the stopwatch
      setStopwatch(hours, minutes, seconds, milliseconds);
    }, 1); // update time in stopwatch after every 1ms
  }
  // Set the time in stopwatch
  function setStopwatch(hours, minutes, seconds, milliseconds){
    $("#hours").html(prependZero(hours, 2));
    $("#minutes").html(prependZero(minutes, 2));
    $("#seconds").html(prependZero(seconds, 2));
    $("#milliseconds").html(prependZero(milliseconds, 3));
    if ($("#hours").html() == '00'){
      $("#hours, #separatorHours").hide();
    } else {
      $("#hours, #separatorHours").show();
    }
    if ($("#minutes").html() == '00'){
      $("#minutes, #separatorMinutes").hide();
    } else {
      $("#minutes, #separatorMinutes").show();
    }
  }
  // Prepend zeros to the digits in stopwatch
  function prependZero(time, length) {
    time = new String(time);    // stringify time
    return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
  }
});
