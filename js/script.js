/* =========================================================
   JOVARYN GAMES
   Official Website JavaScript
========================================================= */

"use strict";


/* =========================
   ELEMENTS
========================= */

const loader = document.getElementById("loader");

const header = document.getElementById("header");

const navLinksContainer =
    document.getElementById("navLinks");

const navLinks =
    document.querySelectorAll(".nav-link");

const menuToggle =
    document.getElementById("menuToggle");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");

const socialMessage =
    document.getElementById("socialMessage");


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 450);

});


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   THEME
========================= */

const savedTheme =
    localStorage.getItem("jovaryn-theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}


function updateThemeIcon() {

    const lightMode =
        document.body.classList.contains(
            "light-theme"
        );


    if (themeIcon) {

        themeIcon.textContent =
            lightMode ? "☾" : "☀";

    }

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "jovaryn-theme",
                lightMode ? "light" : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =========================
   MOBILE MENU
========================= */

function closeMenu() {

    if (!navLinksContainer || !menuToggle) {
        return;
    }


    navLinksContainer.classList.remove(
        "open"
    );

    menuToggle.classList.remove(
        "open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


if (menuToggle && navLinksContainer) {

    menuToggle.addEventListener(
        "click",
        () => {

            const opened =
                navLinksContainer.classList.toggle(
                    "open"
                );


            menuToggle.classList.toggle(
                "open",
                opened
            );


            menuToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );


            document.body.classList.toggle(
                "menu-open",
                opened
            );

        }
    );

}


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (!targetId ||
                    targetId === "#") {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                closeMenu();

            }
        );

    });


/* =========================
   HEADER / PROGRESS
========================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;


    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollTop > 20
        );

    }


    if (backToTop) {

        backToTop.classList.toggle(
            "show",
            scrollTop > 500
        );

    }


    if (scrollProgress) {

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        scrollProgress.style.width =
            `${percentage}%`;

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


handleScroll();


/* =========================
   BACK TO TOP
========================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    let currentSection =
        "home";


    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


updateActiveNavigation();


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );


    if (
        !Number.isFinite(target)
    ) {

        return;

    }


    const duration = 1200;

    const startTime =
        performance.now();


    function updateCounter(time) {

        const elapsed =
            time - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const value =
            Math.floor(
                progress * target
            );


        counter.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


if (
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            counterObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );

} else {

    counters.forEach(
        animateCounter
    );

}


/* =========================
   CARD MOUSE EFFECT
========================= */

const interactiveCards =
    document.querySelectorAll(
        ".game-card, .addon-card, .tech-card"
    );


const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    );


if (finePointer.matches) {

    interactiveCards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            (x / rect.width) -
                            0.5
                        ) * 2;


                    const rotateX =
                        (
                            0.5 -
                            (y / rect.height)
                        ) * 2;


                    card.style.transform =
                        `translateY(-6px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================
   SOCIAL PLACEHOLDERS
========================= */

document
    .querySelectorAll(
        ".social-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.name ||
                    "Social";


                if (socialMessage) {

                    socialMessage.textContent =
                        `${service} link coming later.`;


                    setTimeout(
                        () => {

                            socialMessage.textContent =
                                "";

                        },
                        2500
                    );

                }

            }
        );

    });


/* =========================
   RESIZE SAFETY
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            closeMenu();

        }

    }
);


/* =========================
   CONSOLE
========================= */

console.log(
    "JOVARYN GAMES"
);

console.log(
    "Version 1.0 — Create. Play. Go Beyond."
);