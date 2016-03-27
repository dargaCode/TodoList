// CONSTANTS

var ENTER_KEY_ID = 13;

// VARIABLES

var editToggle = $("#edit-toggle");
var itemInput = $("#create");
var list = $("#tasks");

// EVENTS

function addEvents() {
  addItemCreateEvent();
  addItemToggleCompletedEvent();
  addItemDestroyEvent();
}

function addEditToggleEvent() {
  editToggle.on("click", function() {
    alert("edit toggle clicked!");
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
