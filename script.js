// console.log(moment().format());
$(document).ready(function(){
  var m = moment()
  var currentDate = m.format("dddd MMM Mo YYYY");
  var wrapper = $('#wrapper'); 
  var date = $('#date').text(currentDate);

  var savedEvent; 
  var savedEventTime; 
  // console.log(currentDate); 

   var wrapper = $('#wrapper'); 

  var eventsArray = []; 
  var eventsObj = {
    time : '' , 
    event : ''
  }


  var now = moment(); 
  var currentHour = now.format("HH");
  function timeComparision(){ 
  //console.log(currentHour); 
  var toStringIndex; 
    for(var i = 9; i < 15; i++){  
      toStringIndex = i.toString(); 
      //console.log(toStringIndex); 
      if(parseInt(currentHour) === i){
      $(`#${toStringIndex}`).css('background-color', 'green')
      }else if(parseInt(currentHour) > i){
        $(`#${toStringIndex}`).css('background-color', 'grey')

      }
     }
  }

  function renderEvents (savedEventTime,savedEvent){
    wrapper.empty();

    // console.log(eventsArray); 

    for(var i = 0; i < 9; i++){
      var index = i+9; 
      var timedEvents = eventsArray;
      var container = $('<div>').addClass('container');
      var div = $('<div>').addClass('form'); 
      var militaryTime = $('<p>').addClass('time');
      var input = $('<input>').addClass('events'); 
      var saveButton = $('<button>').addClass('save'); 
      // saveButton.attr('type', 'submit'); 
      militaryTime.text(i +9); 
      //militaryTime.attr('id', i +9);
      input.attr('id', i +9);
      //console.log(input.attr('id'));
     
      //console.log('event there')
        //console.log(timedEvents.event); 
        input.val(timedEvents.event); 
      saveButton.text("save")
      div.append(militaryTime).append(input).append(saveButton); 
      container.append(div); 
      wrapper.append(container);
      for(var j = 0; j < eventsArray.length; j++){
          if(eventsArray[j].time === input.attr('id')){
            $(`#${index}`).val(eventsArray[j].event);
            //console.log($(`#${index}`))

          }
      } 
     }
    //console.log($("#9").text())

    timeComparision(); 
  }

  function storeEvents(savedEvents){
    window.localStorage.setItem("savedEventsArray", JSON.stringify(eventsArray)); 
  }

  function init(){
    var savedEvents = JSON.parse(localStorage.getItem("savedEventsArray"));
    if(savedEvents !== null){
      eventsArray = savedEvents; 
    }
    //console.log(eventsArray[0]); 
    renderEvents(); 
  }
  init(); 

  $('.save').click(function(event){
    savedEvent = $(this).siblings('input').val().trim();
    savedEventTime = $(this).siblings('p').text();
    eventsObj.time = savedEventTime;
    eventsObj.event = savedEvent;
    eventsArray.push(eventsObj); 
    //console.log(eventsArray);
    storeEvents(); 
    renderEvents(); 
  });
})