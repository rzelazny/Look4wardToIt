    //////////////////////////////////////////////////////////////////////////////////
    // Variables ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    var settingsButton = document.getElementById("settings-button");
    var settingsContainer = document.getElementById("settings-view-container");

    var monthContainer = document.querySelector("#month-view-container");
    var weekContainer = document.querySelector("#week-view-container");
    var dailyContainer = document.querySelector("#daily-view-container");
    var twitter = document.querySelector("#twitter");

    var monthButton = document.querySelector("#month-button");
    var weekButton = document.querySelector("#week-button");
    var dailyButton = document.querySelector("#daily-button");

    var previousMonthButton = document.querySelector("#previousMonth");
    var nextMonthButton = document.querySelector("#nextMonth");

    var previousWeekButton = document.querySelector("#previousWeek");
    var nextWeekButton = document.querySelector("#nextWeek");

    var previousDateButton = document.querySelector("#previousDate");
    var nextDateButton = document.querySelector("#nextDate");
    var todaysDateBtn = document.querySelector("#todaysDate");

    var sportsYN = document.querySelector("#previousDate");
    var moviesYN = document.querySelector("#previousDate");

    //new user experience buttons
    var nuPickActivites = document.querySelectorAll(".newUserExperience");

    var today = new Date();

    var currentDay = today.getDay();
    var currentDate = today.getDate();

    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    var selectYear = document.getElementById("year");
    var selectMonth = document.getElementById("month");


    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //////////////////////////////////////////////////////////////////////////////////
    // Daily View Functions /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    d = 0;
    // this function will be used to generate and display daily cal view //
    function showDailyCalendar() {

        dailyBody = document.getElementById("daily-body");

        // id for header on daily cal //
        $("#currentDate").text(moment().add(d, 'days').format("ddd, MMM Do"));

        //clears daily cal //
        dailyBody.innerHTML = "";

        for (var i = 0; i < 1; i++) {
            // creating daily cal //
            var dailyRow = document.createElement("tr");
            var dailyCell = document.createElement("td");
            var dailyCellText = document.createTextNode("");
            var dailyInput = document.createElement("textarea");

            dailyInput.classList.add("dailyText", "input-event");
            dailyInput.setAttribute("date", moment().add(d, 'days').format("DD-MM-YYYY"));

            dailyCell.appendChild(dailyInput);
            dailyRow.appendChild(dailyCell);
            dailyCell.appendChild(dailyCellText);
            dailyBody.appendChild(dailyRow);
        }
    }

    function nextDate() {
        d++;
        showDailyCalendar();
    }

    function previousDate() {
        d--;
        showDailyCalendar();
    }

    function resetDate() {
        d = 0;
        showDailyCalendar();
        loadExistingEvents();
    }

    showDailyCalendar();

    todaysDateBtn.addEventListener("click", resetDate);

    /////////////////////////////////////////////////////////////////////////////////
    // Month View Functions /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function nextMonth() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showMonthCalendar(currentMonth, currentYear);
    }

    function previousMonth() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showMonthCalendar(currentMonth, currentYear);
    }

    function jump() {
        currentYear = parseInt(selectYear.value);
        currentMonth = parseInt(selectMonth.value);
        showMonthCalendar(currentMonth, currentYear);
    }

    function showMonthCalendar(month, year) {

        selectYear.value = year;
        selectMonth.value = month;

        monthBody = document.getElementById("month-body");

        $(".monthYearClass").text(months[month] + " " + year);

        let firstDay = (new Date(year, month)).getDay();

        //clears monthly cal //
        monthBody.innerHTML = "";

        // creating monthly cal //
        var date = 1;
        for (var i = 0; i < 6; i++) {
            // creates a cal rows //
            var row = document.createElement("tr");

            //creating individual cells // fill w/ data //
            for (var j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth(month, year)) {
                    break;
                }

                else {
                    cell = document.createElement("td");
                    // cell.classList.add("selected-day");
                    // cell.setAttribute("id", date + "-" + (month+1) + "-" + year);
                    cellText = document.createTextNode(date);
                    input = document.createElement("textarea")
                    input.classList.value = "input-event";
                    input.setAttribute("date", date + "-" + (month+1) + "-" + year) //not sure why this month returns 1 less than expected
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    cell.appendChild(input);

                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("today-month");
                    }
                    date++;
                }
            }
            // append each row into calendar body //
            monthBody.appendChild(row);
        }
    // var dailyPhoto = document.querySelector("#dailyPhoto")
    }

    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    showMonthCalendar(currentMonth, currentYear);

    ///////////////////////////////////////////////////////////////////////
    // Getting the containers to display when button for section clicked //
    ///////////////////////////////////////////////////////////////////////

    function displaySettings() {
        if (settingsContainer.style.display === "none") {
            settingsContainer.style.display = "block";
        } else {
            settingsContainer.style.display = "none";
        }
        //hide new user experience buttons
        $(".btn-primary.newUserExperience").attr("class", "invisible");
    }


    function showMonthView() {
        if (monthContainer.style.display === "none" && weekContainer.style.display === "block" && dailyContainer.style.display === "none") {
            monthContainer.style.display = "block";
            weekContainer.style.display = "none";
            dailyContainer.style.display = "none";
        }
        else if (monthContainer.style.display === "none" && weekContainer.style.display === "none" && dailyContainer.style.display === "block") {
            monthContainer.style.display = "block";
            weekContainer.style.display = "none";
            dailyContainer.style.display = "none";
        }
    }

    function showWeekView() {
        if (monthContainer.style.display === "block" && weekContainer.style.display === "none" && dailyContainer.style.display === "none") {
            monthContainer.style.display = "none";
            weekContainer.style.display = "block";
            dailyContainer.style.display = "none";
        }
        else if (monthContainer.style.display === "none" && weekContainer.style.display === "none" && dailyContainer.style.display === "block") {
            monthContainer.style.display = "none";
            weekContainer.style.display = "block";
            dailyContainer.style.display = "none";
        }
    }

    function showDailyView() {
        if (monthContainer.style.display === "block" && weekContainer.style.display === "none" && dailyContainer.style.display === "none") {
            monthContainer.style.display = "none";
            weekContainer.style.display = "none";
            dailyContainer.style.display = "block";

        }
        else if (monthContainer.style.display === "none" && weekContainer.style.display === "block" && dailyContainer.style.display === "none") {
            monthContainer.style.display = "none";
            weekContainer.style.display = "none";
            dailyContainer.style.display = "block";
        }
        else if (dailyContainer.style.display === "none") {
            dailyContainer.style.display = "block";
        }
    }

    // function displayTwitter() {
    //     if (dailyContainer.style.display === "block" && twitter.style.display === "none") {
    //         twitter.style.display = "block";
    //     }
    // }

    ///////////////////////////////////////////////////////////////////////
    // New User Set Up ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    //function moves the user through setting up their initial preferences
    function nuExperience(myObject, newUser){
        //only make changes for new users
        if(newUser === true){
            //display the entire settings panel, but hide the individual pieces so they can be shown piecemeal
            $("#settings-view-container").show();
            $("#userSetting").hide();
            $("#newUser").hide();
            $("#themeSetting").hide();
            $("#quoteSetting").hide();
            $("#sportsYN").hide();
            $("#faveSports").hide();
            $("#faveTeam").hide();
            $("#moviesSetting").hide();
            //console.log(myObject.id)
            //show the next section depending on what the user clicked
            switch(myObject.id){
                case "newUserPickActivites": //this is the first button they see
                    $("#sportsYN").show();
                    break;
                case "sportsN": // if they say no to sports they will need to press the move on button to go to the movies section 
                    $("#sportsSetting").show();
                    $("#sportsYN").show();
                    break;
                case "sportsY": //if they choose yes to sports let them pick a team
                    $("#sportsSetting").show();
                    $("#sportsYN").show();
                    $("#faveTeam").show();
                    break;
                case "faveTeamBtn": //once they've picked a team display the move-on button
                    $("#sportsSetting").show();
                    $("#sportsYN").show();
                    $("#faveTeam").show();
                    break;
                case "sportsN": //if they choose no to sports they don't need to see faveTeam
                    $("#sportsSetting").show();
                    $("#sportsYN").show();
                    break;
                case "nuSportsMoveOnButton":
                    $("#sportsSetting").hide();
                    $("#moviesSetting").show();
                    $("#faveGenres").hide();
                    $("#faveMovie").hide();
                    $("#nuMovieMoveOnButton").show();
                    break;
                case "moviesY": //if they choose yes to movies add the movie search bar and head to themes
                    $("#moviesSetting").show();
                    $("#faveGenres").show();
                    $("#faveMovie").hide();
                    $("#nuMovieMoveOnButton").show();
                    break;
                case "moviesN": //if they choose yes to movies add the movie search bar and head to themes
                    $("#moviesSetting").show();
                    $("#nuMovieMoveOnButton").show();
                    break;
                case "nuMovieMoveOnButton":
                    $("#moviesSetting").hide();
                    //console.log(userPreferences.movies.likesMovies)
                    if(userPreferences.movies.likesMovies == "true"){
                        $("#movieBarBlurb").show();
                        $("#movieSearchBar").show(); //make the movie search appear
                    }
                    $("#nuMovieMoveOnButton").hide();
                    $("#newUserInformation").show();
                    $("#beforeThemeBlurb").show();
                    $("#nuThemeButton").show();
                    $("#nuQuotesButton").hide();
                    $("#quoteSetting").hide();
                    break;
                case "nuShowThemes": //Show them that they can change themes
                    $("#newUserInformation").hide(); 
                    $("#themeSetting").show();
                    break;
                case "default": //once they're choosing themes they can toggle between the choices
                    $("#themeSetting").show();
                    $("#nuThemeMoveOn").show();
                    break;
                case "nasa": //once they're choosing themes they can toggle between the choices
                    $("#themeSetting").show();
                    $("#nuThemeMoveOn").show();
                    break;
                case "rm": //once they're choosing themes they can toggle between the choices
                    $("#themeSetting").show();
                    $("#nuThemeMoveOn").show();
                    break;
                case "nuThemeMoveOnButton":
                    $("#quoteSetting").hide();
                    $("#themeSetting").hide();
                    $("#newUserInformation").show();
                    $("#movieBarBlurb").hide();
                    $("#beforeThemeBlurb").hide();
                    $("#beforeEmailBlurb").hide();
                    $("#beforeQuoteBlurb").show();
                    $("#nuThemeButton").hide();
                    $("#nuShowQuotes").show();
                    $("#nuQuotesButton").show();
                    $("#nuEmailButtons").hide();
                    $("#nuShowThemes").toggleClass("invisible", "visible");
                    //$("#nuShowQuotes").toggleClass("invisible", "visible");
                    break;
                case "nuShowQuotes":$("#quoteSetting").hide();
                    $("#themeSetting").hide();
                    $("#newUserInformation").hide();
                    $("#movieBarBlurb").hide();
                    $("#beforeThemeBlurb").hide();
                    $("#beforeEmailBlurb").hide();
                    $("#beforeQuoteBlurb").hide();
                    $("#nuThemeButton").hide();
                    $("#nuQuotesButton").show();
                    $("#nuEmailButtons").hide();
                    $("#quoteSetting").show();
                    break;
                case "nuQuoteMoveOnButton": //After setting themes ask about email and user name
                    $("#quoteSetting").hide();
                    $("#themeSetting").hide();
                    $("#newUserInformation").show();
                    $("#movieBarBlurb").hide();
                    $("#beforeThemeBlurb").hide();
                    $("#beforeEmailBlurb").show();
                    $("#nuThemeButton").hide();
                    $("#nuEmailButtons").show();
                    $("#nuQuotesButton").toggleClass("invisible", "visible");
                    break;
                case "noToEmail": //If no emails then setup is done, display the calendar
                    userPreferences.newUser = false;
                    localStorage.setItem("preferences", JSON.stringify(userPreferences));
                    location.reload();
                    break;
                case "yesToEmail": //Display user name and email prompt
                    $("#newUserInformation").hide();
                    $("#userSetting").show();
                    break;
                case "save-user-button": //last button they hit is to save username/email
                    userPreferences.newUser = false;
                    localStorage.setItem("preferences", JSON.stringify(userPreferences));
                    location.reload();
                    break;
            }
        }
    }

    var todayMonth = document.querySelector(".today-month");
    todayMonth.addEventListener("click", showDailyView);


    ///////////////////////////////////////////////////////////////////////
    // Event Listeners //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    previousMonthButton.addEventListener("click", previousMonth);
    nextMonthButton.addEventListener("click", nextMonth);

    // previousWeekButton.addEventListener("click", previousWeek); //fnc doesnt exist yet
    // nextWeekButton.addEventListener("click", nextWeek); //fnc doesnt exist yet

    previousDateButton.addEventListener("click", previousDate);
    nextDateButton.addEventListener("click", nextDate); 

    monthButton.addEventListener("click", showMonthView);
    weekButton.addEventListener("click", showWeekView);
    dailyButton.addEventListener("click", showDailyView);

    // displayTwitter();

    selectYear.addEventListener("change", jump);
    selectMonth.addEventListener("change", jump);

    settingsButton.addEventListener("click", displaySettings);

    //new user experience event listeners
    for(i=0; i < nuPickActivites.length; i++)
        nuPickActivites[i].addEventListener("click", function(){
        nuExperience(this, userPreferences.newUser);
    });
