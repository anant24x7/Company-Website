const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-menu a").forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});

document.querySelectorAll(".faq-question")
    .forEach(question => {

        question.addEventListener("click", () => {

            const faqItem =
                question.closest(".faq-item");

            faqItem.classList.toggle("active");

        });

    });

    const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold:0.15
    });

revealElements.forEach(element => {
    revealObserver.observe(element);
});