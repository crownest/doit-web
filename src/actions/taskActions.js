// Local Modules
import {
  request,
  alertify,
  api_tasks_url,
  getAuthInformations,
  HTTP_200_OK,
  HTTP_204_NO_CONTENT
} from "./baseActions";


export function listTask(onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .get(api_tasks_url)
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


export function deleteTask(task_id, onComplete) {
  alertify.confirm("Are you sure you want to delete?", function () {
    var auth_informations = getAuthInformations();

    return request
      .del(api_tasks_url + task_id + '/')
      .set("Authorization", "TOKEN " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json")
      .end((error, response) => {
        if (error || response.statusCode !== HTTP_204_NO_CONTENT) {
          alertify.error("An unexpected error has occurred and try again later.");
        } else {
          alertify.success("Task deleted.");
          window.location = "/tasks/";
        }
      });
  });
}
