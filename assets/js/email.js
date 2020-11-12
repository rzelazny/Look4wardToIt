window.onload = function() {

  //object stores the parameters used to populate email template
  var emailParams = {
    user_name: "",
    upcoming_event: "",
    message: ""
  }

  // Initialize email client with API key
  emailjs.init(configVariables.emailIDKey);

  //Check if events need a reminder set when calendar is opened
  eventReminder();
  
  // Get time to see if we need to send emails yet
  //var curTime = (moment().format('H'));
  

  //function sends an email if there is an event tomorrow that hasn't had a reminder sent yet
  function eventReminder(){
    
    emailParams.message = "This is a test message";
    emailParams.user_name = "Ryan";
    emailParams.upcoming_event = "Pinewood Derby";

    if(events.reminderSent === false){
      //sendEmail(emailParams);
    }

  }

  //var sendEmail = $("#send_alert").val();




  //function sends an email using EmailJS
  function sendEmail (emailParams){
      emailjs.send("default_service", "template_jhilbex", emailParams)
      .then(function() {
        console.log('Email sent!');
      }, function(error) {
        console.log('Email failed...', error);
    });
  }
}
