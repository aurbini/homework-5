// console.log(moment().format());
$(document).ready(function(){
  var wrapper = $('#wrapper'); 

  var eventsArray = []; 
  var eventsObj = {
    time : '' , 
    event : ''
  }

function renderEvents (){
  wrapper.empty();

  for(var i = 0; i < 9; i++){
    var timedEvents = eventsArray[i];
    //console.log(timedEvents); 
    var container = $('<div>').addClass('container');
    var form = $('<form>').addClass('form'); 
    var time = $('<p>').addClass('time');
    var input = $('<input>').addClass('events'); 
    var saveButton = $('<button>').addClass('save'); 
    saveButton.attr('type', 'submit'); 
    time.text(i +9); 
    if(timedEvents !== undefined){
      console.log('event there')
      console.log(timedEvents.event); 
      input.val(timedEvents.event);} 
    saveButton.text("save")
   form.append(time).append(input).append(saveButton); 
   container.append(form); 
   wrapper.append(container); 
  }
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
    event.preventDefault(); 
    var savedEvent = $(this).siblings('input').val().trim();
    var savedEventTime = $(this).siblings('p').text();
    eventsObj.time = savedEventTime;
    eventsObj.event = savedEvent;
    eventsArray.push(eventsObj); 
    //console.log(eventsArray); 
    storeEvents(); 
    renderEvents(); 
  })
  var currentTime = moment(); 
  console.log("current time " + moment(currentTime).format("hh:mm"));
  
})
