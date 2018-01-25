// Local Modules
import {
  request,
  alertify,
  api_reminders_url,
  getAuthInformations,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  clearErrorForm,
  setErrorForm,
  resetForm
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
  var auth_informations = getAuthInformations();

  return request
    .put(api_reminders_url + reminder_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send({
      date: data["date"]
    })
    .end(function(error, response) {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          resetForm(data, "reminder-update-form");
          alertify.success("Reminder updated.");
          onComplete(response.body);
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          clearErrorForm(data);
          alertify.error("Please correct the errors and try again.");
          setErrorForm(response);
        } else {
          resetForm(data, "reminder-update-form");
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        resetForm(data, "reminder-update-form");
        alertify.error("An unexpected error has occurred and try again later.");
      }
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
