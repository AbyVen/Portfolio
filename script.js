document.addEventListener('DOMContentLoaded', () => {
    /* ====== Constants ====== */
    const themeKey = 'theme';
    const yearEl = document.getElementById('year');
    const toggle = document.getElementById('darkModeToggle');
    const modal = document.getElementById('resumeModal');
    const resumeBtn = document.getElementById('resumeBtn');
    const closeBtn = document.getElementById('closeResume');

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
    const openModal = () => {
        modal.hidden = false;
        modal.focus();
    };
    const closeModal = () => {
        modal.hidden = true;
        resumeBtn.focus();
    };

    resumeBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    /* ====== Fade-up Animation ====== */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Unobserve after animation
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
});
