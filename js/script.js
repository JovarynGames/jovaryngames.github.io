/* =========================================================
   JOVARYN GAMES
   Official Studio Website
   Version 1.0
========================================================= */

"use strict";


/* =========================
   ELEMENTS
========================= */

const body =
    document.body;

const loader =
    document.getElementById("loader");

const header =
    document.getElementById("header");

const scrollProgress =
    document.getElementById("scrollProgress");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

const navLinkItems =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll(".section");

const backToTop =
    document.getElementById("backToTop");

const revealElements =
    document.querySelectorAll(".reveal");

const counters =
    document.querySelectorAll(".counter");

const currentYear =
    document.getElementById("currentYear");

const socialButtons =
    document.querySelectorAll(".social-button");

const socialMessage =
    document.getElementById("socialMessage");


/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 550);

});


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   THEME SYSTEM
========================= */

const savedTheme =
    localStorage.getItem(
        "jovaryn-theme"
    );


function setTheme(theme) {

    if (theme === "light") {

        body.classList.add(
            "light-theme"
        );

        themeIcon.textContent =
            "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );

    } else {

        body.classList.remove(
            "light-theme"
        );

        themeIcon.textContent =
            "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );

    }

}


if (savedTheme === "light") {

    setTheme("light");

} else {

    setTheme("dark");

}


themeToggle.addEventListener(
    "click",
    () => {

        const isLight =
            body.classList.contains(
                "light-theme"
            );


        if (isLight) {

            setTheme("dark");

            localStorage.setItem(
                "jovaryn-theme",
                "dark"
            );

        } else {

            setTheme("light");

            localStorage.setItem(
                "jovaryn-theme",
                "light"
            );

        }

    }
);


/* =========================
   MOBILE MENU
========================= */

function openMenu() {

    navLinks.classList.add(
        "open"
    );

    menuToggle.classList.add(
        "open"
    );

    body.classList.add(
        "menu-open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMenu() {

    navLinks.classList.remove(
        "open"
    );

    menuToggle.classList.remove(
        "open"
    );

    body.classList.remove(
        "menu-open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuToggle.addEventListener(
    "click",
    () => {

        const menuOpen =
            navLinks.classList.contains(
                "open"
            );


        if (menuOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }
);


navLinkItems.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 760) {

            closeMenu();

        }

    }
);


/* =========================
   ESCAPE CLOSES MENU
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains(
                "open"
            )
        ) {

            closeMenu();

            menuToggle.focus();

        }

    }
);


/* =========================
   SMOOTH SCROLLING
========================= */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {

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

        }
    );

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

function updateHeader() {

    if (window.scrollY > 30) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


/* =========================
   SCROLL PROGRESS
========================= */

function updateProgress() {

    const maximumScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (maximumScroll <= 0) {

        scrollProgress.style.width =
            "0%";

        return;

    }


    const percentage =
        (
            window.scrollY /
            maximumScroll
        ) * 100;


    scrollProgress.style.width =
        `${Math.min(
            percentage,
            100
        )}%`;

}


/* =========================
   BACK TO TOP
========================= */

function updateBackToTop() {

    if (window.scrollY > 550) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

function updateNavigation() {

    const position =
        window.scrollY + 160;


    let currentSection =
        "home";


    sections.forEach((section) => {

        const top =
            section.offsetTop;

        const bottom =
            top +
            section.offsetHeight;


        if (
            position >= top &&
            position < bottom
        ) {

            currentSection =
                section.id;

        }

    });


    navLinkItems.forEach((link) => {

        link.classList.remove(
            "active"
        );


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================
   MAIN SCROLL EVENT
========================= */

function handleScroll() {

    updateHeader();

    updateProgress();

    updateBackToTop();

    updateNavigation();

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


handleScroll();


/* =========================
   REVEAL ANIMATIONS
========================= */

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {

                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================
   ANIMATED COUNTERS
========================= */

let countersStarted =
    false;


function animateCounter(element) {

    const target =
        Number(
            element.dataset.target
        );


    if (
        !Number.isFinite(target)
    ) {

        return;

    }


    const duration =
        1300;


    const startTime =
        performance.now();


    function update(time) {

        const elapsed =
            time -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        element.textContent =
            Math.floor(
                target *
                eased
            );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting &&
                            !countersStarted
                        ) {

                            countersStarted =
                                true;


                            counters.forEach(
                                (counter) => {

                                    animateCounter(
                                        counter
                                    );

                                }
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.3
            }

        );


    counterObserver.observe(
        statsSection
    );

} else {

    counters.forEach(
        (counter) => {

            counter.textContent =
                counter.dataset.target;

        }
    );

}


/* =========================
   GAME CARD EFFECT
========================= */

const gameCards =
    document.querySelectorAll(
        ".game-card"
    );


gameCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth <=
                760
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const middleX =
                rect.left +
                rect.width / 2;


            const middleY =
                rect.top +
                rect.height / 2;


            const rotateX =
                (
                    event.clientY -
                    middleY
                ) / 50;


            const rotateY =
                (
                    middleX -
                    event.clientX
                ) / 50;


            card.style.transform =
                `
                translateY(-8px)
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================
   SOCIAL PLACEHOLDERS
========================= */

let socialTimeout;


socialButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;


            socialMessage.textContent =
                `${name} link coming later.`;


            clearTimeout(
                socialTimeout
            );


            socialTimeout =
                setTimeout(
                    () => {

                        socialMessage.textContent =
                            "";

                    },
                    2200
                );

        }
    );

});


/* =========================
   CONSOLE
========================= */

console.log(
    "%cJOVARYN GAMES",
    "font-size:20px;font-weight:bold;color:#7cff4f;"
);


console.log(
    "Version 1.0 — Create. Play. Go Beyond."
);