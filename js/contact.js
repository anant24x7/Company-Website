document.addEventListener("DOMContentLoaded", function () {

    console.log("STEP 1: contact.js loaded successfully");

    const contactForm = 
        document.getElementById("contactForm");

    const successMessage = 
        document.getElementById("formSuccess");

    console.log(
        "STEP 2: Contact form found:",
         contactForm
        );

    
    if (!contactForm) {
        return;
    }


    contactForm.addEventListener("submit", async function (event) {

        console.log("STEP 3: Submit button clicked");
        

        // Prevent normal form submission
        event.preventDefault();

        // Clear old errors
        clearErrors();


        // Get form fields
        const name = document.getElementById("name");
        const company = document.getElementById("company");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const service = document.getElementById("service");
        const message = document.getElementById("message");

        const successMessage =
            document.getElementById("formSuccess");


        // Start by assuming form is valid
        let isValid = true;


        /* =====================================
           NAME VALIDATION
        ===================================== */

        if (name.value.trim().length < 2) {

            showError(
                name,
                "Please enter your full name."
            );

            isValid = false;
        }


        /* =====================================
           EMAIL VALIDATION
        ===================================== */

        if (!validateEmail(email.value.trim())) {

            showError(
                email,
                "Please enter a valid email address."
            );

            isValid = false;
        }


        /* =====================================
           PHONE VALIDATION
        ===================================== */

        const cleanPhone =
            phone.value.replace(/\D/g, "");

        if (cleanPhone.length < 10) {

            showError(
                phone,
                "Please enter a valid mobile number."
            );

            isValid = false;
        }


        /* =====================================
           SERVICE VALIDATION
        ===================================== */

        if (service.value === "") {

            showError(
                service,
                "Please select a service."
            );

            isValid = false;
        }


        /* =====================================
           MESSAGE VALIDATION
        ===================================== */

        if (message.value.trim().length < 10) {

            showError(
                message,
                "Please provide more details about your requirement."
            );

            isValid = false;
        }


        /* =====================================
           STOP IF VALIDATION FAILED
        ===================================== */

        if (!isValid) {
            return;
        }


        /* =====================================
           FORM IS VALID
           SEND DATA TO NODE.JS API
        ===================================== */

        const submitButton =
            contactForm.querySelector(".submit-btn");


        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


        const formData = {

            name: name.value.trim(),

            company: company
                ? company.value.trim()
                : "",

            email: email.value.trim(),

            phone: phone.value.trim(),

            service: service.value,

            message: message.value.trim()

        };


        try {

            const response = await fetch(
                "http://127.0.0.1:3000/api/enquiries",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to submit enquiry."
                );
            }


            /* SUCCESS */

            successMessage.style.color = "#15803D";

            successMessage.textContent =
                result.message ||
                "Thank you. Your enquiry has been submitted successfully.";


            contactForm.reset();


        } catch (error) {

            /* ERROR */

            console.error(
                "Form submission error:",
                error
            );


            successMessage.style.color = "#DC2626";

            successMessage.textContent =
                "Unable to submit your enquiry. Please try again.";

        } finally {

            /* Restore button */

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Request Free Consultation';

        }

    });


    /* =====================================
       SHOW ERROR
    ===================================== */

    function showError(field, message) {

        const formGroup =
            field.closest(".form-group");


        if (!formGroup) {
            return;
        }


        formGroup.classList.add("error");


        const errorElement =
            formGroup.querySelector(".error-message");


        if (errorElement) {

            errorElement.textContent =
                message;
        }

    }


    /* =====================================
       CLEAR OLD ERRORS
    ===================================== */

function clearErrors() {

    const groups =
        contactForm.querySelectorAll(".form-group");

    groups.forEach(function (group) {

        group.classList.remove("error");

        const errorMessage =
            group.querySelector(".error-message");

        if (errorMessage) {
            errorMessage.textContent = "";
        }

    });

    if (successMessage) {
        successMessage.textContent = "";
    }

}

    /* =====================================
       EMAIL VALIDATION
    ===================================== */

    function validateEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return emailPattern.test(email);

    }

});