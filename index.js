(() => {
  "use strict";

  // Selecting elemnts
  const form = document.querySelector("#registration");
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const phone = document.querySelector("#phone");
  const email = document.querySelector("#email");
  const batch = document.querySelector("#batch");
  const module = document.querySelector("#module");
  const tnc = document.querySelector("#tnc");
  const batchOptions = document.querySelector("#batch");
  const moduleOptions = document.querySelector("#module");

  let batches = [1, 2, 3];
  let modules = [5, 6, 7];

  // Adding options in select elements
  batchOptions.innerHTML += batches.map(
    (b) => `<option value=${b}>${b}</option>`
  );
  moduleOptions.innerHTML += modules.map(
    (b) => `<option value=${b}>${b}</option>`
  );

  // Function to make styling for invalid inputs
  function addInvalidClass(element, message) {
    element.classList.add("is-invalid");
    if (element.type == "checkbox")
      element.nextElementSibling.nextElementSibling.innerHTML = message;
    else element.nextElementSibling.innerHTML = message;
  }
  // Function to make styling for valid inputs
  function addValidClass(element) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  }

  // Function to validate text in a name fields
  function validateName(element, fieldName = "text") {
    // console.log(element.value.length);
    if (!element.value.length) {
      addInvalidClass(element, `Please enter a valid ${fieldName}`);
    } else if (element.value.length && !element.value.match(/^[A-Za-z]+$/)) {
      addInvalidClass(element, "Only letters are allowed");
    } else if (
      element.value.match(/^[A-Za-z]+$/) &&
      element.value.length > 0 &&
      element.value.length < 3
    ) {
      addInvalidClass(element, "Enter minimun 3 letters");
    } else {
      addValidClass(element);
      return true;
    }
  }

  // Function to validate the contact field
  function validateContact(element, fieldName = "number") {
    if (!element.value.length) {
      addInvalidClass(element, `Please provide a valid ${fieldName}`);
    } else if (element.value.length && !element.value.match(/^[0-9]+$/)) {
      addInvalidClass(element, "Only digits are allowed");
    } else if (
      element.value.match(/^[0-9]+$/) &&
      element.value.length > 0 &&
      element.value.length < 10
    ) {
      addInvalidClass(element, `Please enter a valid ${fieldName}`);
    } else if (element.value.length == 10) {
      addValidClass(element);
      return true;
    }
  }

  // Function to validate email address field
  function validateEmail(element, fieldName = "email") {
    if (
      element.value.length &&
      element.value.includes("@") &&
      element.value.includes(".") &&
      element.value.lastIndexOf(".") <= element.value.length - 3 &&
      element.value.indexOf("@") !== 0
    ) {
      addValidClass(element);
      return true;
    } else {
      addInvalidClass(element, `Please enter a valid ${fieldName}`);
    }
  }

  // Function to validate select element in form
  function validateSelect(element, fieldName = "option") {
    if (!element.value) {
      addInvalidClass(element, `Please select a valid ${fieldName}`);
    } else {
      addValidClass(element);
      return true;
    }
  }

  // Function to validate checkbox
  function validateCheckbox(element, message = "") {
    if (!element.checked) {
      addInvalidClass(element, message);
    } else {
      addValidClass(element);
      return true;
    }
  }

  // Function to call the validation on all elements
  function validateForm() {
    var ivFirstName, ivLastName, ivPhone, ivEmail, ivBatch, ivModule, ivTnc;
    ivFirstName = validateName(firstName, "first name");
    ivLastName = validateName(lastName, "last name");
    ivPhone = validateContact(phone, "phone number");
    ivEmail = validateEmail(email);
    ivBatch = validateSelect(batch, "Batch No.");
    ivModule = validateSelect(module, "Module No");
    ivTnc = validateCheckbox(tnc, "You must agree before submitting.");
    return (
      ivFirstName &&
      ivLastName &&
      ivPhone &&
      ivEmail &&
      ivBatch &&
      ivModule &&
      ivTnc
    );
  }

  // Function to remove style classes
  function resetFields(elements) {
    elements.forEach(function (element) {
      element.classList.remove("is-invalid");
      element.classList.remove("is-valid");
    });
  }

  // Function to reset form
  function formReset(form) {
    form.reset();
    resetFields([firstName, lastName, email, phone, batch, module, tnc]);
  }

  // Event listener to detect the changes in form
  form.addEventListener("change", (e) => {
    validateForm();
  });

  // Event listener to detect submit event and display successful message
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Your details  have been saved successfully!");
      formReset(form);
    }
  });
})();
