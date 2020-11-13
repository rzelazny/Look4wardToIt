//function adds events to the calendar based on the user's favorite team
function addFavoriteSportTeamEvents(userTeam){
    
    //clear out response panel
    $("#teamsFeedback").empty();

    //ajax call takes userTeam string and returns the teamID
    $.ajax({
        type:"GET",
        url: "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + userTeam,
        success: function(data){
            //if no results stop
            if(data.teams === null){
                var listEle = $("<p>");
                listEle.text("No team match found");
                $("#teamsFeedback").append(listEle);
                $("#teamsFeedback").attr("style", "display=block");
                return;
            }
            //if there are multiple possible teams returned give user suggestions
            if(data.teams.length > 1){
                $("#teamsFeedback").attr("style", "display=block");
    
                var listHeader = $("<h4>");
                listHeader.text("Did you mean one of these teams?");
                $("#teamsFeedback").append(listHeader);
    
                for (i=0; i < data.teams.length; i++){
                    var listEle = $("<ol>");
                    listEle.text(data.teams[i].strTeam)
                    $("#teamsFeedback").append(listEle);
                }
            }
            else{ 
                //when there's only 1 team, find upcoming events for the given team
                $.ajax({
                    type:"GET",
                    url: "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + data.teams[0].idTeam,
                }).then(function(teamData){
                    //if no results stop
                    if(teamData.events === null){
                    var listEle = $("<p>");
                        listEle.text("No upcoming games for " + data.teams[0].strTeam);
                        $("#teamsFeedback").append(listEle);
                        $("#teamsFeedback").attr("style", "display=block");
                        return;
                    }
                    //create events for upcoming games
                    for(var i=0; i < teamData.events.length; i++){
                        storeInput ("system", "", teamData.events[i].strEventAlternate, moment(teamData.events[i].dateEvent).format("DD-MM-YYYY"));
                    }
                    var listEle = $("<p>");
                    listEle.text("Upcoming games added to your calendar");
                    $("#teamsFeedback").append(listEle);
                    $("#teamsFeedback").attr("style", "display=block");
                })
            }
        }
        })    
    }

//WIP function adds Upcoming Movie release dates, weeding out movies that already released
function addUpcomingMovies(){
    // variables
    var today = new Date();

    //ajax call for Upcoming Movies
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
        dataType: "JSON",
    }).then(function (data) {
        console.log(data);
        //weeding out movies that already released
        for (let i = 0; i < data.results.length; i++) {

            if (Date.parse(data.results[i].release_date) >= Date.parse(today)) {
                storeInput ("system", "", "Movie Release: " + data.results[i].original_title, moment(data.results[i].release_date).format("DD-MM-YYYY"));
            }
        }
    })
}

//WIP function adds now playing movies to events
function addNowPlayingMovies(){
    //ajax call for movies that are now playing
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
        dataType: "JSON",
    }).then(function (data) {
        for (let i = 0; i < data.results.length; i++) {
            //storeInput ("system", "", "Movie Showing: " + data.results[i].original_title, //Need a showtime here//);

            //change THDB movieID to fandango movieID
            //fandago movieID
            //fandango API
            // $.ajax({
            //     type: "GET",
            //     url: "http://api.fandango.com/v1/?op=performancesbymoviepostalcodesearch&movieid=151500&postalcode=08816&apikey=wtf2a3w28686grrnqx2myk7u&sig=0d637ad758f518ec99bf148e1ee9d9b01a21590a86526a18e8bdfaeacf2b13af",
            //     dataType: "JSON",
            // }).then(function(data) {
            //     console.log(data);
            // })
        }
})
}

//WIP function finds similar movies based on genre and keywords
function findSimilarMovies(userMovie){

    var movieId = "";

    //ajax returns movie ID based on movie name
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&query=" + userMovie + "&page=1&include_adult=false",
        dataType: "JSON",
    }).then(function (data) {
        movieId = data.results[0].id
        //ajax call returns movies based on movie ID
        $.ajax({
            type: "GET",
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
            dataType: "JSON",
        }).then(function (dataMovie) {
            console.log(dataMovie);
        })
    })
    //looking up a genre list
    // $.ajax({
    //     type: "GET",
    //     url: "https://api.themoviedb.org/3/genre/movie/list?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US",
    //     dataType: "JSON",
    // }).then(function(data){
    //     console.log(data)
    // })
}

$(document).ready(function(){

    $("#faveTeamBtn").on("click", function(event){
        event.preventDefault();
        addFavoriteSportTeamEvents($("#faveTeamInput").val());
    })
})