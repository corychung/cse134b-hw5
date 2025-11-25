const nameField = document.getElementById("name");
const errorOutput = document.getElementById("form-error");
const infoOutput = document.getElementById("form-info");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const comments = document.getElementById("comments");
const charCount = document.getElementById("char-count");

const allowedCharsInName = /^[A-Za-z\s'-]+$/;
let errorMsg = "";

// capture the data of each mistake in an array.

const form = document.querySelector("form");
const formErrorsInput = document.getElementById("form-errors");
const formErrors = [];

function log_form_error(field, message) {
    const errorData = {
        field: field.id,
        message: message,
        value: field.value,
        time: new Date().toLocaleTimeString()
    };
    formErrors.push(errorData);
    console.log("Logged", errorData);
}

function show_error(msg) {
    infoOutput.textContent = "";
    infoOutput.style.opacity = 0;
    errorOutput.textContent = msg;
    errorOutput.style.opacity = 1;
}

function flash_error(msg) {
    infoOutput.textContent = "";
    infoOutput.style.opacity = 0;
    errorOutput.textContent = msg;
    errorOutput.style.opacity = 1;
    setTimeout(() => {
        errorOutput.style.opacity = 0;
        nameField.style.backgroundColor = "";
    }, 2200);
}

function show_info(msg) {
    errorOutput.textContent = "";
    errorOutput.style.opacity = 0;
    infoOutput.textContent = msg;
    infoOutput.style.opacity = 1;
}

form.addEventListener("submit", () => {
    formErrorsInput.value = JSON.stringify(formErrors);
});

// add in an improved validation for the fields.

nameField.addEventListener("blur", () => {
    infoOutput.style.opacity = 0;
    if (nameField.validity.tooShort) {
        nameField.setCustomValidity("Enter more than 2 characters.");
        show_error("Name is too short!");
        log_form_error(nameField, "Name too short");
    }
    else if (nameField.validity.valueMissing) {
        nameField.setCustomValidity("You're missing something...");
    }
    else if (!allowedCharsInName.test(nameField.value)) {
        nameField.setCustomValidity("Only letters, spaces, apostrophes, and hyphens allowed!")
    }
    else {
        nameField.setCustomValidity("");
        show_info("Name looks good!");
    }
});

email.addEventListener("blur", () => {
    infoOutput.style.opacity = 0;
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Use the right email format: XX@XX.XX");
        show_error("Incorrect email format!");
        log_form_error(email, "Wrong email format");
    } 
    else if (email.validity.valueMissing) {
        email.setCustomValidity("You're missing something...");
    }
    else {
        email.setCustomValidity("");
        show_info("Email looks good!");
    }
});

subject.addEventListener("blur", () => {
    infoOutput.style.opacity = 0;
    if (subject.validity.tooShort) {
        subject.setCustomValidity("Subject line too short! Minimum 2 characters.");
        show_error("Subject line too short! Minimum 2 characters.");
        log_form_error(subject, "Subject line too short");
    } 
    else if (!/[A-Za-z0-9]/.test(subject.value)) {
        subject.setCustomValidity("Subject must include letters or numbers.");
        show_error("Subject must include letters or numbers.");
        log_form_error(subject, "Subject missing letters/numbers");
    } 
    else if (subject.validity.valueMissing) {
        subject.setCustomValidity("You're missing something...");
    }
    else {
        subject.setCustomValidity("");
        show_info("Subject looks good!");
    }
});

comments.addEventListener("blur", () => {
    infoOutput.style.opacity = 0;
    if (comments.validity.valueMissing) {
        comments.setCustomValidity("You're missing something...");
    }
    else {
        comments.setCustomValidity("");
        show_info("Comments looks good!");
    }
});

// add a masking mechanism for the fields

nameField.addEventListener("input", () => {
    const lastChar = nameField.value.slice(-1); 

    if (!allowedCharsInName.test(lastChar) && lastChar !== "") {
        nameField.style.backgroundColor = "var(--error-color)";
        nameField.setCustomValidity("Only letters, spaces, apostrophes, and hyphens allowed!");
        flash_error("Only letters, spaces, apostrophes, and hyphens allowed!");
        log_form_error(nameField, "Invalid characters in name field");

    }
});

// add a feature that counts down the characters allowed in the comments

comments.addEventListener("input", () => {
    const remaining = comments.maxLength - comments.value.length;
    charCount.textContent = `${remaining} characters remaining`;

    if (remaining <= 50 && remaining > 0) {
        charCount.style.color = "orange";
    } 
    else if (remaining <= 0) {
        charCount.style.color = "red";
        errorOutput.textContent = "No more space in the comments!";
        errorOutput.style.opacity = 1;
    } 
    else {
        charCount.style.color = "";
        errorOutput.style.opacity = 0;
    }
});

