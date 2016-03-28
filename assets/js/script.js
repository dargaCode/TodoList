// CONSTANTS

var ENTER_KEY_ID = 13;
var SUBMIT_ICON_EDIT = "fa-keyboard-o";
var SUBMIT_ICON_CREATE = "fa-plus";

// VARIABLES

var editToggle = $("#edit-toggle-span");
var editControls = $(".edit");
var editSubmit = $("#edit-submit-span")
var itemInput = $("#create");
var taskList = $("#tasks");

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
    itemInput.val("");
    icon.toggleClass("fa-edit");
    icon.toggleClass("fa-times");
    editControls.fadeToggle(500);
  });
}

function addEditSubmitEvent() {
  editSubmit.on("click", function() {
    var itemText = itemInput.val();
    if (isInputReadyToSubmit()) {
      submitNewTask(itemText);
    }
    itemInput.focus();
    updateSubmitSpanIcon();
  });
}

function addItemCreateEvent() {
  itemInput.on("keyup", function(keyEvent) {
    var itemText = $(this).val();
    if(keyEvent.which === ENTER_KEY_ID && itemText !== "") {
      submitNewTask(itemText);
    }
    updateSubmitSpanIcon();
  });
}

function addItemToggleCompletedEvent() {
  taskList.on("click", "li", function() {
    $(this).toggleClass("completed");
  });
}

function addItemDestroyEvent() {
  taskList.on("click", "li span", function(event) {
    $(this).parent().fadeOut(500, function() {
      $(this).remove();
    });
    event.stopPropagation();
  });
}

// HELPER FUNCTIONS

function isInputReadyToSubmit() {
  var text = itemInput.val();
  return text !== "";
}

function updateSubmitSpanIcon() {
  var itemText = itemInput.val();
  if (isInputReadyToSubmit()) {
    switchSubmitIconToCreate();
  }
  else {
    switchSubmitIconToEdit();
  }
}

function switchSubmitIconToEdit() {
  var icon = editSubmit.children("i");
  icon.removeClass("fa-plus");
  icon.addClass("fa-keyboard-o");
}

function switchSubmitIconToCreate() {
  var icon = editSubmit.children("i");
  icon.removeClass("fa-keyboard-o");
  icon.addClass("fa-plus");
}

function submitNewTask(text) {
  createListItem(text);
  itemInput.val("");
}

function createListItem(text) {
  var listItem = $("<li><span><i class='fa fa-trash'></i></span> " + text + "</li>");
  listItem.hide();
  taskList.append(listItem);
  listItem.fadeIn(500);
}

// MAIN

addEvents();
updateSubmitSpanIcon();
