// Local Modules
import {
  request,
  alertify,
  api_url,
  HTTP_201_CREATED,
  clearErrorForm,
  setErrorForm,
  resetForm
} from "./baseActions";

// Api
const api_users_url = api_url + "/users/";


export function createUserPost(data) {
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
        resetForm(data, "id_register_form")
        alertify.success(
          "Your registration was successful.<br> Please verify your email address."
        );
      }
    });
}
