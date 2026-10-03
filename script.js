/* =========================================================
   ELEMENTS
========================================================= */

const mailOpening =
    document.getElementById("home");

const invitation =
    document.getElementById("invitation");

const claimButton =
    document.getElementById("claimButton");

const claimedMessage =
    document.getElementById("claimedMessage");

const openInvitation =
    document.getElementById("openInvitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


/* =========================================================
   MUSIC
========================================================= */

let musicStarted = false;


/*
    Browsers normally block autoplay.

    Music therefore starts when the visitor
    interacts with the invitation.
*/

function startMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.volume = 0.45;

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch(() => {

                musicStarted = false;

            });

    }

}


function toggleMusic() {

    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {

        backgroundMusic.play()
            .then(() => {

                musicStarted = true;

                musicButton.textContent = "♫";

            })
            .catch(() => {});

    } else {

        backgroundMusic.pause();

        musicStarted = false;

        musicButton.textContent = "🔇";

    }

}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   CLAIM MAIL
========================================================= */

let mailClaimed = false;


if (claimButton) {

    claimButton.addEventListener(
        "click",
        function () {

            /*
                Prevent multiple clicks from restarting
                the animation.
            */

            if (mailClaimed) return;

            mailClaimed = true;


            /*
                Start the music after user interaction.
            */

            startMusic();


            /*
                Begin envelope animation.
            */

            mailOpening.classList.add(
                "claiming"
            );


            /*
                Hide claim button.
            */

            claimButton.style.pointerEvents =
                "none";

            claimButton.style.opacity =
                "0";

            claimButton.style.transform =
                "translateY(15px)";


            setTimeout(() => {

                claimButton.style.display =
                    "none";

            }, 1000);


            /*
                Wait until the envelope has emerged,
                opened and revealed the invitation.
            */

            setTimeout(() => {

                mailOpening.classList.add(
                    "claimed"
                );

                createSparkleBurst();

            }, 4200);

        }
    );

}


/* =========================================================
   SPARKLE EFFECT
========================================================= */

function createSparkleBurst() {

    const sparkleCount = 18;

    for (
        let i = 0;
        i < sparkleCount;
        i++
    ) {

        const sparkle =
            document.createElement("span");

        sparkle.textContent =
            i % 2 === 0
                ? "✦"
                : "❀";

        sparkle.style.position =
            "fixed";

        sparkle.style.left =
            "50%";

        sparkle.style.top =
            "48%";

        sparkle.style.zIndex =
            "300";

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.color =
            i % 2 === 0
                ? "#C87D87"
                : "#6B7556";

        sparkle.style.fontSize =
            `${10 + Math.random() * 12}px`;

        document.body.appendChild(
            sparkle
        );


        const angle =
            (Math.PI * 2 * i) /
            sparkleCount;

        const distance =
            80 +
            Math.random() * 130;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        sparkle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: .25
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.5)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 +
                    Math.random() * 500,

                easing:
                    "cubic-bezier(.22,.61,.36,1)"
            }
        );


        setTimeout(
            () => sparkle.remove(),
            1800
        );

    }

}


/* =========================================================
   OPEN INVITATION
========================================================= */

if (openInvitation) {

    openInvitation.addEventListener(
        "click",
        function () {

            /*
                Show the actual invitation.
            */

            invitation.classList.add(
                "show"
            );


            /*
                Hide the opening screen.
            */

            mailOpening.style.display =
                "none";


            /*
                Make sure music continues.
            */

            startMusic();


            /*
                Move to the first invitation section.
            */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SCROLL BUTTONS
========================================================= */

document
    .querySelectorAll("[data-scroll]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const targetID =
                    this.dataset.scroll;

                const target =
                    document.getElementById(
                        targetID
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================================
   COUNTDOWN
========================================================= */

const eventDate =
    new Date(
        "October 10, 2026 16:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        eventDate - now;


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if (!days || !hours || !minutes || !seconds) {
        return;
    }


    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;

    }


    const dayValue =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hourValue =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
                24
        );

    const minuteValue =
        Math.floor(
            (difference /
                (1000 * 60)) %
                60
        );

    const secondValue =
        Math.floor(
            (difference /
                1000) %
                60
        );


    days.textContent =
        String(dayValue).padStart(2, "0");

    hours.textContent =
        String(hourValue).padStart(2, "0");

    minutes.textContent =
        String(minuteValue).padStart(2, "0");

    seconds.textContent =
        String(secondValue).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            function () {

                /*
                    If an image has not been replaced yet,
                    keep the layout clean.
                */

                this.style.visibility =
                    "hidden";

            }
        );

    });


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".detail-card, " +
        ".gallery-item, " +
        ".program-item, " +
        ".attire-swatch, " +
        ".story-photo, " +
        ".story-text"
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal"
    );

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

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

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element => {
        revealObserver.observe(
            element
        );
    }
);


/* =========================================================
   PREVENT BROKEN HASH JUMPS
========================================================= */

window.addEventListener(
    "load",
    function () {

        if (
            window.location.hash &&
            !invitation.classList.contains("show")
        ) {

            history.replaceState(
                null,
                "",
                window.location.pathname
            );

        }

    }
);