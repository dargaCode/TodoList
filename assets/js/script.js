// CONSTANTS

var ENTER_KEY_ID = 13;
var SUBMIT_ICON_EDIT = "fa-keyboard-o";
var SUBMIT_ICON_CREATE = "fa-plus";

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
    var itemText = itemInput.val();
    if (itemText === "") {
      itemInput.focus();
    }
    else {
      submitNewTask(itemText);
    }
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

function updateSubmitSpanIcon() {
  var itemText = itemInput.val();
  if (itemText === "") {
    switchSubmitIconToEdit();
  }
  else {
    switchSubmitIconToCreate();
  }
}

function switchSubmitIconToEdit() {
  editSubmit.children("i").removeClass("fa-plus");
  editSubmit.children("i").addClass("fa-keyboard-o");
}

function switchSubmitIconToCreate() {
  editSubmit.children("i").removeClass("fa-keyboard-o");
  editSubmit.children("i").addClass("fa-plus");
}

function submitNewTask(text) {
  createListItem(text);
  itemInput.val("");
}

function createListItem(text) {
  var listItem = $("<li><span><i class='fa fa-trash'></i></span> " + text + "</li>");
  listItem.hide();
  list.append(listItem);
  listItem.fadeIn(500);
}

// MAIN

addEvents();
