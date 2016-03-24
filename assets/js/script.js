var itemInput = $("#text-input");
var list = $("#todo-items");
var items = $("#todo-items li");
var deleteButtons = $("#todo-items span");

items.on("click", function() {
  $(this).toggleClass("completed");
});

deleteButtons.on("click", function() {
  $(this).parent().fadeOut(function() {
    $(this).remove();
  });
});
