// Local Modules
import {
  request,
  alertify,
  api_reminders_url,
  getAuthInformations,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  clearErrorForm,
  setErrorForm,
  resetForm
} from "./baseActions";


export function createReminder(data) {
  var auth_informations = getAuthInformations();

  return request
    .post(api_reminders_url)
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send({
      task: data["task"],
      date: data["date"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_201_CREATED) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "reminder-create-form");
        alertify.success("Reminder created.");
        window.location.reload();
      }
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
      if (error || response.statusCode !== HTTP_200_OK) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "reminder-update-form");
        alertify.success("Reminder updated.");
        onComplete(response.body);
        window.location.reload();
      }
    });
}


export function deleteReminder(reminder_id) {
  alertify.confirm("Are you sure you want to delete?", function () {
    var auth_informations = getAuthInformations();

    return request
      .del(api_reminders_url + reminder_id + '/')
      .set("Authorization", "TOKEN " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json")
      .end((error, response) => {
        if (error || response.statusCode !== HTTP_204_NO_CONTENT) {
          alertify.error("An unexpected error has occurred and try again later.");
        } else {
          alertify.success("Reminder deleted.");
          window.location.reload();
        }
      });
  });
}
