///////////////////////DARK MODE///////////////////////////////
function darkMode() {
    var element = document.body;
    element.classList.add("dark-mode");
}
$("#nasa").on("click", darkMode);

///////////////////Default///////////////////////////////////

function defaultMode() {
    var element = document.body;
    element.classList.remove("dark-mode");
}

$("#default").on("click", defaultMode);