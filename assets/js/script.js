// CONSTANTS

var ENTER_KEY_ID = 13;

// VARIABLES

var editToggle = $("#edit-toggle");
var editControls = $(".edit");
var editSubmit = $("#edit-submit-span")
var itemInput = $("#create");
var list = $("#tasks");

// EVENTS

function addEvents() {
  addEditToggleEvent();
  addEditSubmitEvent();
  addItemCreateEvent();
  addItemToggleCompletedEvent();
  addItemDestroyEvent();
}

function addEditToggleEvent() {
  editToggle.on("click", function() {
    var icon = $(this).children("i");
    icon.toggleClass("fa-edit");
    icon.toggleClass("fa-times");
    editControls.fadeToggle(500);
  });
}

function addEditSubmitEvent() {
  editSubmit.on("click", function() {
    alert("clicked submit span");
  });
}

function addItemCreateEvent() {
  itemInput.on("keypress", function(keyEvent) {
    var itemText = $(this).val();
    if(keyEvent.which === ENTER_KEY_ID && itemText !== "") {
      createListItem(itemText);
      $(this).val("");
    }
  });
}

function addItemToggleCompletedEvent() {
  list.on("click", "li", function() {
    $(this).toggleClass("completed");
  });
}

function addItemDestroyEvent() {
  list.on("click", "li span", function(event) {
    $(this).parent().fadeOut(500, function() {
      $(this).remove();
    });
    event.stopPropagation();
  });
}

// HELPER FUNCTIONS

function createListItem(text) {
  var listItem = $("<li><span><i class='fa fa-trash'></i></span> " + text + "</li>");
  listItem.hide();
  list.append(listItem);
  listItem.fadeIn(500);
}

// MAIN

addEvents();
