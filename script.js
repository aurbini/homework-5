$(document).ready(function(){
  //declare global variables 
  var m = moment()
  
  var currentDate = m.format('MMM Do YYYY')
  // ("dddd MMM Mo YYYY");
  console.log(m); 
  var wrapper = $('#wrapper'); 
  var date = $('#date').text(currentDate);
  console.log(date); 
  var savedEvent; 
  var savedEventTime; 
  var wrapper = $('#wrapper'); 
  var eventsArray = []; 
  var eventsObj = {
    time : '' , 
    event : ''
  }
//Add color functionality 
  var now = moment(); 
  var currentHour = now.format("HH");
  function timeComparision(){ 
  var toStringIndex; 
  console.log(currentHour); 
    for(var i = 9; i < 18; i++){  
      toStringIndex = i.toString(); 
      if(parseInt(currentHour) === i){
      $(`#${toStringIndex}`).css('background-color', 'green')
      }else if(parseInt(currentHour) > i){
        $(`#${toStringIndex}`).css('background-color', 'grey')
      }
     }
  }
//Render the display 
  function renderEvents (savedEventTime,savedEvent){
    wrapper.empty();
    for(var i = 0; i < 9; i++){
      var index = i+9; 
      var timedEvents = eventsArray;
      var container = $('<div>').addClass('container');
      var div = $('<div>').addClass('form'); 
      var militaryTime = $('<p>').addClass('time');
      var input = $('<input>').addClass('events'); 
      var saveButton = $('<button>').addClass('save'); 
      militaryTime.text(i +9); 
      input.attr('id', i +9);
      input.val(timedEvents.event); 
      saveButton.text("save")
      div.append(militaryTime).append(input).append(saveButton); 
      container.append(div); 
      wrapper.append(container);
      for(var j = 0; j < eventsArray.length; j++){
          if(eventsArray[j].time === input.attr('id')){
            $(`#${index}`).val(eventsArray[j].event);
          }
      } 
     }
    //Call the time comparision once the display is up 
    timeComparision(); 
  }
//Save the data to local storage 
  function storeEvents(savedEvents){
    window.localStorage.setItem("savedEventsArray", JSON.stringify(eventsArray)); 
  }
//initiate the calender and get the the data that is stored in LS if there is any 
  function init(){
    var savedEvents = JSON.parse(localStorage.getItem("savedEventsArray"));
    if(savedEvents !== null){
      eventsArray = savedEvents; 
    }
    renderEvents(); 
  }
  init(); 
//add the data in the input field when clicked to the array 
//call store function to store updated data
//call render function to display updated data
  $('.save').click(function(event){
    savedEvent = $(this).siblings('input').val().trim();
    savedEventTime = $(this).siblings('p').text();
    eventsObj.time = savedEventTime;
    eventsObj.event = savedEvent;
    eventsArray.push(eventsObj); 
    storeEvents(); 
    renderEvents(); 
  });
})