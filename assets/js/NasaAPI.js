// var APIKey = configVariables.NASAKey;
var APIKey = "GdEg4FRAzH4iSejZ4CKf8uxEy5RpGsDRREKWJeBT"
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey; 

$.ajax({
  url: nasaUrl,
  method: "GET"
}).then(function(data){
  var imageUrl = data.hdurl;
  var imageText = data.explanation;
  var spaceImg = $("<img>");
  var spaceText = $("<p>");
  console.log(imageText);
  
  spaceImg.attr("src", imageUrl);
  // spaceImg.attr("alt", "space Image")
  spaceText.attr("src", imageText);
  
  $("#image").prepend(spaceImg); 
  $("#space-content").prepend(spaceText);
})

// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}