// Local Modules
import {
  request,
  alertify,
  api_users_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  getAuthInformations,
  clearErrorForm,
  setErrorForm,
  resetForm
} from "./baseActions";


export function createUser(data) {
  return request
    .post(api_users_url)
    .type("application/json")
    .accept("application/json")
    .send({
      email: data["email"],
      first_name: data["first_name"],
      last_name: data["last_name"],
      password: data["password"],
      confirm_password: data["confirm_password"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_201_CREATED) {
        clearErrorForm(data);
        alertify.error(
          "Please correct the errors and try again!<br>",
        );
        setErrorForm(response)
      } else {
        resetForm(data, "id_register_form");
        alertify.success(
          "Your registration was successful.<br> Please verify your email address."
        );
      }
    });
}


export function retrieveUser(onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .get(api_users_url + auth_informations.user_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .end((error, response) => {
      if (error || response.statusCode !== HTTP_200_OK) {
        alertify.error("An unexpected error has occurred and try again later.");
      } else {
        onComplete(response.body);
      }
    });
}
