// Actions
import {
  request,
  api_reminders_url,
  getAuthInformations
} from "./baseActions";


export function createReminder(data, onComplete) {
  /*
    data = {
      task: 1,
      date: "2017-12-18T16:00:00+03:00"
    }
  */

  var auth_informations = getAuthInformations();

  return request
    .post(api_reminders_url)
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function updateReminder(reminder_id, data, onComplete) {
  /*
    data = {
      date: "2017-12-10T12:00:00+03:00"
    }
  */

  var auth_informations = getAuthInformations();

  return request
    .put(api_reminders_url + reminder_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function deleteReminder(reminder_id, onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .del(api_reminders_url + reminder_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .end((error, response) => {
      onComplete(response);
    });
}
