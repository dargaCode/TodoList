var ENTER_KEY_ID = 13;

var itemInput = $("#text-input");
var list = $("#todo-items");
var items = $("#todo-items li");
var deleteButtons = $("#todo-items span");

items.on("click", function() {
  $(this).toggleClass("completed");
});

deleteButtons.on("click", function(event) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  event.stopPropagation();
});

itemInput.on("keypress", function(keyEvent) {
  var itemText = $(this).val();
  if(keyEvent.which === ENTER_KEY_ID && itemText !== "") {
    list.append("<li><span>X </span>" + itemText + "<li>");
    $(this).val("");
  }
});
