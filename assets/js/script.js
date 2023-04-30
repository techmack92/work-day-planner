// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var timeBlockEl = document.querySelectorAll(".time-block");
  var currentHour = dayjs().hour();
  var saveBtns = document.querySelectorAll(".saveBtn");
  
  saveBtns.forEach(function(saveBtn) {
    saveBtn.addEventListener("click", function() {
      var description = this.parentNode.querySelector(".description").value;
      var timeBlockEl = this.parentNode.id;
      window.localStorage.setItem(timeBlockEl, JSON.stringify(description));
    });
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function hourTracker() {
    timeBlockEl.forEach(function(timeBlock) {
      // Retrieves all time block elements, splits the id value (ex: "hour9") into an array using "hour" as a separator 
      // & returns the hour (ex: "9") of the time block which is the second element in the array (index 1)
      var scheduleHour = parseInt(timeBlock.id.split("hour")[1]);   
      if(scheduleHour < currentHour) {
        timeBlock.classList.add("past");
      }
      else if(scheduleHour == currentHour) {
        timeBlock.classList.add("present");
      }
      else {
        timeBlock.classList.add("future")
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  timeBlockEl.forEach(function(timeBlock){
    var timeBlockId = timeBlock.id;
    var savedDescription = JSON.parse(window.localStorage.getItem(timeBlockId));
    timeBlock.querySelector(".description").value = savedDescription;
  })
  
  // TODO: Add code to display the current date in the header of the page. 
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  var header = document.querySelector("header");
  var currentDateEl = document.getElementById("currentDay");
  currentDateEl.innerText = currentDate;
  header.appendChild(currentDateEl);

  hourTracker();
});


