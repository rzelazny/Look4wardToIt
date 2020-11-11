// $(document).ready(function () {

    //////////////////////////////////////////////////////////////////////////////////
    // Variables ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    var monthContainer = document.querySelector("#month-view-container");
    var weekContainer = document.querySelector("#week-view-container");
    var dailyContainer = document.querySelector("#daily-view-container");

    var monthButton = document.querySelector("#month-button");
    var weekButton = document.querySelector("#week-button");
    var dailyButton = document.querySelector("#daily-button");

    var previousMonthButton = document.querySelector("#previousMonth");
    var nextMonthButton = document.querySelector("#nextMonth");

    var previousWeekButton = document.querySelector("#previousWeek");
    var nextWeekButton = document.querySelector("#nextWeek");

    var previousDateButton = document.querySelector("#previousDate");
    var nextDateButton = document.querySelector("#nextDate");

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
    t = 0;
    function showDailyCalendar() {

        dailyBody = document.getElementById("daily-body");

        // id for header on daily cal //
        $("#currentDate").text(moment().add(t, 'days').format("ddd, MMM Do"));

        // id for quote area on the daily page //
        $("#dailyQuote").text("this is where we will be putting the daily quote :)")

        //clears daily cal //
        dailyBody.innerHTML = "";

        for (var i = 0; i < 1; i++) {
            // creating daily cal //
            var dailyRow = document.createElement("tr");
            var dailyCell = document.createElement("td");
            var dailyCellText = document.createTextNode("");
            var dailyInput = document.createElement("textarea")

            dailyInput.classList.add("dailyText")

            dailyCell.appendChild(dailyInput);
            dailyRow.appendChild(dailyCell);
            dailyCell.appendChild(dailyCellText);
            dailyBody.appendChild(dailyRow);
        }
    }

    function nextDate() {
        t++;
        showDailyCalendar();
    }

    function previousDate() {
        t--;
        showDailyCalendar();
    }

    showDailyCalendar();

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

    ///////////////////////////////////////////////////////////////////////
    // Getting the containers to display when button for section clicked //
    ///////////////////////////////////////////////////////////////////////


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

    ///////////////////////////////////////////////////////////////////////
    // Event Listeners //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    previousMonthButton.addEventListener("click", previousMonth);
    nextMonthButton.addEventListener("click", nextMonth);

    // previousWeekButton.addEventListener("click", previousWeek); //fnc doesnt exist yet
    // nextWeekButton.addEventListener("click", nextWeek); //fnc doesnt exist yet

    previousDateButton.addEventListener("click", previousDate); //fnc wip
    nextDateButton.addEventListener("click", nextDate); //fnc wip

    monthButton.addEventListener("click", showMonthView);
    weekButton.addEventListener("click", showWeekView);
    dailyButton.addEventListener("click", showDailyView);

    selectYear.addEventListener("change", jump);
    selectMonth.addEventListener("change", jump);

// });