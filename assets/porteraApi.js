var today = new Date();
var releaseDate = new Date();

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
        if(Date.parse(data.results[i].release_date) <= Date.parse(today)) {
            // console.log("dont show title")
        }
        else {
            // console.log("show title")
        }
    }
})

$.ajax({
    type: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=c96c270b94cb65e3e28950111caf5bb7&language=en-US&page=1",
    dataType: "JSON",
}).then(function (data) {
    for (let i = 0; i < data.results.length; i++) {
        // console.log(data.results[i].original_title);
    }
    })