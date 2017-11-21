// Local Modules
import {
  request,
  alertify,
  url,
  HTTP_200_OK,
  setToken,
  clearErrorForm,
  setErrorForm,
  resetForm
} from "./baseActions";

// Api
const api_auth_login_url = url + "/auth/login/";


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
        setToken(response.body.auth_token);
        window.location = "/index/";
      }
    });
}
