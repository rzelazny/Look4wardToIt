var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// monthYearClass = document.getElementsByClassName("monthYear")
var monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    // currentMonth = (currentMonth + 1); shows the exact same in console
    // console.log(currentMonth);
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    
    let firstDay = (new Date(year, month)).getDay();

     // body of the calendar
    table = document.getElementById("calendar-body");

    // clearing all previous cells
    table.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    // monthYearClass.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createText("");
                input = document.createElement("textarea");
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.appendChild(input);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                input = document.createElement("textarea");
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-warning")
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.appendChild(input);
                date++;
            }
        }
        // append each row into calendar body //
        table.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

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