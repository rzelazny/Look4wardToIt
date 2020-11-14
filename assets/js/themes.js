///////////////////////DARK MODE///////////////////////////////
function darkMode() {
    var element = document.body;
    element.classList.add("dark-mode");
    element.classList.remove("rm-mode");
}
$("#nasa").on("click", darkMode);

///////////////////Default///////////////////////////////////

function defaultMode() {
    var element = document.body;
    element.classList.remove("dark-mode");
    element.classList.remove("rm-mode");
}

$("#default").on("click", defaultMode);

///////////////////RM///////////////////////////////////

function rmMode() {
    var element = document.body;
    element.classList.add("rm-mode");
    element.classList.remove("dark-mode");
}

$("#rm").on("click", rmMode);

//on load set theme to saved user preference///////////////////////////
$(document).ready(function(){
    if(userPreferences.theme === "NASA"){
        darkMode();
    }
    else if(userPreferences.theme === "Default"){
        defaultMode();
    }
    else if(userPreferences.theme === "Rick & Morty"){
        rmMode();
    } 
})