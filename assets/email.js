//var API = configVariables.API;

// Node.js SDK: https://github.com/sendinblue/APIv3-nodejs-library
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = configVariables.API;

var apiInstance = new SibApiV3Sdk.ContactsApi();

var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
createContact = { 'email' : "ryanzelazny@gmail.com" };

apiInstance.createContact(createContact).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});