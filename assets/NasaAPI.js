var APIKey = "GdEg4FRAzH4iSejZ4CKf8uxEy5RpGsDRREKWJeBT"
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey; 

$.ajax({
  url: nasaUrl,
  method: "GET"
}).then(function(data){
  var imageUrl = data.hdurl;
  var spaceImg = $("<img>");

  spaceImg.attr("src", imageUrl);
  spaceImg.attr("alt", "space Image")

  // $("#images").prepend(spaceImg); 
  $("#month-view").css("background-image", 'url(' + imageUrl + ')');
  $("#images").css("background-size", "300px" )
})
