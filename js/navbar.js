const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const dropdown =
    document.querySelector(".nav-dropdown");

const dropdownToggle =
    document.querySelector(".dropdown-toggle");


/* ==========================
   MOBILE MENU
========================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");


        const icon =
            menuToggle.querySelector("i");


        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* ==========================
   MOBILE SERVICES DROPDOWN
========================== */

if (dropdown && dropdownToggle) {

    dropdownToggle.addEventListener(
        "click",
        function(event){

            if (window.innerWidth <= 992) {

                event.preventDefault();

                dropdown.classList.toggle("open");

            }

        }
    );

}


/* ==========================
   CLOSE MENU AFTER LINK CLICK
========================== */

document
    .querySelectorAll(".dropdown-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (dropdown) {
                dropdown.classList.remove("open");
            }

        });

    });