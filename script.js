```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const id = this.getAttribute("href");

            if (!id || id === "#") return;

            const section = document.querySelector(id);

            if (section) {
                e.preventDefault();

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ==========================================
       2. NAVBAR SCROLL EFFECT
    ========================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* ==========================================
       3. REALISTIC MOUSE PARALLAX
    ========================================== */

    const dust = document.querySelector(".blue-dust");
    const particles = document.querySelector(".particles");
    const stars = document.querySelector(".stars");

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    });


    function animateBackground() {

        currentX += (mouseX - currentX) * 0.025;
        currentY += (mouseY - currentY) * 0.025;

        if (dust) {
            dust.style.transform =
                `translate(${currentX * 25}px, ${currentY * 25}px)`;
        }

        if (particles) {
            particles.style.transform =
                `translate(${currentX * 12}px, ${currentY * 12}px)`;
        }

        if (stars) {
            stars.style.transform =
                `translate(${currentX * 6}px, ${currentY * 6}px)`;
        }

        requestAnimationFrame(animateBackground);
    }

    animateBackground();


    /* ==========================================
       4. SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".about-card, " +
        ".achievement-card, " +
        ".skill-box, " +
        ".journey-card, " +
        ".interest-cloud, " +
        ".project-box, " +
        ".gallery-card, " +
        ".stat-card, " +
        ".explore-cloud, " +
        ".contact-card"
    );


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.25)}s`;

        element.classList.add("scroll-hidden");

        revealObserver.observe(element);

    });


    /* ==========================================
       5. ACTIVE NAVIGATION
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");


    function updateNavigation() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 220;
            const bottom = top + section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {
                current = section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener("scroll", updateNavigation);

    updateNavigation();


    /* ==========================================
       6. CARD TILT EFFECT
       Subtle — not excessive
    ========================================== */

    const cards = document.querySelectorAll(
        ".achievement-card, " +
        ".gallery-card, " +
        ".stat-card, " +
        ".contact-card"
    );


    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* ==========================================
       7. BUTTON RIPPLE
    ========================================== */

    document.querySelectorAll(
        ".explore-btn, .contact-card"
    ).forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left =
                `${e.clientX - rect.left}px`;

            ripple.style.top =
                `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* ==========================================
       8. BACK TO TOP
    ========================================== */

    const backTop = document.createElement("button");

    backTop.className = "back-top";
    backTop.innerHTML = "↑";
    backTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backTop);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ==========================================
       9. PAGE LOAD
    ========================================== */

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });

});
```