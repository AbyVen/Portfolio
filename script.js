document.addEventListener('DOMContentLoaded', () => {
    /* ====== Constants ====== */
    const themeKey = 'theme';
    const yearEl = document.getElementById('year');
    const toggle = document.getElementById('darkModeToggle');
    const resumeBtn = document.getElementById('resumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeResume = document.getElementById('closeResume');

    /* ====== Set Current Year ====== */
    yearEl.textContent = new Date().getFullYear();

    /* ====== Theme Handling ====== */
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.setAttribute('aria-pressed', 'true');
            toggle.textContent = 'Light Mode';
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggle.setAttribute('aria-pressed', 'false');
            toggle.textContent = 'Dark Mode';
        }
    };

    // Load saved theme
    applyTheme(localStorage.getItem(themeKey));

    // Toggle theme
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem(themeKey, newTheme);
        applyTheme(newTheme);
    });

    /* ====== Resume Modal ====== */
    resumeBtn.addEventListener('click', () => {
        resumeModal.hidden = false;
        document.body.style.overflow = 'hidden';
    });

    closeResume.addEventListener('click', () => {
        resumeModal.hidden = true;
        document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.hidden = true;
            document.body.style.overflow = '';
        }
    });

    /* ====== Fade-up Animation ====== */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
});

/* ====== Mobile Nav Toggle ====== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.querySelector('.sidebar');
const sidebarNav = document.getElementById('sidebarNav');

if (hamburgerBtn && sidebar && sidebarNav) {
    // Toggle menu open/close
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Auto-close menu when a nav link is clicked
    const navLinks = sidebarNav.querySelectorAll('a, button');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
