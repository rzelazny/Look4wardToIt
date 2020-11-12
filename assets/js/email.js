$(document).ready(function() {

  //object stores the parameters used to populate email template
  var emailParams = {
    user_name: "",
    user_email: "",
    upcoming_event: "",
    message: ""
  }

  // Initialize email client with API key
  emailjs.init(configVariables.emailIDKey);

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

        sendEmail(emailParams);
        //flag event as having the reminder sent to prevent duplicate emails
        events[i].reminderSent = true;
        localStorage.setItem("events", JSON.stringify(events));
      }
    }
  }

  //function sends an email using EmailJS
  function sendEmail (emailParams){
      emailjs.send("default_service", "template_jhilbex", emailParams)
      .then(function() {
        console.log('Email sent!');
      }, function(error) {
        console.log('Email failed...', error);
    });
  }

  //Check if events need a reminder set when calendar is opened
  if(events !== null){
    eventReminder();
  }
})
