//var API = configVariables.API;

// Node.js SDK: https://github.com/sendinblue/APIv3-nodejs-library
import { ApiClient, ContactsApi, CreateContact } from 'sib-api-v3-sdk';
var defaultClient = ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = configVariables.API;

var apiInstance = new ContactsApi();

var createContact = new CreateContact(); // CreateContact | Values to create a contact
createContact = { 'email' : "ryanzelazny@gmail.com" };

apiInstance.createContact(createContact).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});