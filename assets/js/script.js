// CONSTANTS

var ENTER_KEY_ID = 13;
var SUBMIT_ICON_EDIT = "fa-keyboard-o";
var SUBMIT_ICON_CREATE = "fa-plus";
var TASK_PREFIX = '<span><i class="fa fa-trash"></i></span>';
var FADE_DURATION = 500;

var DEFAULT_TASKS = [
  'Click <i class="fa fa-edit help-icon"></i> to toggle create mode',
  'Press Enter or click <i class="fa fa-plus help-icon"></i> to submit a task',
  'Click a task to toggle completion',
  'Hover a task and click <i class="fa fa-trash help-icon"></i> to delete'
];

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
    itemInput.val("");
    updateSubmitSpanIcon();
    swapEditToggleIcons();
    editControls.fadeToggle(FADE_DURATION);
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
    $(this).parent().fadeOut(FADE_DURATION, function() {
      $(this).remove();
    });
    event.stopPropagation();
  });
}

// HELPER FUNCTIONS

function swapEditToggleIcons() {
    var icon = editToggle.children("i");
    icon.toggleClass("fa-edit");
    icon.toggleClass("fa-times");
}

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
  var taskString = generateTaskString(text);
  appendTaskElement(taskString);
  itemInput.val("");
}

function generateTaskString(textContent) {
  return "<li>" + TASK_PREFIX + textContent + "</li>";
}

function appendTaskElement(taskHTML) {
  var taskElement = $(taskHTML);
  taskElement.hide();
  taskElement.addClass("new");
  taskList.append(taskElement);
  taskElement.fadeIn(FADE_DURATION, function() {
    taskElement.removeClass("new");
  });
}

// MAIN

addEvents();
