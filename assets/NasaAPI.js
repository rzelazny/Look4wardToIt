var req = new XMLHttpRequest();
var APIKey = configVariables.NASAKey;
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey; 

console.log(nasaUrl);

req.open("GET", nasaUrl);
req.send();

req.addEventListener("load", function(){
        if(req.status == 200 && req.readyState == 4){
        var response = JSON.parse(req.responseText);
      document.getElementById("date").textContent = response.date;
      document.getElementById("pic").src = response.hdurl;
    }
})

