const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = Number(counter.dataset.target);

    let current = 0;

    const increment = target / 100;

    const updateCounter = () => {

        current += increment;

        if(current < target){

            counter.innerText = Math.ceil(current);

            requestAnimationFrame(updateCounter);

        }else{

            counter.innerText = target + "+";

        }

    };

    updateCounter();

});