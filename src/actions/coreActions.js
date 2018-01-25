// Local Modules
import {
  request,
  alertify,
  api_auth_login_url,
  api_contacts_url,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST,
  clearErrorForm,
  setErrorForm,
  resetForm
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


export function createContact(data) {
  return request
    .post(api_contacts_url)
    .type("application/json")
    .accept("application/json")
    .send({
      first_name: data["first_name"],
      last_name: data["last_name"],
      email: data["email"],
      message: data["message"]
    })
    .end(function(error, response) {
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          resetForm(data, "id_contact_form");
          resetForm(data, "settings-contact-form");
          alertify.success("Your message was successfully sent.");
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          clearErrorForm(data);
          alertify.error("Please correct the errors and try again.");
          setErrorForm(response);
        } else {
          resetForm(data, "id_contact_form");
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        resetForm(data, "id_contact_form");
        alertify.error("An unexpected error has occurred and try again later.");
      }
    });
}
