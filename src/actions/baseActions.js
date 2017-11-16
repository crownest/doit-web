// Packages
const request = require("superagent");
const alertify = require("alertify.js");

// Api
const api_url = "http://127.0.0.1:8000/v1";

// Status Codes
const HTTP_200_OK = 200
const HTTP_201_CREATED = 201
const HTTP_204_NO_CONTENT = 204
const HTTP_400_BAD_REQUEST = 400


function clearErrorForm(data) {
  for (var input_name in data) {
    var input = document.getElementById("id_" + input_name);
    input.classList.remove("has-error");

    var input_feedback = document.getElementById(input_name + "_feedback");
    input_feedback.innerHTML = "";
  }
}

function setErrorForm(response) {
  if (response.body.non_field_errors) {
    alertify.error(response.body.non_field_errors.join("<br>"));
  }

  for (var input_name in response.body) {
    var input = document.getElementById("id_" + input_name);
    input.classList.add("has-error");

    var input_feedback = document.getElementById(input_name + "_feedback");
    var error_message = "<span>" + response.body[input_name].join("<br>") + "</span>";
    input_feedback.innerHTML = error_message;
  }
}

function resetForm(data, form_id) {
  clearErrorForm(data);

  var form = document.getElementById(form_id);
  form.reset();
}


module.exports = {
  request,
  alertify,
  api_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
  clearErrorForm,
  setErrorForm,
  resetForm
}
