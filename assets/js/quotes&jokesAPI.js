var saveQuoteBtn = document.querySelector("#save-quotes-button")
var previousDateButton = document.querySelector("#previousDate");
var nextDateButton = document.querySelector("#nextDate");
var todaysDateBtn = document.querySelector("#todaysDate");

// Rick & Morty Quote //

var rmRadio = document.querySelector("#rmQuote");

function displayRM() {
    var rmURL = "http://cors-anywhere.herokuapp.com/http://loremricksum.com/api/?paragraphs=1"
    $.ajax({
        url: rmURL,
        method: "GET",
        dataType: "JSON",
    }).then(function(data){
        console.log(data.data);
        $("#dailyQuote").text('"' + data.data + '" - Rick & Morty');
        previousDateButton.addEventListener("click", refreshRM);
        nextDateButton.addEventListener("click", refreshRM); 
        todaysDateBtn.addEventListener("click", refreshRM); 
    })
    //can we get this quote to store in local storage for this day?//
}

function refreshRM() {
    $("#dailyQuote").text = "";
    displayRM();
}

// Kanye Quote //

var kanyeRadio = document.querySelector("#kanyeQuote");

function displayKanye() {
    var kanyeURL = "https://api.kanye.rest"
    $.ajax({
        url: kanyeURL,
        method: "GET",
    }).then(function(data){
        $("#dailyQuote").text('"' + data.quote + '" - Kanye West');
        previousDateButton.addEventListener("click", refreshKanye);
        nextDateButton.addEventListener("click", refreshKanye); 
        todaysDateBtn.addEventListener("click", refreshKanye); 
    })
    //can we get this quote to store in local storage for this day?//
}

function refreshKanye() {
    $("#dailyQuote").text = "";
    displayKanye();
}

// Dad Joke //

var dadJokeRadio = document.querySelector("#dadJoke");
function displayDadJoke() {
    $("#dailyQuote").text = "";
    var dadJokeURL = "https://icanhazdadjoke.com/"
    $.ajax({
        url: dadJokeURL,
        method: "GET",
        dataType: "JSON",
    }).then(function(data){
        $("#dailyQuote").text(`"${data.joke}" - Dads of the world`);
        previousDateButton.addEventListener("click", refreshDad);
        nextDateButton.addEventListener("click", refreshDad); 
        todaysDateBtn.addEventListener("click", refreshDad); 
    })

}

function refreshDad() {
    $("#dailyQuote").text = "";
    displayDadJoke();
}

// Famous Quote //

var randoRadio = document.querySelector("#randoQuote");
function displayRandoQuote() {
    $("#dailyQuote").text = "";
    var randoQuoteURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random"
    $.ajax({
        url: randoQuoteURL,
        method: "GET"
    }).then(function(data){
        $("#dailyQuote").text(`"${data.quote.quoteText}" -${data.quote.quoteAuthor}`);
        previousDateButton.addEventListener("click", refreshRando);
        nextDateButton.addEventListener("click", refreshRando); 
        todaysDateBtn.addEventListener("click", refreshRando);
    })
}

function refreshRando() {
    $("#dailyQuote").text = "";
    displayRandoQuote();
}

///////////////////////////////////////////////////////////////////
// statements to display quotes //////////////////////////////////
///////////////////////////////////////////////////////////////////

kanyeRadio.addEventListener("click", displayKanye);
dadJokeRadio.addEventListener("click", displayDadJoke);
randoRadio.addEventListener("click", displayRandoQuote);
rmRadio.addEventListener("click", displayRM);

//on load set quote to saved user preference
$(document).ready(function(){
    if (userPreferences.quote === "Rick & Morty Quote"){
        displayRM();
    }
    else if(userPreferences.quote === "Kanye Quote"){
        displayKanye();
    }
    else if(userPreferences.quote === "Dad Joke"){
        displayDadJoke();
    }
    else if(userPreferences.quote === "Random Quote"){
        displayRandoQuote();
    }
})