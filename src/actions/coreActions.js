// Actions
import {
  request,
  api_auth_login_url,
  api_contacts_url
} from "./baseActions";


export function authLogin(data, onComplete) {
  /*
    data = {
      email: "crownest@unicrow.com"
      password: "123456c"
    }
  */

  return request
    .post(api_auth_login_url)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function createContact(data, onComplete) {
  /*
    data = {
      first_name: "Crownest",
      last_name: "Apps",
      email: "crownest@unicrow.com",
      message: "Good job."
    }
  */

  return request
    .post(api_contacts_url)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}
