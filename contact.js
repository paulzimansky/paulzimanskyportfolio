// ============================================
// KONTAKTFORMULAR – Validierung & UX
// ============================================
(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const btn = document.getElementById('submit-btn');

    // Service aus URL-Parameter vorausfüllen
    const labels = {
        'portrait': 'Portraitfotografie',
        'paar-familie': 'Paar- und Familienfotografie',
        'engagement': 'Menschen, die etwas bewegen',
        'mini-portrait': 'Mini-Portrait',
        'projekt': 'Individuelle Projekte'
    };
    const svc = new URLSearchParams(location.search).get('service');
    if (svc) {
        const field = document.getElementById('service');
        const row = document.getElementById('service-row');
        if (field && row) {
            field.value = labels[svc] || svc.charAt(0).toUpperCase() + svc.slice(1);
            row.style.display = '';
            // Betreff vorausfüllen
            const subj = form.elements.subject;
            if (subj && !subj.value) subj.value = 'Anfrage: ' + field.value;
        }
    }

    const messages = {
        name: 'Bitte gib deinen Namen ein.',
        email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
        subject: 'Bitte gib einen Betreff ein.',
        message: 'Bitte schreib mir eine kurze Nachricht.',
        privacy: 'Bitte bestätige die Datenschutzerklärung.'
    };

    function showError(name, msg) {
        const span = form.querySelector(`.form-error[data-for="${name}"]`);
        if (span) span.textContent = msg || '';
    }

    function validate() {
        let ok = true;
        ['name', 'subject', 'message'].forEach(n => {
            const f = form.elements[n];
            if (!f.value.trim()) { showError(n, messages[n]); ok = false; }
            else showError(n, '');
        });
        const email = form.elements.email;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError('email', messages.email); ok = false;
        } else showError('email', '');

        const priv = form.elements.privacy;
        if (!priv.checked) { showError('privacy', messages.privacy); ok = false; }
        else showError('privacy', '');

        return ok;
    }

    // Live-Feedback beim Verlassen eines Feldes
    form.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('blur', validate);
    });

    form.addEventListener('submit', function (e) {
        if (!validate()) {
            e.preventDefault();
            const firstErr = form.querySelector('.form-error:not(:empty)');
            if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        // Validierung ok -> Netlify übernimmt den Versand
        btn.disabled = true;
        btn.textContent = 'Wird gesendet…';
    });
})();
