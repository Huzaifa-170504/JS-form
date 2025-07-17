var fields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "text", required: true },
  { name: "phoneNumber", label: "Phone Number", type: "text", required: true },
  { name: "status", label: "Status", type: "checkbox", required: true },
  { name: "gender", label: "Gender", type: "radio", required: true, options: ["Male", "Female"] },
  { name: "websiteURL", label: "Website URL", type: "text", required: false }
];

var container = document.getElementById("form_container");
var form = document.createElement("form");

for (var i = 0; i < fields.length; i++) {
  var field = fields[i];

  var div = document.createElement("div");
  div.className = "form-group";

  var label = document.createElement("label");
  label.innerText = field.label;
  div.appendChild(label);

  if (field.type === "radio") {
    for (var j = 0; j < field.options.length; j++) {
      var option = field.options[j];

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = field.name;
      radio.value = option;

      var radioLabel = document.createElement("label");
      radioLabel.innerText = option;

      div.appendChild(radio);
      div.appendChild(radioLabel);
    }
  } else {
    var input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;
    input.placeholder = field.label;
    div.appendChild(input);
  }

  var error = document.createElement("div");
  error.className = "error";
  error.id = field.name + "-error";
  div.appendChild(error);

  form.appendChild(div);
}

var button = document.createElement("button");
button.type = "submit";
button.innerText = "Submit";
form.appendChild(button);

container.appendChild(form);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var allOk = true;

  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    var errorDiv = document.getElementById(f.name + "-error");
    errorDiv.innerText = "";

    var value;

    if (f.type === "radio") {
      var radios = document.getElementsByName(f.name);
      var checked = false;
      for (var k = 0; k < radios.length; k++) {
        if (radios[k].checked) {
          value = radios[k].value;
          checked = true;
          break;
        }
      }
      if (f.required && !checked) {
        errorDiv.innerText = f.label + " is required";
        allOk = false;
      }
    } else if (f.type === "checkbox") {
      var input = form.elements[f.name];
      if (f.required && !input.checked) {
        errorDiv.innerText = f.label + " is required";
        allOk = false;
      }
    } else {
      value = form.elements[f.name].value.trim();
      if (f.required && value === "") {
        errorDiv.innerText = f.label + " is required";
        allOk = false;
      }
    }

    if (f.name === "email" && value !== "") {
      if (value.indexOf("@") === -1) {
        errorDiv.innerText = "Invalid email";
        allOk = false;
      }
    }

    if (f.name === "phoneNumber" && value !== "") {
      if (value.length < 10) {
        errorDiv.innerText = "Invalid phone number";
        allOk = false;
      }
    }

    if (f.name === "websiteURL" && value !== "") {
      if (!(value.startsWith("http://") || value.startsWith("https://"))) {
        errorDiv.innerText = "Invalid URL";
        allOk = false;
      }
    }
  }

  if (allOk) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

