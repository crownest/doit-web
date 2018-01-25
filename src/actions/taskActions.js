// Actions
import {
  request,
  alertify,
  api_tasks_url,
  getAuthInformations
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


export function createTask(data, onComplete) {
  /*
    data = {
      title: "Drink Tea",
      description: "Chai Masala"
    }
  */

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
      onComplete(response);
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
      onComplete(response);
    });
}


export function updateTask(task_id, data, onComplete) {
  /*
    data = {
      title: "Sport",
      description: "Basketball"
    }
  */

  var auth_informations = getAuthInformations();

  return request
    .put(api_tasks_url + task_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}


export function deleteTask(task_id, onComplete) {
  var auth_informations = getAuthInformations();

  return request
    .del(api_tasks_url + task_id + '/')
    .set("Authorization", "TOKEN " + auth_informations.auth_token)
    .type("application/json")
    .accept("application/json")
    .end((error, response) => {
      onComplete(response);
    });
}
