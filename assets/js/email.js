//object stores the parameters used to populate email template
var emailParams = {
  user_name: "",
  user_email: "",
  upcoming_event: "",
  message: ""
}
//email templates for Email JS
var templateUpcomingEvent = "template_jhilbex";
var templateWelcome = "template_egiddfl";

//function sends an email if there is an event tomorrow that hasn't had a reminder sent yet
function eventReminder(){

  //create variable that stores tomorrow's date for comparison against upcoming events
  var upcomingCheck = new Date();
  upcomingCheck = moment(upcomingCheck).add(1, 'days');
  upcomingCheck = (moment(upcomingCheck).format("DD-MM-YYYY"));

  emailParams.user_name = userPreferences.userName;
  emailParams.user_email = userPreferences.userEmail;

  for(i=0; i<events.length;i++){
    if(events[i].eventDay === upcomingCheck && events[i].reminderSent === false){
      emailParams.upcoming_event = events[i].event;
      emailParams.message = "You've got an event tomorrow: ";

      sendEmail(emailParams, templateUpcomingEvent);
      //flag event as having the reminder sent to prevent duplicate emails
      events[i].reminderSent = true;
      localStorage.setItem("events", JSON.stringify(events));
    }
  }
}

//function sends an email using EmailJS
function sendEmail (emailParams, template){
    emailjs.send("default_service", template, emailParams)
    .then(function() {
      console.log('Email sent!');
    }, function(error) {
      console.log('Email failed...', error);
  });
}

//function sends a new user a welcome email
function welcomeEmail(){
  emailParams.user_name = userPreferences.userName;
  emailParams.user_email = userPreferences.userEmail;
  emailParams.upcoming_event = "";
  emailParams.message = "";

  sendEmail(emailParams, templateWelcome);
}

$(document).ready(function() {
  // Initialize email client with API key
  emailjs.init(configVariables.emailIDKey);

  //Check if events need a reminder set when calendar is opened as long as they've already gotten their welcome email
  if(events !== null && userPreferences.newUserWelcomeSent === true){
    eventReminder();
  }

  //check is new user needs their welcome email sent
  if(userPreferences.newUserWelcomeSent === false){
    if(userPreferences.userEmail.search("@") > 0) {
      welcomeEmail();
      userPreferences.newUserWelcomeSent = true;
      localStorage.setItem("preferences", JSON.stringify(userPreferences));
    }
  }
})