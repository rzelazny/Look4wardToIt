$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/movie/upcoming?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
    dataType: "JSON",
}).then(function (listMovies) {
    for (let i = 0; i < listMovies.results.length; i++) {
        console.log(listMovies.results[i].original_title);
        console.log(listMovies.dates);
    }
    if (listMovies.results.release_date !== listMovies.dates.minumum) {
        //dont show title
    }
    else {
        //show title
    }
})