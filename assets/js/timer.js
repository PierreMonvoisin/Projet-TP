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

  // Scramble
  var possibleScramble = [
    "U' R F2 U' B F2 D U' B F2 U' L2 F2 U' L R' F' L' U R D' B2 R2 F2 D'",
    "D R2 D' L R2 F U B' U R D' B F2 D U B F R B F' L R' U' L' B2",
    "L2 D U' F U' R2 B U2 F' L2 R' D' B F' U2 R2 D' B F' D' B' F2 L F D'",
    "U2 R D' L B L R2 U2 L R' B D2 R' F' L2 R' B F' L2 R2 F R' D' B2 F",
    "R' F D' U' R' F' L' R' D2 L R2 D2 B' R' F2 L D B2 F' D' B R' B' F' U'",
    "D' B F2 U' L R2 B' F2 L' R' D2 B U' B D2 U2 B F D' B2 F' D U L' B2",
    "R2 F D' U2 L2 R D L2 R D' U' R' F U' L2 R U' L' U' F2 D L R' D2 L",
    "L D2 B' F D U L' F U F D2 U B2 F' D' U2 B' U' L' R2 F' L' D' B U",
    "D R2 D U2 L2 R2 U2 L2 R B U L2 U2 R2 D U2 B2 D' L2 B D' U' B' U B2",
    "D U2 L2 R B' L' D R F2 L D2 B' D F D2 L2 R' B' F' U' L' R U2 F' L",
    "B' F2 L B2 F D2 U R B F2 R U' R' U2 R F D' U2 F L2 F2 D2 F' L2 F2",
    "U' F L2 B2 F' D' B' R' D' U' L2 D' U' B' F2 U2 R2 B F L2 D2 U L B' D'",
    "D' F2 D U F U R2 D2 U' B' F' R2 F2 D2 U R' F2 L' U2 L' F D U L F",
    "B U2 R' D U2 B2 F2 L2 R2 B U' F U2 L2 R D' U2 L D' U F' R' D2 F' D'",
    "B' R B' L' R' B' R U F' L' B2 R D B' F2 D2 U2 L' R2 U' B2 U2 B' F2 U2",
    "L R' D L' R2 U B F D' R2 U2 L' R' D' U' B F R' B2 L' R' U' B2 F D2",
    "D F U2 L B' L R2 B' L D' U L2 R D U2 L' R' B2 D' U2 F' U' L R D'",
    "R' B2 D' B' F2 R F' D2 U' R2 F L2 D R2 F2 D' L2 R' U2 L' D2 L2 R2 F2 R2",
    "L2 R2 B U B2 F2 L2 R2 F U' F2 R D2 R U2 B F' U2 R2 F2 U' L2 R B2 F'",
    "B' D U' B F D2 U F2 R' D U2 F2 R D' U R2 B' L2 R' B2 L R2 D2 U2 F'",
    "D' L R D2 U L' R U F L2 R' D' U B R2 B2 F' D R F' L B F' U B",
    "R' D B' D' U L B F R2 D U' B' L2 U2 R F L' B' F2 L R2 U' B2 D' U'",
    "L2 U L R D' R U2 B2 F2 D' U2 B2 U F2 L2 R D' L R2 U B D U' L' B'",
    "D' U' L U2 F R' F2 D' F' D U' B2 F2 L' D' L' R' D R' B2 F U' R' B' F",
    "D' B2 F D2 L2 D L R2 U2 L' R2 D B F2 D' L' R' D' U B L R' D R' U2",
    "L' B D' U F' R U' B2 F' D2 R' U' R B2 U B' F2 U B F' L R' D2 U' B2",
    "B' U2 F2 R B2 D U2 L' D' U' B F R2 B2 L2 D2 U2 L' B' F D' B' U' L R2",
    "L2 U' B' F2 D U L2 R D L D U2 B2 F R2 B' D2 B' R' B2 U' B' F L' R'",
    "R U R2 B D2 L' R D' L' B' F' U' F2 L2 U B' D2 R2 D U2 B' R' D' U' B2",
    "L R' D' L D2 L' R' D U' B2 F2 L2 D' U2 R F' R' D2 L2 F2 L2 R2 B' D' U2"
  ];
  var scramble = possibleScramble[Math.floor(Math.random()*possibleScramble.length)];
  $('#scramble').html('<span class="py-2 px-2 border border-dark">' + scramble + '</span>');
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
  // Indicator that timer is ready
  $(document).keypress(function (e) {
    if ($('#start_stop').text() == 'Start'){
      if (e.keyCode == 32) {
        $("#timer").addClass('text-success');
      }
    }
    $(document).keyup(function(){
      if (e.keyCode == 32) {
        $("#timer").removeClass('text-success');
      }
    });
  });
  // Spacebar to trigger button
  $(document).keyup(function startTimer(e) {
    if ($("#start_stop").text() == "Stop"){
      $("#start_stop").button().click();
      return;
    }
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
      // Generate new scramble
      newScramble = possibleScramble[Math.floor(Math.random()*possibleScramble.length)];
      if (newScramble === scramble){
        newScramble = possibleScramble[Math.floor(Math.random()*possibleScramble.length)];
        $('#scramble').html('<span class="py-2 px-2 border border-dark">' + newScramble + '</span>');
      } else {
        $('#scramble').html('<span class="py-2 px-2 border border-dark">' + newScramble + '</span>');
      }
      scramble = newScramble;
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
