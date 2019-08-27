'use strict';

// Код валидации формы
function validateForm(formSettings) {
  var form = document.getElementById(formSettings.formId);
  form.addEventListener('blur', function validateInput(event) {
    var validatingInput = event.target;
    if (validatingInput.tagName === "INPUT") {
      if (validatingInput.dataset.required !== undefined) {
        if (validatingInput.value === "") {
            validatingInput.classList.add(formSettings.inputErrorClass);
            return;
          }
        else if (validatingInput.classList.contains(formSettings.inputErrorClass)) {
            validatingInput.classList.remove(formSettings.inputErrorClass);
        }
      }
      if (validatingInput.dataset.validator !== undefined) {
        if (validatingInput.dataset.validator === "letters") {
          if (!/^[a-zA-Zа-яА-яеё]+$/.test(validatingInput.value)) {
            validatingInput.classList.add(formSettings.inputErrorClass);
          }
          else if (validatingInput.classList.contains(formSettings.inputErrorClass)) {
              validatingInput.classList.remove(formSettings.inputErrorClass);
          }
        }
        if (validatingInput.dataset.validator === "number") {
          if (validatingInput.value !== "" &&
          (Number(validatingInput.value) < Number(validatingInput.dataset.validatorMin) ||
          Number(validatingInput.value) > Number(validatingInput.dataset.validatorMax) ||
          !/^-?\d*$/.test(validatingInput.value))) {
            validatingInput.classList.add(formSettings.inputErrorClass);
          }
          else if (validatingInput.classList.contains(formSettings.inputErrorClass)) {
              validatingInput.classList.remove(formSettings.inputErrorClass);
          }
        }
        if (validatingInput.dataset.validator === "regexp") {
          if (validatingInput.value !== "" &&
              !RegExp(validatingInput.dataset.validatorPattern).test(validatingInput.value)) {
              validatingInput.classList.add(formSettings.inputErrorClass);
          }
          else if (validatingInput.classList.contains(formSettings.inputErrorClass)) {
              validatingInput.classList.remove(formSettings.inputErrorClass);
          }
        }
      }
    }
  }, true);

  form.addEventListener('submit', function validateFormChecker(event) {
    var isValid = true;
    event.preventDefault();
    var childrenArray = Array.from(this.children);
    childrenArray.forEach(function(child) {
      if (child.tagName === "INPUT") {
        child.focus();
        child.blur();
      }
    });
    childrenArray.forEach(function(child, i, childrenArray) {
        if (child.classList.contains(formSettings.inputErrorClass)) {
          if (event.currentTarget.classList.contains(formSettings.formValidClass)) event.currentTarget.classList.remove(formSettings.formValidClass);
          event.currentTarget.classList.add(formSettings.formInvalidClass);
          isValid = false;
          i = childrenArray.length - 1;
        }
      });
  if (isValid === true) {
    this.classList.remove(formSettings.formInvalidClass);
    this.classList.add(formSettings.formValidClass);
  }
 });
}
