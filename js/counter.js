const counters =
    document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    const suffix =
        counter.dataset.suffix || "";

    const duration = 1500;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const currentValue =
            Math.floor(target * progress);

        counter.textContent =
            currentValue + suffix;


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                target + suffix;

        }

    }

    requestAnimationFrame(update);

}


const counterObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(
                    entry.target
                );

            }

        });

    }, {
        threshold:0.5
    });


counters.forEach(counter => {

    counterObserver.observe(counter);

});