var req = new XMLHttpRequest();
var APIKey = configVariables.NASAKey;

var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey; 

$.ajax({
  url: nasaUrl,
  method: "GET"
}).then(function(data){
  var imageUrl = data.hdurl;
  var spaceImg = $("<img>");

  spaceImg.attr("src", imageUrl);
  spaceImg.attr("alt", "space Image")

  $("#images").prepend(spaceImg); 
})

