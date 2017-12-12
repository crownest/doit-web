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
        alertify.error("Please correct the errors and try again.");
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


export function changePassword(data) {
  var auth_informations = getAuthInformations();

  return request
    .post(api_users_url + auth_informations.user_id + '/password/change/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send({
      old_password: data["old_password"],
      new_password: data["new_password"],
      confirm_new_password: data["confirm_new_password"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_200_OK) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "id_change_password_form");
        alertify.success("Your password has been successfully changed.");
      }
    });
}


export function forgotPassword(data) {
  return request
    .post(api_users_url + 'password/forgot/')
    .type("application/json")
    .accept("application/json")
    .send({
      email: data["email"],
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_200_OK) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "id_forgot_password_form");
        alertify.success("We sent you a mail.<br>Please check your email address.");
      }
    });
}
