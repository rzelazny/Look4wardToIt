// $(document).ready(function () {

    var today = new Date();

    var currentDay = today.getDay();
    var currentDate = today.getDate();

    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    var selectYear = document.getElementById("year");
    var selectMonth = document.getElementById("month");

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

     /////////////////////////////////////////////////////////////////////////////////
    // Daily View Functions /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function showDailyCalendar(date) {

        // selectYear.value = year;
        // selectMonth.value = month;

        dailyBody = document.getElementById("daily-body");

        // $(".monthYearClass").text(months[month] + " " + year);
        $("#currentDate").text(moment().format("ddd, MMM Do"));

        if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
            currentDateLong = currentDate + "st";
        }
        else if (currentDate === 2 || currentDate === 22) {
            currentDateLong = currentDate + "nd";
        }
        else if (currentDate === 3 || currentDate === 23) {
            currentDateLong = currentDate + "rd";
        } else {
            currentDateLong = currentDate + "th";
        };

        console.log(currentDateLong);
        // console.log(months[month] + " " + currentDateLong);







    }

    // id for quote area on the daily page
    $("#dailyQuote").text("this is where we will be putting the daily quote :)")


    // function nextDay() {
    //     currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    //     currentMonth = (currentMonth + 1) % 12;
    //     // currentMonth = (currentMonth + 1); shows the exact same in console
    //     // console.log(currentMonth);
    //     showDailyCalendar(currentDate);
    // }

    // function previousDay() {
    //     currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    //     currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    //     showDailyCalendar(currentDate;
    // }

    showDailyCalendar(currentDate);

    /////////////////////////////////////////////////////////////////////////////////
    // Month View Functions /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function nextMonth() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        // currentMonth = (currentMonth + 1); shows the exact same in console
        // console.log(currentMonth);
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
                    cellText = document.createTextNode(date);
                    input = document.createElement("textarea")
                    input.classList.value = "input-event";
                    input.setAttribute("date", date + "-" + (month+1) + "-" + year) //not sure why this month returns 1 less than expected
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    cell.appendChild(input);

                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-warning")
                    }
                    date++;
                }
            }
            // append each row into calendar body //
            monthBody.appendChild(row);

            //WIP to target specific day on month view//
            // document.querySelectorAll("#month-body .cell").forEach(cell => {
            //     cell.addEventListener("click", event => {
            //         console.log(event.currentTarget);
            //     });
            // });
        }
    }

    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    showMonthCalendar(currentMonth, currentYear);

    //WIP to target specific day on month view//
    // document.querySelectorAll("#month-body .input").forEach(cell => {
    //     cell.addEventListener("click",event => {
    //         console.log(event.currentTarget);
    //     });
    // });

    ///////////////////////////////////////////////////////////////////////
    // Getting the containers to display when button for section clicked //
    ///////////////////////////////////////////////////////////////////////


    var monthContainer = document.querySelector("#month-view-container");
    var weekContainer = document.querySelector("#week-view-container");
    var dailyContainer = document.querySelector("#daily-view-container");
    var monthButton = document.querySelector("#month-button");
    var weekButton = document.querySelector("#week-button");
    var dailyButton = document.querySelector("#daily-button");


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
    }

    monthButton.addEventListener("click", showMonthView);
    weekButton.addEventListener("click", showWeekView);
    dailyButton.addEventListener("click", showDailyView);

// });