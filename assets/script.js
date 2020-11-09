var userTeam = "Buffalo Bills";
var teamID = ""


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
