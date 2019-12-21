$(function(){
  var lastIndex, lastSolve, lastAo5, lastAo12, lastAo50;
  // Check for solves in the local storage on load
  if (localStorage.getItem('indexLog')){
    // Get values from the local storage ( typeof = number )
    lastIndex = Number(JSON.parse(localStorage.getItem('indexLog')));
    lastSolve = Number(JSON.parse(localStorage.getItem('singleLog')));
    lastAo5 = Number(JSON.parse(localStorage.getItem('averageOf5Log')));
    lastAo12 = Number(JSON.parse(localStorage.getItem('averageOf12Log')));
    lastAo50 = Number(JSON.parse(localStorage.getItem('averageOf50Log')));
    // Check if averages are empty
    isNaN(lastAo5) ? lastAo5 = '-': lastAo5;
    isNaN(lastAo12) ? lastAo12 = '-': lastAo12;
    isNaN(lastAo50) ? lastAo50 = '-': lastAo50;
    // Last solves in stats
    $('#lastSingle').text(lastSolve);
    $('#lastAo5').text(lastAo5);
    $('#lastAo12').text(lastAo12);
    $('#lastAo50').text(lastAo50);
    // Delete "no solve" message
    $('#noSolve').hide();
    // Add solves in localStorage to history
    for (var numberOfSolve = lastIndex; numberOfSolve > 0; numberOfSolve-- ){
      var index = Number(JSON.parse(localStorage.getItem(`indexHistory${numberOfSolve}`)));
      var single = Number(JSON.parse(localStorage.getItem(`singleHistory${numberOfSolve}`)));
      var ao5 = Number(JSON.parse(localStorage.getItem(`averageOf5History${numberOfSolve}`)));
      var ao12 = Number(JSON.parse(localStorage.getItem(`averageOf12History${numberOfSolve}`)));
      var ao50 = Number(JSON.parse(localStorage.getItem(`averageOf50History${numberOfSolve}`)));
      // Check if averages are empty
      isNaN(ao5) ? ao5 = '-': ao5;
      isNaN(ao12) ? ao12 = '-': ao12;
      isNaN(ao50) ? ao50 = '-': ao50;
      var tr = '<tr id="' + index + '">', _tr = '</tr>', td  = '<td class="py-2">', _td = '</td>';
      $('#history tbody').append(tr + '\n' + td + '#' + index + _td + '\n' + td + single + _td + '\n' + td + ao5 + _td + '\n' + td + ao12 + _td + '\n' + td + ao50 + _td + _tr);
    }
  }
  // Graph
  var dataTestX = new Date(2019, 11, 14);
  var dataTestY = 12.563;
  // Chart
  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title:{
      text: 'Meilleur de la semaine'
    },
    axisY :{
      includeZero: false,
      suffix: ' s'
    },
    toolTip: {
      shared: true
    },
    legend: {
      fontSize: 13
    },
    data: [{
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 50',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 20.428 },
        { x: new Date(2019, 11, 15), y: 20.894 },
        { x: new Date(2019, 11, 16), y: 21.208 },
        { x: new Date(2019, 11, 17), y: 22.410 },
        { x: new Date(2019, 11, 18), y: 21.607 },
        { x: new Date(2019, 11, 19), y: 21.743 },
        { x: new Date(2019, 11, 20), y: 20.842 },
        { x: new Date(2019, 11, 21), y: 21.947 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 12',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 17.842 },
        { x: new Date(2019, 11, 15), y: 18.977 },
        { x: new Date(2019, 11, 16), y: 18.458 },
        { x: new Date(2019, 11, 17), y: 19.374 },
        { x: new Date(2019, 11, 18), y: 17.684 },
        { x: new Date(2019, 11, 19), y: 18.085 },
        { x: new Date(2019, 11, 20), y: 19.322 },
        { x: new Date(2019, 11, 21), y: 18.402 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 5',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 15.745 },
        { x: new Date(2019, 11, 15), y: 15.943 },
        { x: new Date(2019, 11, 16), y: 16.843 },
        { x: new Date(2019, 11, 17), y: 15.487 },
        { x: new Date(2019, 11, 18), y: 16.345 },
        { x: new Date(2019, 11, 19), y: 17.931 },
        { x: new Date(2019, 11, 20), y: 17.836 },
        { x: new Date(2019, 11, 21), y: 16.425 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Single',
      dataPoints: [
        { x: dataTestX, y: dataTestY },
        { x: new Date(2019, 11, 15), y: 12.758 },
        { x: new Date(2019, 11, 16), y: 11.532 },
        { x: new Date(2019, 11, 17), y: 12.785 },
        { x: new Date(2019, 11, 18), y: 10.201 },
        { x: new Date(2019, 11, 19), y: 11.785 },
        { x: new Date(2019, 11, 20), y: 12.637 },
        { x: new Date(2019, 11, 21), y: 9.123 }
      ]
    }]
  }); chart.render();
});
