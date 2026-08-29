const API =
    "http://127.0.0.1:3000/api";


const loginForm =
    document.getElementById(
        "adminLoginForm"
    );


loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "adminEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "adminPassword"
            ).value;


        const loginMessage =
            document.getElementById(
                "loginMessage"
            );


        loginMessage.textContent = "";


        try {

            const response =
                await fetch(
                    `${API}/auth/login`,
                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                email,
                                password
                            })

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message
                    || "Login failed."
                );

            }


            localStorage.setItem(
                "adminToken",
                result.token
            );

            localStorage.setItem(
                "adminToken",
                result.token
            );


            localStorage.setItem(
                "adminUser",
                JSON.stringify(
                    result.admin
                )
            );


            window.location.href =
                "dashboard.html";


        } catch (error) {

            loginMessage.textContent =
                error.message;

        }

    }
);