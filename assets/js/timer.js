$(function(){
  var mouseX, mouseY;

  // Top nav barre
  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
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
    "L R' D' L D2 L' R' D U' B2 F2 L2 D' U2 R F' R' D2 L2 F2 L2 R2 B' D' U2",
    "U2 B' F L' R' D L' R' F2 D2 F L2 B' R F' L2 R U B' D' L R' D2 F L2",
    "U2 R' U2 L R' D' U2 F L' U2 R2 F2 D' F R' B2 D2 R' B2 L' F2 L2 D L B",
    "F R2 F U2 B L2 D U' L F' L' U' L2 B U L R2 F' D2 B U' L F' R2 U'",
    "L' D U L' U' B L' F' D B' F D' R2 D2 U2 B' D' B2 F2 U2 L D2 B' R B",
    "D' F' L2 B' F' R2 B2 L' U' L2 B D2 F' L2 U2 B D2 L2 F' U2 F' D L2 R F2",
    "L R F' D2 L2 R B' L2 B' R' B' F2 U B U2 R D' B2 R' U' L' D' B' R2 B",
    "D B L' F' R U F' L' B F2 L2 B' F' D2 B' R2 U R' D F' D2 L U L' R'",
    "L' R2 U B2 L D2 R D' R B' L2 R2 B2 F R2 D L B' R F U R2 U2 R2 F2",
    "D' U' R2 B2 U B' F L' R D' L U L R2 D' R' U L U B2 F L2 D2 U2 R",
    "B2 L2 U2 B2 F R U' F L R B D L B2 L2 R B2 F2 L2 R' U B' F L2 R",
    "U' R' B2 F2 U B' L2 F' U' B' U F L' B' F2 L' B2 R D' F' R' B F' D2 U",
    "L F U2 R B' D2 R U2 R2 D F2 R2 F2 U2 L2 D B F' U2 L2 R2 B2 U' B F2",
    "L B2 F2 R B U L2 R2 U2 R2 U2 F D L' R' B2 L' D R' F' R2 D R2 B U'",
    "B2 R2 B' F2 R' D' L2 B U2 R B' F2 L B F2 D B2 R' F2 U' F2 R' B F' R2",
    "B2 L2 U' F2 R' D' U B L U2 L2 F R' D' U L2 R' U B2 F2 L2 F2 D2 U L2",
    "B2 D' L U F2 D' L2 F' R U2 B' R' U' R D L B' D R B' F2 L' U R D",
    "B2 F R F R' F L2 R' D' U2 B' D' U2 L2 B' L D U2 L2 D2 L2 D' U L' B2",
    "D2 U' L' F2 R' D2 R2 F2 D2 U' L D' L2 R B2 L B' U2 F' L' R2 F' D' L R'",
    "B' F2 L B' F U' F D2 U2 R2 B' F2 D2 B2 F' R' D2 F D' U' F2 L B F L'",
    "D2 U' B2 U R2 F2 D' U' R B2 D U F2 L' D L D U' R D B2 F' L2 F2 U",
    "F R' B2 D' U2 F D R' D2 U2 F' R B' F2 U' B2 D2 B2 D F' D2 U' R U B'",
    "L' R U2 F' U F2 D' L2 R F U2 F' L2 D2 F' L U' R' U' L2 B D2 U L U2",
    "R B' R' F' D' B2 D R U' L B' L2 B' F' U2 B U2 B F2 L D' F2 L U' R2",
    "B L' U' L' U' F2 L' R2 F2 L2 D2 B2 L' B F L2 R B' U' B D' U' F2 R U'",
    "U B2 R2 D2 R' B2 U L' F' U2 F2 U' F2 R2 B L' R2 B F2 U L R' U2 B' R2",
    "B D' F2 D F L F' D R F' U2 B F D' R D2 F U R D2 U' B2 U L2 B2",
    "U' L2 D B2 F D' B' F2 D F2 D' F2 D' F2 U' L' D R2 D' U L2 B D' L' R",
    "F' U R' B' D U2 B' L' D2 L' B U' L2 R2 B2 F R D2 U B' F' L' B F' R2",
    "B D U' B2 D' L2 B L' F' R F' D' R2 B2 L' U2 R' D2 B2 R2 B F' L2 R2 D2",
    "B' U' L D2 B R B U' B D2 U R U2 R' F2 L2 B L' F' U B2 U2 R2 F2 L2",
    "U F' L2 D2 U L2 R' D' L' R D2 U' F U2 B' F' R' B' D L F' L' R' B D",
    "D2 R2 B' U2 B2 U2 B' D' L' D' B' L U L F2 L' R2 B F2 D2 U R' B F' U'",
    "F2 R' F' R2 D' B2 D' L2 U' L' R2 D F' L2 U' L' B R2 D2 B F2 L' B' D' U'",
    "L' U F2 L B2 D F U' R' B2 U B2 F L2 R2 B2 D2 F' L' D' U' R F D2 U",
    "R2 D B L2 B2 D' U L R2 B' F U L2 R' U2 F2 L B L' R' B R F2 L F2",
    "B L F2 D' U L' B R2 B' L2 R2 D F R F D2 F' R2 B2 F U2 F' R B' U2",
    "F2 R F' R2 D' U L' D2 R' B' D2 B D L2 D' F2 L' R D' L D U B' F R'",
    "L' U2 B F2 L F' R B2 L' D U L B' D' L B L2 R U' B L' U' B L' B",
    "L F R B2 U R F2 R B' F2 L' B2 F2 D' B F' U B L' R2 B2 D2 F' U L",
    "B' L R' D' L2 R2 D2 F U L' D' L B' F R D R2 B D2 U L D B U2 R",
    "D' R2 F D U2 R2 D U R2 F' D2 U2 B' D L2 D' R U L2 D' U F' L' R' U",
    "D' L' R D U2 L' B D' L F R2 D2 L2 D' U2 R2 U2 L' B2 F' L2 R' D2 L R'",
    "U' F2 U F D2 L2 B2 R B L2 B L R2 F' L R U2 B D' U' B2 R2 U2 F' R'",
    "B L2 D2 B' L R2 B2 F' R B L2 D' B2 L' D U' L2 U' B2 L' F2 D L2 D2 U2",
    "B D' R' B' F' L2 D' L F2 D B2 U' R B R U2 B2 F' D2 R' B L' D2 U L2",
    "L D2 B' F' D2 B' D2 R' D2 U' R B D B' L2 D L R' D' L2 B2 D2 U2 R U'",
    "B' U' L' R U L B D' U B2 D2 U' B2 U' R2 D L2 U2 L B' D U F R F2",
    "F' R U2 B U2 B2 F2 D2 U2 L2 R' D B' R U F2 R' D' U' B' D U' F2 D' U2",
    "B2 F R' D R B2 F' L R2 D U' L' U F' U B F L' U' R U' B2 U F2 L2",
    "L B D2 U' F' R2 F' L B2 F2 L2 B2 F' D U' R D F2 R' F' R B' F' D2 F'",
    "L2 D' L2 R2 B2 L F R' F2 R' D B2 R' D R2 D' R2 F2 D' R2 D2 B L R U2",
    "B F2 D' B' L2 B2 F2 R D R2 D2 L' R U' L' R2 U' L' U B U' L2 U2 L2 D2",
    "L2 F2 R F' R' B' R2 F' L2 D' U' F2 L2 D2 B2 F D B' L' D' L F' D R' B",
    "U' L R2 D' U2 B' F' U' R F' U' F' L2 D' U F D2 U L U' L R2 B F2 U'",
    "R' F' U2 B' F' U2 L D U2 R2 U2 R2 D F' L2 F L' R' U' F' L' B D2 U' F",
    "U2 R2 D' B2 F D' F2 L' D U B2 F2 D B' F2 R' B' U' F' R' B D2 U2 B U'",
    "D U' B' D2 F2 R B F' L R' B R B2 F2 R' U2 R D2 U2 L U2 F D' F' R2",
    "F2 D' F2 U' F' R B2 F L' R' D2 U L D R B' D2 U' R D U L R2 U B'",
    "L' D B' D' R2 B L R2 U' R2 D L2 F' U2 R D' L' R F U2 R2 U L' D' L'",
    "B' D2 U2 B D2 F R2 D2 L' B' D2 B' D' L2 B2 L' R B D F2 R' F2 D' U' R2",
    "B' R D U' B' F2 U' R' F' D' L R B' U F2 U2 F U' B R U B D' U F2",
    "D' R2 B2 L D' R F' L2 R' F U' R' D2 U2 B D2 L U R B' F D2 F' L2 R",
    "L' R2 F D R U' B' F2 D' U' B L' B' U2 F L2 R2 U' F2 D U B' F' R' D2",
    "D2 U2 B L U B2 F' L2 U L2 F2 D F2 R B' D2 U2 L2 R2 U' L2 B2 F D2 L",
    "L R2 F D B2 F L2 D B' F2 U' L D' L' R' U2 R2 D2 U2 L R' F' D2 R2 F'",
    "F D' B L2 U' F R U2 L2 R' F' L F2 U' L D2 B' L2 B2 F U R B2 R' U2",
    "D L B' D2 L B2 U' L R F' L R F2 U B' D' R' U' B2 L2 D' L D2 B L'",
    "F2 L' B L R' B' R F U B F2 R2 F U B D L' B2 D B' D L' R B2 L",
    "U' R' F' D' B' U' L' B2 F2 D' L2 R' F2 U2 L D L B' D' B L' R' F2 U' B'",
    "R' U2 L2 D2 U2 L' R' F D' U2 R D' U2 F' L D2 L' U' B' F' L' D F' L2 F'"
  ];
  // Affiche un mélange aléatoire au chargement de la page
  var scramble = possibleScramble[Math.floor(Math.random()*possibleScramble.length)];
  $('#scramble').html('<span class="py-2 px-2 border border-dark">' + scramble + '</span>');
  // Check si il y déjà des résolutions dans le local storage et les affiches dans la side barre
  var solveNumber;
  var indexHistory;
  if (localStorage.getItem('indexHistory1')){
    var lastKey = localStorage.getItem('indexLog');
    // Ajout des statistiques à la side barre
    $('#sideStatIndex').html(localStorage.getItem('indexLog'));
    $('#sideStatSingle').html(localStorage.getItem('singleLog').substring(1, localStorage.getItem('singleLog').length - 1));
    $('#sideStatAo5').html(localStorage.getItem('averageOf5Log').substring(1, localStorage.getItem('averageOf5Log').length - 1));
    $('#sideStatAo12').html(localStorage.getItem('averageOf12Log').substring(1, localStorage.getItem('averageOf12Log').length - 1));
    $('#sideStatAo50').html(localStorage.getItem('averageOf50Log').substring(1, localStorage.getItem('averageOf50Log').length - 1));
    // Ajoute les résolutions existantes
    for (solveNumber = 1; solveNumber <= localStorage.getItem(`indexLog`); solveNumber++){
      // alert(solveNumber);
      // Retire le message si il existe déjà des résolutions
      $('#noSolve').hide();
      var tr, _tr = '</tr>', tdSide, td1, td2, _td = '</td>';
      var singleHistory = localStorage.getItem(`singleHistory${solveNumber}`).substring(1, localStorage.getItem(`singleHistory${solveNumber}`).length - 1);
      var averageOf5History = localStorage.getItem(`averageOf5History${solveNumber}`).substring(1, localStorage.getItem(`averageOf5History${solveNumber}`).length - 1);
      var averageOf12History = localStorage.getItem(`averageOf12History${solveNumber}`).substring(1, localStorage.getItem(`averageOf12History${solveNumber}`).length - 1);

      tr = '<tr id="' + solveNumber + '">';
      tdSide = '<td class="py-1 px-2 border border-light border-left-0 border-right-0 border-top-0">';
      td1 = '<td class="py-1 px-2 border border-light border-top-0">';
      td2 = '<td class="py-1 px-2 border border-light border-left-0 border-top-0">';
      $('#solveList tbody').prepend(tr + '\n' + tdSide + '#' + solveNumber + _td + '\n' + td1 + singleHistory + _td + '\n' + td2 + averageOf5History + _td + '\n' + tdSide + averageOf12History + _td + _tr);
    }
  } else {
    alert('noIndexHistory');
  }

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
  // Indicateur que le timer est prêt
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
    // Stop button
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
      addToLog(hours, minutes, seconds, milliseconds);
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
  function unfoldTime(time){
    // Turn seconds into milliseconds
    time = (JSON.stringify(time).substring(3, time.length + 1).replace('.', ''));
    // Get rid of spaces
    time = time.replace(/ /g, '');
    // Get rid of first zero
    if (time.charAt(0) == '0'){
      time = time.replace('0', '');
    }
    // Check the length of the string to apply the right algorithm
    if (time.length > 4 && time.length < 9){
      time = time.split(':');
      // Multiply minutes into milliseconds
      time[0] = time[0] * 60000;
      // Add all milliseconds together
      time = time[0] + Number(time[1]);
      console.log(time);
      console.log(typeof time);
    } else if (time.length > 9){
      time = time.split(':');
      // Hours and Minutes into milliseconds
      time[0] = time[0] * 3600000;
      time[1] = time[1] * 60000;
      time = time[0] + time[1] + Number(time[2]);
    }
    solveInHistory = Number(time);
    return solveInHistory;
  }
  // Calcul de la moyenne des 5 dernières résolutions
  var solves5 = [], average5;
  function averageOf5(hours, minutes, seconds, milliseconds) {
    var average5Milli = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds + '';
    average5Milli = Number(average5Milli);
    solves5.splice(0, 0, average5Milli);
    // Actualise la dernière clef
    lastKey = Number(localStorage.getItem('indexLog'));
    // Check if there are already solves in history and put them in solves5 array
    if (lastKey < 5){
      average5 = '-';
    } else if (lastKey > 4){
      var solveInHistory = localStorage.getItem(`singleHistory${lastKey}`);
      solveInHistory = unfoldTime(solveInHistory);
      solves5.splice(0, 0, solveInHistory);
      for (var i = 0; i < 3; i++ ){
        lastKey--;
        solveInHistory = localStorage.getItem(`singleHistory${lastKey}`);
        solveInHistory = unfoldTime(solveInHistory);
        solves5.splice(0, 0, solveInHistory);
      }
      for (i = 0; i < 4; i++ ){
        average5Milli += solves5[i];
      }
      average5Milli = average5Milli / 5;
      solves5.splice(solves5.length - 1, 1);
      hours = Math.floor(average5Milli / 3600000);
      minutes = Math.floor( (average5Milli - (hours * 3600000)) / 60000 );
      seconds = Math.floor( (average5Milli - (hours * 3600000) - (minutes * 60000)) / 1000 );
      milliseconds = Math.floor(average5Milli - (hours * 3600000) - (minutes * 600000) - (seconds * 1000));
      average5 = hours + ': ' + minutes + ': ' + seconds + '.' + milliseconds;
      // Check si les heures sont nulles pour ne pas les afficher
      if (hours == 0){
        average5 = minutes + ': ' + seconds + '.' + milliseconds;
      }
      // Check si les heures et les minutes sont nulles pour ne pas les afficher
      if (hours == 0 && minutes == 0){
        average5 = seconds + '.' + milliseconds;
      }
    }
  }
  // Calcul de la moyenne des 12 dernières résolutions
  var solves12 = [], average12;
  function averageOf12(hours, minutes, seconds, milliseconds) {
    var average12Milli = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
    solves12.splice(0, 0, average12Milli);
    if ( solves12.length < 12){
      average12 = '-';
    } else {
      for (var i = 0; i < 11; i++ ){
        average12Milli += solves12[i];
      }
      average12Milli = average12Milli / 12;
      solves12.splice(solves12.length - 1, 1);
      hours = Math.floor(average12Milli / 3600000);
      minutes = Math.floor( (average12Milli - (hours * 3600000)) / 60000 );
      seconds = Math.floor( (average12Milli - (hours * 3600000) - (minutes * 60000)) / 1000 );
      milliseconds = Math.floor(average12Milli - (hours * 3600000) - (minutes * 600000) - (seconds * 1000));
      average12 = hours + ': ' + minutes + ': ' + seconds + '.' + milliseconds;
      // Check si les heures sont nulles pour ne pas les afficher
      if (hours == 0){
        average12 = minutes + ': ' + seconds + '.' + milliseconds;
      }
      // Check si les heures et les minutes sont nulles pour ne pas les afficher
      if (hours == 0 && minutes == 0){
        average12 = seconds + '.' + milliseconds;
      }
    }
  }
  // Calcul de la moyenne des 50 dernières résolutions
  var solves50 = [], average50;
  function averageOf50(hours, minutes, seconds, milliseconds) {
    var average50Milli = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
    solves50.splice(0, 0, average50Milli);
    if ( solves50.length < 50){
      average50 = '-';
    } else {
      for (var i = 0; i < 49; i++ ){
        average50Milli += solves50[i];
      }
      average50Milli = average50Milli / 50;
      solves50.splice(solves50.length - 1, 1);
      hours = Math.floor(average50Milli / 3600000);
      minutes = Math.floor( (average50Milli - (hours * 3600000)) / 60000 );
      seconds = Math.floor( (average50Milli - (hours * 3600000) - (minutes * 60000)) / 1000 );
      milliseconds = Math.floor(average50Milli - (hours * 3600000) - (minutes * 600000) - (seconds * 1000));
      average50 = hours + ': ' + minutes + ': ' + seconds + '.' + milliseconds;
      // Check si les heures sont nulles pour ne pas les afficher
      if (hours == 0){
        average50 = minutes + ': ' + seconds + '.' + milliseconds;
      }
      // Check si les heures et les minutes sont nulles pour ne pas les afficher
      if (hours == 0 && minutes == 0){
        average50 = seconds + '.' + milliseconds;
      }
    }
  }

  // Ajout de la résolution à la side barre
  function addToLog(hours, minutes, seconds, milliseconds){
    // Récupère l'indice de la dernière résolution ou lui attribut "1" si première résolution
    var solveIndex = Number($('#solveList tbody tr:first-child').attr('id'));
    if (isNaN(solveIndex)){
      solveIndex = 1;
    } else {
      solveIndex = solveIndex + 1;
    }
    // Check si les heures sont nulles pour ne pas les afficher
    var newTime = hours + ': ' + minutes + ': ' + seconds + '.' + milliseconds;
    if (hours == 0){
      newTime = minutes + ': ' + seconds + '.' + milliseconds;
    }
    // Check si les heures et les minutes sont nulles pour ne pas les afficher
    if (hours == 0 && minutes == 0){
      newTime = seconds + '.' + milliseconds;
    }
    // Calcul des moyennes
    averageOf5(hours, minutes, seconds, milliseconds);
    averageOf12(hours, minutes, seconds, milliseconds);
    averageOf50(hours, minutes, seconds, milliseconds);
    // Retire le message à la première résolution
    $('#noSolve').hide();
    // Création d'une nouvelle ligne pour ajouter les informations
    var tr, _tr = '</tr>', tdSide, td1, td2, _td = '</td>';
    tr = '<tr id="' + solveIndex + '">';
    tdSide = '<td class="py-1 px-2 border border-light border-left-0 border-right-0 border-top-0">';
    td1 = '<td class="py-1 px-2 border border-light border-top-0">';
    td2 = '<td class="py-1 px-2 border border-light border-left-0 border-top-0">';
    $('#solveList tbody').prepend(tr + '\n' + tdSide + '#' + solveIndex + _td + '\n' + td1 + newTime + _td + '\n' + td2 + average5 + _td + '\n' + tdSide + average12 + _td + _tr);
    // Ajout des informations aux statistiques de la side barre
    addToStats(solveIndex, newTime, average5, average12, average50);
  }


  // Ajout des informations aux statistiques de la side barre
  function addToStats(solveIndex, newTime, average5, average12, average50){
    $('#sideStatIndex').html(solveIndex);
    $('#sideStatSingle').html(newTime);
    $('#sideStatAo5').html(average5);
    $('#sideStatAo12').html(average12);
    $('#sideStatAo50').html(average50);
    // Ajout des statistiques aux locals storages
    if (typeof(Storage) !== "undefined") {
      // Retire la dernière résolution du local storage
      localStorage.removeItem('indexLog');
      localStorage.removeItem('singleLog');
      localStorage.removeItem('averageOf5Log');
      localStorage.removeItem('averageOf12Log');
      localStorage.removeItem('averageOf50Log');
      // Ajoute la résolution au local storage
      localStorage.setItem('indexLog', JSON.stringify(solveIndex));
      localStorage.setItem('singleLog', JSON.stringify(newTime));
      localStorage.setItem('averageOf5Log', JSON.stringify(average5));
      localStorage.setItem('averageOf12Log', JSON.stringify(average12));
      localStorage.setItem('averageOf50Log', JSON.stringify(average50));
      indexHistory = localStorage.getItem('indexLog');
      // Ajoute la résolution au local storage history
      localStorage.setItem(`indexHistory${indexHistory}`, JSON.stringify(solveIndex));
      localStorage.setItem(`singleHistory${indexHistory}`, JSON.stringify(newTime));
      localStorage.setItem(`averageOf5History${indexHistory}`, JSON.stringify(average5));
      localStorage.setItem(`averageOf12History${indexHistory}`, JSON.stringify(average12));
      localStorage.setItem(`averageOf50History${indexHistory}`, JSON.stringify(average50));

      // alert(localStorage.key(indexHistory));
    } else {
      // Alerte si le navigateur ne supporte pas le local storage
      alert('Désolé, notre navigateur ne supporte pas le local storage');
    }
  }
  // Nettoyage du local storage si besoin
  $('#scramble').click(function failSafe(){
    var code = prompt('Secret Password :');
    if (code == 'reset'){
      localStorage.clear();
    }
  });
});
