/* =========================================================
   AUTOMOTIVE CONCEPT
   INTERACTION ENGINE
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("loaded");
    }, 1900);

});


/* =========================================================
   NAVIGATION
========================================================= */

const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");

const mobileLinks =
    document.querySelectorAll(".mobile-nav-links a");


menuToggle.addEventListener("click", () => {

    mobileNav.classList.toggle("open");

    document.body.classList.toggle("locked");

});


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        document.body.classList.remove("locked");

    });

});


/* =========================================================
   LANGUAGE SWITCH
========================================================= */

const languageButton =
    document.getElementById("language");

let currentLanguage = "EN";


languageButton.addEventListener("click", () => {

    currentLanguage =
        currentLanguage === "EN"
            ? "AL"
            : "EN";


    const spans =
        languageButton.querySelectorAll("span");


    spans.forEach(span => {

        span.classList.remove("active");

    });


    spans[currentLanguage === "EN" ? 0 : 1]
        .classList.add("active");


    /*
        Prototype behavior only.

        When real client information is added,
        this can be connected to a complete
        translation dictionary.
    */

});


/* =========================================================
   SMOOTH ANCHOR NAVIGATION
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const id =
                link.getAttribute("href");

            if (id === "#") return;

            const target =
                document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro-main, .section-heading, .vehicle-card, " +
    ".experience-heading, .experience-items, " +
    ".number-item, .about-image, .about-content, " +
    ".contact-content"
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity .9s ease, transform .9s cubic-bezier(.77,0,.18,1)";

});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";


                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll("[data-number]");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;


    const numbersSection =
        document.querySelector(".numbers");


    const rect =
        numbersSection.getBoundingClientRect();


    if (rect.top > window.innerHeight * .8)
        return;


    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.number);

        let current = 0;


        const duration = 1300;

        const start =
            performance.now();


        function update(time) {

            const progress =
                Math.min(
                    (time - start) / duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent =
                current;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        }


        requestAnimationFrame(update);

    });

}


window.addEventListener(
    "scroll",
    startCounters
);

startCounters();

/* =========================================================
   VEHICLE HOVER EFFECT
========================================================= */

const vehicleCards = document.querySelectorAll(".vehicle-card");

vehicleCards.forEach((card) => {

    const image = card.querySelector(".vehicle-image");

    if (!image) return;

    card.addEventListener("mousemove", (event) => {

        if (!window.matchMedia("(pointer:fine)").matches) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 1.5;
        const rotateX = ((y - centerY) / centerY) * -1.5;

        image.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.99)`;
    });

    card.addEventListener("mouseleave", () => {

        image.style.transform = "";

    });

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener("scroll", () => {

    if (!heroImage) return;


    const scroll =
        window.scrollY;


    if (scroll < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.07) translateY(${scroll * .08}px)`;

    }

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
    document.querySelectorAll(
        ".contact-button, .button-primary, .text-button"
    );


magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        if (
            !window.matchMedia(
                "(pointer:fine)"
            ).matches
        ) return;


        const rect =
            button.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left -
            rect.width / 2;


        const y =
            event.clientY -
            rect.top -
            rect.height / 2;


        button.style.transform =
            `translate(${x * .08}px, ${y * .08}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c AUTOMOTIVE CONCEPT ",
    "background:#d7ff3f;color:#000;font-size:18px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Beyond driving.",
    "color:#aaa;font-size:12px;"
);
