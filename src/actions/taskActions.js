// Local Modules
import {
  request,
  alertify,
  api_tasks_url,
  getAuthInformations,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
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
      onComplete(response);
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
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          resetForm(data, "id_task_create_form");
          alertify.success("Task created.");
          window.location = "/tasks/" + response.body.id + "/";
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          clearErrorForm(data);
          alertify.error("Please correct the errors and try again.");
          setErrorForm(response);
        } else {
          resetForm(data, "id_task_create_form");
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        resetForm(data, "id_task_create_form");
        alertify.error("An unexpected error has occurred and try again later.");
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
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          onComplete(response.body);
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
          window.location = "/tasks/"
        }
      } else {
        alertify.error("An unexpected error has occurred and try again later.");
        window.location = "/tasks/"
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
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          resetForm(data, "id_task_update_form");
          alertify.success("Task updated.");
          onComplete(response.body);
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          clearErrorForm(data);
          alertify.error("Please correct the errors and try again.");
          setErrorForm(response);
        } else {
          resetForm(data, "id_task_update_form");
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        resetForm(data, "id_task_update_form");
        alertify.error("An unexpected error has occurred and try again later.");
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
        if (response) {
          if (response.statusCode === HTTP_204_NO_CONTENT) {
            alertify.success("Task deleted.");
            window.location.reload();
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
        }
      });
  });
}
