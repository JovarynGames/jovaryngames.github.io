"use strict";


/* =========================================================
   JOVARYN GAMES
   WEBSITE VERSION 2.1
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loader =
    document.getElementById("loader");

const header =
    document.getElementById("header");

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

const lastUpdated =
    document.getElementById("lastUpdated");

const siteToast =
    document.getElementById("siteToast");


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        window.setTimeout(
            () => {

                if (loader) {
                    loader.classList.add("hidden");
                }

            },
            350
        );

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   LAST UPDATED
========================================================= */

if (lastUpdated) {

    const modified =
        new Date(document.lastModified);


    if (
        Number.isNaN(
            modified.getTime()
        )
    ) {

        lastUpdated.textContent =
            "Version 2.1";

    } else {

        lastUpdated.textContent =
            modified.toLocaleDateString(
                undefined,
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }

}


/* =========================================================
   THEME
========================================================= */

function getSavedTheme() {

    try {

        return localStorage.getItem(
            "jovaryn-theme"
        );

    } catch (error) {

        return null;

    }

}


function saveTheme(theme) {

    try {

        localStorage.setItem(
            "jovaryn-theme",
            theme
        );

    } catch (error) {

        /* Local storage unavailable */

    }

}


const savedTheme =
    getSavedTheme();


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}


function updateThemeIcon() {

    if (!themeIcon) {
        return;
    }


    const light =
        document.body.classList.contains(
            "light-theme"
        );


    themeIcon.textContent =
        light
            ? "☾"
            : "☀";

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const light =
                document.body.classList.contains(
                    "light-theme"
                );


            saveTheme(
                light
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    if (navLinksContainer) {

        navLinksContainer.classList.remove(
            "open"
        );

    }


    if (menuToggle) {

        menuToggle.classList.remove(
            "open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.classList.remove(
        "menu-open"
    );

}


if (
    menuToggle &&
    navLinksContainer
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const open =
                navLinksContainer.classList.toggle(
                    "open"
                );


            menuToggle.classList.toggle(
                "open",
                open
            );


            menuToggle.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );


            document.body.classList.toggle(
                "menu-open",
                open
            );

        }
    );

}


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]:not(.placeholder-link):not(.disabled-link)'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    let target;


                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        return;

                    }


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

        }
    );


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    if (!siteToast) {
        return;
    }


    clearTimeout(
        toastTimer
    );


    siteToast.textContent =
        message;


    siteToast.classList.add(
        "show"
    );


    toastTimer =
        window.setTimeout(
            () => {

                siteToast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


document
    .querySelectorAll(
        ".placeholder-link, .disabled-link"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    showToast(
                        link.dataset.message ||
                        "This feature is planned for a future update."
                    );

                }
            );

        }
    );


/* =========================================================
   SCROLL HANDLING
========================================================= */

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

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;


        scrollProgress.style.width =
            `${Math.min(progress, 100)}%`;

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


handleScroll();


/* =========================================================
   BACK TO TOP
========================================================= */

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


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    let currentSection =
        "home";


    pageSections.forEach(
        section => {

            const sectionTop =
                section.offsetTop - 170;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const target =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                target ===
                `#${currentSection}`
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =========================================================
   REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    reducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


function animateCounter(counter) {

    if (
        counter.dataset.animated ===
        "true"
    ) {
        return;
    }


    counter.dataset.animated =
        "true";


    const target =
        Number(
            counter.dataset.target
        );


    if (!Number.isFinite(target)) {
        return;
    }


    if (reducedMotion) {

        counter.textContent =
            target;

        return;
    }


    const duration =
        900;


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


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                target *
                easedProgress
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
    counters.length > 0 &&
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


                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.4
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
        counter => {

            animateCounter(
                counter
            );

        }
    );

}


/* =========================================================
   CARD TILT
========================================================= */

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


const tiltCards =
    document.querySelectorAll(
        ".official-project-card, .learning-card"
    );


if (
    finePointer &&
    !reducedMotion
) {

    tiltCards.forEach(
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


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            x -
                            centerX
                        ) / 45;


                    const rotateX =
                        -(
                            y -
                            centerY
                        ) / 45;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

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


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(
        link => {

            if (
                !link.hasAttribute(
                    "rel"
                )
            ) {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        }
    );


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            760
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   VERSION INFORMATION
========================================================= */

console.log(
    "JOVARYN GAMES"
);

console.log(
    "Website Version 2.1"
);

console.log(
    "Project Polaris — Release Candidate 1"
);

console.log(
    "Create. Play. Go Beyond."
);