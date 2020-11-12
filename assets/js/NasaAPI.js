// var APIKey = configVariables.NASAKey;
var APIKey = "GdEg4FRAzH4iSejZ4CKf8uxEy5RpGsDRREKWJeBT"
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey; 

$.ajax({
  url: nasaUrl,
  method: "GET"
}).then(function(data){
  var imageUrl = data.url;
  var imageText = data.explanation
  var spaceImg = $("<img>");
  var spaceText = $("<p>");

  spaceImg.attr("src", imageUrl);
  spaceImg.attr("alt", "space Image")

  $(".image").prepend(spaceImg); 

})