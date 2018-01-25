// Actions
import {
  request,
  api_users_url,
  getAuthInformations
} from "./baseActions";


export function createUser(data, onComplete) {
  /*
    data = {
      email: "crownest@unicrow.com",
      first_name: "Crownest",
      last_name: "Apps",
      password: "123456c",
      confirm_password: "123456c"
    }
  */

  return request
    .post(api_users_url)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
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
      onComplete(response);
    });
}


export function updateUser(data, onComplete) {
  /*
    data = {
      email: "hello@unicrow.com",
      first_name: "Hello",
      last_name: "Apps"
    }
  */

  var auth_informations = getAuthInformations();

  return request
    .put(api_users_url + auth_informations.user_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function updateUserImage(image, onComplete) {
  /*
    image: @image
  */

  var auth_informations = getAuthInformations();

  return request
    .post(api_users_url + auth_informations.user_id + '/image/update/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .accept("application/json")
    .attach('image', image)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function deleteUserImage(user_id, onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .del(api_users_url + auth_informations.user_id + '/image/delete/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .end((error, response) => {
      onComplete(response);
    });
}


export function changeUserPassword(data, onComplete) {
  /*
    data = {
      old_password: 12356c,
      new_password: c123456,
      confirm_new_password: c123456
    }
  */

  var auth_informations = getAuthInformations();

  return request
    .post(api_users_url + auth_informations.user_id + '/password/change/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function forgotUserPassword(data, onComplete) {
  /*
    data = {
      email: "crownest@unicrow.com"
    }
  */

  return request
    .post(api_users_url + 'password/forgot/')
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}
