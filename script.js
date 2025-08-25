/* script.js - Portfolio interactions & animations */

/* -------------------------------
   Utility: Smooth Scroll
--------------------------------*/
function smoothScrollTo(target) {
    document.querySelector(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* -------------------------------
   Navbar Toggle (Mobile)
--------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => links.classList.toggle('open'));

    /* Dynamic Year */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* -------------------------------
       Project View Buttons
    --------------------------------*/
    const viewButtons = document.querySelectorAll(".project-card .btn");
    viewButtons.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = `#project-detail-${index + 1}`;
            const detail = document.querySelector(targetId);

            if (detail) {
                detail.classList.add("active"); // reveal
                smoothScrollTo(targetId);
            }
        });
    });

    /* -------------------------------
       Scroll Animations (Apple-like)
    --------------------------------*/
    const animatedEls = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, { threshold: 0.2 });

    animatedEls.forEach(el => observer.observe(el));

    /* -------------------------------
       Sticky Storytelling Sections
    --------------------------------*/
    const storySections = document.querySelectorAll(".project-detail");
    storySections.forEach((section) => {
        const inner = section.querySelector(".story-inner");
        if (!inner) return;

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    inner.classList.add("in-view");
                } else {
                    inner.classList.remove("in-view");
                }
            });
        }, { threshold: 0.5 });

        io.observe(section);
    }); // ✅ properly closed
});

/* Back-to-Top Button */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
