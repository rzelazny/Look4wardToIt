window.onload = function() {

  // Initialize email client with API key
  emailjs.init(configVariables.emailIDKey);
  
  // Get time to see if we need to send emails yet
  var curTime = (moment().format('H'));
  var sendEmail = $("#send_alert").val();



  //send email based on criteria (currently if it's ~8pm for testing)
  if(curTime > 20 && curTime < 21){
    $("#send_mail").value("true");
  }

  if(sendEmail === true){
    // send email using EmailJS 
    emailjs.sendForm("default_service", "template_jhilbex", "#email-form")
    .then(function() {
      console.log('Email sent!');
    }, function(error) {
      console.log('Email failed...', error);
    });
  }

}
