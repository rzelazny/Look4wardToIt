//variables for team and their id
var userTeam = "Buffalo Bills";
var teamID = ""

//ajax call to find the team id and to search for upcoming events
$.ajax({
    type:"GET",
    url: "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + userTeam,    
}).then(function(data){
    teamID= data.teams[0].idTeam
    console.log(data.teams[0].idTeam);
    $.ajax({
        type:"GET",
        url: "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + teamID,
    }).then(function(teamData){
        console.log(teamData);
    })
})

// variables for the time and release dates
var today = new Date();
var releaseDate = new Date();

//ajax call for Upcoming Movies and weeding out movies that already released
$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/movie/upcoming?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
    dataType: "JSON",
}).then(function (data) {
    for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].original_title);
        // console.log(releaseDate.getTime());
        // console.log(data.results[i].release_date);
        // console.log(today.getTime());
        if (Date.parse(data.results[i].release_date) <= Date.parse(today)) {
            // console.log("dont show title")
        }
        else {
            // console.log("show title")
        }
    }
})

//ajax call for movies that are now playing
$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
    dataType: "JSON",
}).then(function (data) {
    for (let i = 0; i < data.results.length; i++) {
        // console.log(data.results[i].original_title);
    }
})

//ajax call for finding similar movies based on genre and keywords
var userMovie = "Fight Club";
var movieId = "";

$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/search/movie?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&query=" + userMovie + "&page=1&include_adult=false",
    dataType: "JSON",
}).then(function (data) {
    movieId = data.results[0].id
    console.log(data.results[0].id)
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
        dataType: "JSON",
    }).then(function (dataMovie) {
        console.log(dataMovie);
    })
})

//looking up a genre list
$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US",
    dataType: "JSON",
}).then(function(data){
    console.log(data)
})


//fandango API
$.ajax({
    type: "GET",
    url: "http://api.fandango.com/v1/?op=performancesbymoviepostalcodesearch&movieid=151500&postalcode=08816&apikey=wtf2a3w28686grrnqx2myk7u&sig=0d637ad758f518ec99bf148e1ee9d9b01a21590a86526a18e8bdfaeacf2b13af",
    dataType: "JSON",
}).then(function(data) {
    console.log(data);
})