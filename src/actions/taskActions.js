// Local Modules
import {
  request,
  alertify,
  api_tasks_url,
  getAuthInformations,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  clearErrorForm,
  setErrorForm,
  resetForm
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


export function createTask(data) {
  var auth_informations = getAuthInformations();

  return request
    .post(api_tasks_url)
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send({
      title: data["title"],
      description: data["description"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_201_CREATED) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "id_task_create_form");
        alertify.success("Task created.");
        window.location = "/tasks/" + response.body.id + "/"
      }
    });
}


export function retrieveTask(task_id, onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .get(api_tasks_url + task_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .end((error, response) => {
      if (error || response.statusCode !== HTTP_200_OK) {
        alertify.error("An unexpected error has occurred and try again later.");
        window.location = "/tasks/"
      } else {
        onComplete(response.body);
      }
    });
}


export function updateTask(task_id, data, onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .put(api_tasks_url + task_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send({
      title: data["title"],
      description: data["description"]
    })
    .end(function(error, response) {
      if (error || response.statusCode !== HTTP_200_OK) {
        clearErrorForm(data);
        alertify.error("Please correct the errors and try again.");
        setErrorForm(response)
      } else {
        resetForm(data, "id_task_update_form");
        alertify.success("Task updated.");
        onComplete(response.body);
      }
    });
}


export function deleteTask(task_id) {
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
