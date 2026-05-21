// ============================================
// BLOG-LOGIK (statisch, ohne Datenbank)
// ============================================
let allPosts = [];

const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli',
                'August','September','Oktober','November','Dezember'];

function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}`;
}

// Frontmatter (---...---) + Markdown-Inhalt trennen
function parsePost(raw, slug) {
    const m = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
    if (!m) return null;
    const meta = {};
    m[1].split('\n').forEach(line => {
        const i = line.indexOf(':');
        if (i === -1) return;
        const key = line.slice(0, i).trim();
        let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
        meta[key] = val;
    });
    return {
        slug,
        title: meta.title || slug,
        date: meta.date || '',
        dateFormatted: meta.date ? formatDate(meta.date) : '',
        category: meta.category || 'Allgemein',
        description: meta.description || '',
        image: meta.image || '/images/blog/platzhalter.svg',
        contentMd: m[2]
    };
}

// Alle Posts laden (über posts/index.json)
async function loadAllPosts() {
    const idx = await fetch('posts/index.json').then(r => r.json());
    const results = await Promise.all(idx.map(async ({ slug }) => {
        try {
            const raw = await fetch(`posts/${slug}.md`).then(r => r.text());
            return parsePost(raw, slug);
        } catch (e) { return null; }
    }));
    allPosts = results.filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // neuste zuerst
    return allPosts;
}

// Blog-Übersicht rendern
function renderList(posts) {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    grid.innerHTML = posts.map(p => `
        <a class="blog-card" href="blog-post.html?post=${encodeURIComponent(p.slug)}">
            <div class="blog-card-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
            <div class="blog-card-body">
                <span class="blog-tag">${p.category}</span>
                <h3>${p.title}</h3>
                <p class="blog-meta">${p.dateFormatted}</p>
                <p class="blog-desc">${p.description}</p>
                <span class="blog-link">Mehr lesen →</span>
            </div>
        </a>`).join('');
}

// Kategorie-Filter (feste Kategorien)
function buildFilter() {
    const bar = document.getElementById('blog-filter');
    if (!bar) return;
    const cats = ['Alle', 'Tipps', 'Gedanken', 'Einblicke', 'Rezensionen'];
    bar.innerHTML = cats.map((c, i) =>
        `<button class="blog-filter-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
    bar.addEventListener('click', e => {
        const btn = e.target.closest('.blog-filter-btn');
        if (!btn) return;
        bar.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const c = btn.dataset.cat;
        renderList(c === 'Alle' ? allPosts : allPosts.filter(p => p.category === c));
    });
}

// Einzelnen Post rendern
function renderSingle() {
    const slug = new URLSearchParams(location.search).get('post');
    const post = allPosts.find(p => p.slug === slug);
    const wrap = document.getElementById('post-content');
    if (!post) { wrap.innerHTML = '<p>Beitrag nicht gefunden. <a href="blog.html">Zurück zum Blog</a></p>'; return; }

    document.title = post.title + ' – Paul Zimansky';
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent('Schau dir diesen Blog-Post an: ' + post.title);
    wrap.innerHTML = `
        <span class="blog-tag">${post.category}</span>
        <h1>${post.title}</h1>
        <p class="blog-meta">${post.dateFormatted}</p>
        <img class="post-hero" src="${post.image}" alt="${post.title}">
        <div class="post-body">${marked.parse(post.contentMd)}</div>

        <section class="social-share">
            <p>Hat dir dieser Post gefallen? Teile ihn gerne!</p>
            <div class="share-buttons">
                <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener">Facebook</a>
                <a class="share-btn" href="https://wa.me/?text=${text}%20${url}" target="_blank" rel="noopener">WhatsApp</a>
                <a class="share-btn" href="https://instagram.com/paulzimansky" target="_blank" rel="noopener">Instagram</a>
            </div>
        </section>`;

    // Vorheriger / nächster Post (allPosts ist nach Datum sortiert)
    const i = allPosts.findIndex(p => p.slug === slug);
    const prev = allPosts[i + 1]; // älter
    const next = allPosts[i - 1]; // neuer
    const nav = document.getElementById('post-nav');
    nav.innerHTML = `
        ${prev ? `<a href="blog-post.html?post=${encodeURIComponent(prev.slug)}">← ${prev.title}</a>` : '<span></span>'}
        ${next ? `<a href="blog-post.html?post=${encodeURIComponent(next.slug)}">${next.title} →</a>` : '<span></span>'}`;

    // Related Posts (max. 2 andere)
    const related = allPosts.filter(p => p.slug !== slug).slice(0, 2);
    const relWrap = document.getElementById('related-posts');
    if (relWrap && related.length) {
        relWrap.innerHTML = `
            <h2>Diese Posts könnten dich auch interessieren</h2>
            <div class="related-grid">
                ${related.map(p => `
                    <a class="blog-card" href="blog-post.html?post=${encodeURIComponent(p.slug)}">
                        <div class="blog-card-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
                        <div class="blog-card-body">
                            <span class="blog-tag">${p.category}</span>
                            <h3>${p.title}</h3>
                            <span class="blog-link">Lesen →</span>
                        </div>
                    </a>`).join('')}
            </div>`;
    }
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllPosts();
    if (document.getElementById('blog-grid')) { renderList(allPosts); buildFilter(); }
    if (document.getElementById('post-content')) { renderSingle(); }
});
