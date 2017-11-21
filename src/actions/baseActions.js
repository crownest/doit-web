// Packages
const request = require("superagent");
const alertify = require("alertify.js");

// Api
const url = "http://127.0.0.1:8000";
const api_url = "http://127.0.0.1:8000/v1";

// Status Codes
const HTTP_200_OK = 200
const HTTP_201_CREATED = 201
const HTTP_204_NO_CONTENT = 204
const HTTP_400_BAD_REQUEST = 400


function setToken(auth_token) {
  if (auth_token) {
    localStorage.setItem("auth_token", auth_token);
  }
}

function removeToken() {
  localStorage.removeItem("auth_token");
}

function isAuthentication() {
  var auth_token = localStorage.getItem("auth_token");

  if (auth_token) {
    return true;
  } else {
    return false;
  }
}

function clearErrorForm(data) {
  for (var input_name in data) {
    var input = document.getElementById("id_" + input_name);
    if (input) {
      input.classList.remove("has-error");
    }

    var input_feedback = document.getElementById(input_name + "_feedback");
    if (input_feedback) {
      input_feedback.innerHTML = "";
    }
  }
}

function setErrorForm(response) {
  if (response.body.non_field_errors) {
    alertify.error(response.body.non_field_errors.join("<br>"));
  }

  for (var input_name in response.body) {
    var input = document.getElementById("id_" + input_name);
    if (input) {
      input.classList.add("has-error");
    }

    var input_feedback = document.getElementById(input_name + "_feedback");
    if (input_feedback) {
      var error_message = "<span>" + response.body[input_name].join("<br>") + "</span>";
      input_feedback.innerHTML = error_message;
    }
  }
}

function resetForm(data, form_id) {
  clearErrorForm(data);

  var form = document.getElementById(form_id);
  if (form) {
    form.reset();
  }
}


module.exports = {
  request,
  alertify,
  url,
  api_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
  setToken,
  removeToken,
  isAuthentication,
  clearErrorForm,
  setErrorForm,
  resetForm
}
