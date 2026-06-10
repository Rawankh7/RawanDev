// ─── Language Toggle ──────────────────────────────────────
const langToggle = document.getElementById('lang-toggle');
const html = document.documentElement;

langToggle.addEventListener('click', () => {
    const currentLang = html.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    html.setAttribute('lang', newLang);
    html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    langToggle.innerText = newLang === 'en' ? 'العربية' : 'English';
    document.querySelectorAll('[data-en]').forEach(el => {
        const newText = el.getAttribute(`data-${newLang}`);
        if (newText) el.innerText = newText;
    });
});

// ─── Theme Toggle ─────────────────────────────────────────
document.getElementById('theme-toggle').addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    document.getElementById('theme-toggle').querySelector('.theme-icon').textContent =
        theme === 'dark' ? '🌓' : '☀️';
});

// ─── Mobile Menu ──────────────────────────────────────────
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ─── Modals ───────────────────────────────────────────────
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = (e) => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => {
            if (m.style.display === 'flex') closeModal(m.id);
        });
    }
});

// ─── Scroll Reveal ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings within the same parent container
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.min(index * 80, 320));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Active Nav Highlight ─────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.style.color = 'var(--accent)';
                    link.style.opacity = '1';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));