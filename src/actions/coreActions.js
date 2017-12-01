// Local Modules
import {
  request,
  alertify,
  api_auth_login_url,
  api_contacts_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  setAuthInformations,
  clearErrorForm,
  setErrorForm,
  resetForm
} from "./baseActions";


export function authLogin(data) {
  return request
    .post(api_auth_login_url)
    .type("application/json")
    .accept("application/json")
    .send({
      email: data["email"],
      password: data["password"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_200_OK) {
        clearErrorForm(data);
        alertify.error(
          "Please correct the errors and try again!<br>",
        );
        setErrorForm(response)
      } else {
        resetForm(data, "id_login_form");
        setAuthInformations(response.body.auth_token, response.body.user_id);
        window.location = "/tasks/";
      }
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
      if (error || response.statusCode !== HTTP_201_CREATED) {
        clearErrorForm(data);
        alertify.error(
          "Please correct the errors and try again!<br>",
        );
        setErrorForm(response)
      } else {
        resetForm(data, "id_contact_form");
        alertify.success(
          "Your message was successfully sent."
        );
      }
    });
}
