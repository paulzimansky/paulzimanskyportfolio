// ============================================
// PORTFOLIO MODAL (18-Kacheln-Grid mit Story)
// ============================================
(function () {
    const items = document.querySelectorAll('#portfolio-grid .portfolio-item');
    const modal = document.getElementById('pfModal');
    if (!items.length || !modal) return;

    const img = document.getElementById('pfImage');
    const story = document.getElementById('pfStory');
    let idx = 0;

    function show(i) {
        idx = (i + items.length) % items.length;
        const el = items[idx];
        img.src = el.dataset.image;
        img.alt = el.querySelector('img').alt;
        story.textContent = el.dataset.story || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    items.forEach((el, i) => el.addEventListener('click', () => show(i)));
    document.getElementById('pfClose').addEventListener('click', close);
    document.getElementById('pfPrev').addEventListener('click', () => show(idx - 1));
    document.getElementById('pfNext').addEventListener('click', () => show(idx + 1));
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') show(idx + 1);
        if (e.key === 'ArrowLeft') show(idx - 1);
    });
})();
