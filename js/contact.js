const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const service = document.getElementById("service");
        const message = document.getElementById("message");
        const successMessage = document.getElementById("formSuccess");

        let isValid = true;


        if (name.value.trim().length < 2) {

            showError(
                name,
                "Please enter your full name."
            );

            isValid = false;
        }


        if (!validateEmail(email.value.trim())) {

            showError(
                email,
                "Please enter a valid email address."
            );

            isValid = false;
        }


        const cleanPhone = phone.value.replace(/\D/g, "");

        if (cleanPhone.length < 10) {

            showError(
                phone,
                "Please enter a valid mobile number."
            );

            isValid = false;
        }


        if (service.value === "") {

            showError(
                service,
                "Please select a service."
            );

            isValid = false;
        }


        if (message.value.trim().length < 10) {

            showError(
                message,
                "Please provide a little more detail about your requirement."
            );

            isValid = false;
        }


        if (isValid) {

            successMessage.textContent =
                "Thank you. Your enquiry has been validated successfully.";

            /*
                IMPORTANT:
                We are NOT sending the form anywhere yet.

                In the next backend lesson, we will replace
                this section with a real API request.
            */

            contactForm.reset();
        }

    });

}


function showError(field, message) {

    const formGroup = field.closest(".form-group");

    formGroup.classList.add("error");

    const errorElement =
        formGroup.querySelector(".error-message");

    if (errorElement) {
        errorElement.textContent = message;
    }

}


function clearErrors() {

    const groups =
        document.querySelectorAll(".form-group");

    groups.forEach(group => {

        group.classList.remove("error");

        const message =
            group.querySelector(".error-message");

        if (message) {
            message.textContent = "";
        }

    });

    const success =
        document.getElementById("formSuccess");

    if (success) {
        success.textContent = "";
    }

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}