var saveQuoteBtn = document.querySelector("#save-quotes-button")

// Kanye Quote //

var kanyeRadio = document.querySelector("#kanyeQuote");
function displayKanye() {
    var kanyeURL = "https://api.kanye.rest"
    $.ajax({
        url: kanyeURL,
        method: "GET"
    }).then(function(data){
        console.log("i see kanye");
        $("#dailyQuote").text('"' + data.quote + '" - Kanye West');
    })
}

// to use later to change the quote on the click of next/previous buttons//
// var previousDateButton = document.querySelector("#previousDate");
// var nextDateButton = document.querySelector("#nextDate");
// function refreshKanye() {
//     console.log("i see this attempt")
//     $("#dailyQuote").text = "";
//     // displayKanye();
// }
// previousDateButton.addEventListener("click", refreshKanye());
// nextDateButton.addEventListener("click", refreshKanye()); 


// Dad Joke //

var dadJokeRadio = document.querySelector("#dadJoke");
function displayDadJoke() {
    var dadJokeURL = "https://icanhazdadjoke.com/"
    $.ajax({
        url: dadJokeURL,
        method: "GET",
        dataType: "JSON",
    }).then(function(data){
        // console.log("dad" + data.joke);
        $("#dailyQuote").text(`"${data.joke}" - Dads of the world`);
    })
}

// Famous Quote //

var randoRadio = document.querySelector("#randoQuote");
function displayRandoQuote() {
    var randoQuoteURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random"
    $.ajax({
        url: randoQuoteURL,
        method: "GET"
    }).then(function(data){
        console.log(data.quote);
        $("#dailyQuote").text(`"${data.quote.quoteText}" -${data.quote.quoteAuthor}`);
    })
}


// if statements to display quote //

if (kanyeRadio === true) {
    saveQuoteBtn.addEventListener("click", displayKanye());
}
else if (dadJokeRadio === true) {
    saveQuoteBtn.addEventListener("click", displayDadJoke());
}
else if (randoRadio === true) {
    saveQuoteBtn.addEventListener("click", displayRandoQuote());
}
