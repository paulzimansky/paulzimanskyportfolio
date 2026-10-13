// ============================================
// PORTFOLIO MODAL – Bild, Ort/Datum und Geschichte
// ============================================
(function () {
    const triggers = document.querySelectorAll('#portfolio-grid .portfolio-trigger');
    const modal = document.getElementById('pfModal');
    if (!triggers.length || !modal) return;

    const img = document.getElementById('pfImage');
    const meta = document.getElementById('pfMeta');
    const story = document.getElementById('pfStory');
    const closeBtn = document.getElementById('pfClose');
    let idx = 0;
    let lastFocus = null;

    function show(i) {
        idx = (i + triggers.length) % triggers.length;
        const el = triggers[idx];
        img.src = el.dataset.image;
        img.alt = el.querySelector('img') ? el.querySelector('img').alt : '';
        if (meta) meta.textContent = el.dataset.caption || '';
        story.textContent = el.dataset.story || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function close() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    triggers.forEach((el, i) => el.addEventListener('click', () => {
        lastFocus = el;
        show(i);
    }));

    if (closeBtn) closeBtn.addEventListener('click', close);
    const prev = document.getElementById('pfPrev');
    const next = document.getElementById('pfNext');
    if (prev) prev.addEventListener('click', () => show(idx - 1));
    if (next) next.addEventListener('click', () => show(idx + 1));

    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    document.addEventListener('keydown', e => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') show(idx + 1);
        if (e.key === 'ArrowLeft') show(idx - 1);
    });
})();

// ============================================
// ÜBER MICH – Ausklappen merkt sich den Zustand nicht,
// scrollt aber beim Zuklappen sauber zurück
// ============================================
(function () {
    const details = document.querySelector('.about-more');
    if (!details) return;
    details.addEventListener('toggle', function () {
        if (!details.open) {
            const top = details.getBoundingClientRect().top;
            if (top < 0) details.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
})();
