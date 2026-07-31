(() => {
  'use strict';

  const authorities = window.AUTHORITIES || [];
  const topics = window.TOPICS || [];
  const clients = window.CLIENTS || [];
  const root = document.getElementById('root');
  const topicMap = new Map(topics.map(topic => [topic.id, topic]));
  const authorityMap = new Map(authorities.map(authority => [authority.id, authority]));

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'topics', label: 'Topics', icon: 'grid' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'saved', label: 'Saved', icon: 'bookmark' },
    { id: 'clients', label: 'Clients', icon: 'users' },
  ];

  const iconPaths = {
    home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/><path d="M20 12H9"/>',
    star: '<path d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.37l-5.7 3 1.09-6.36-4.62-4.5 6.38-.93L12 2.8Z"/>',
    external: '<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7h.01"/>',
    close: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    warning: '<path d="M10.3 3.6 2.5 18a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    install: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>',
    files: '<path d="M6 2h9l4 4v14H6z"/><path d="M15 2v5h5M9 11h7M9 15h7"/><path d="M3 6v15h12"/>',
    building: '<path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-5h6v5M9 10h.01M15 10h.01M9 13h.01M15 13h.01"/>',
    district: '<circle cx="6" cy="7" r="3"/><circle cx="18" cy="7" r="3"/><circle cx="12" cy="17" r="3"/><path d="m8.5 9 2 5M15.5 9l-2 5M9 7h6"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14"/><path d="m5 7-3 6h6L5 7Zm14 0-3 6h6l-3-6Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>',
    landmark: '<path d="m3 10 9-6 9 6M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M3 21h18"/>',
    vote: '<path d="M5 11h14l2 10H3l2-10Z"/><path d="M9 11V3h6v8"/><path d="m9 6 2 2 4-4"/>',
    droplet: '<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>',
    car: '<path d="m5 17-2-2v-4l2-5h14l2 5v4l-2 2"/><path d="M5 17v3h3v-3M16 17v3h3v-3M5 11h14M7 14h.01M17 14h.01"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  };

  function icon(name, size = 22, filled = false) {
    const path = iconPaths[name] || iconPaths.info;
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  const storage = {
    getArray(key) {
      try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    },
    setArray(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
    get(key, fallback = '') { return localStorage.getItem(key) ?? fallback; },
    set(key, value) { localStorage.setItem(key, value); },
  };

  const state = {
    activeTab: 'home',
    searchQuery: '',
    searchTopic: 'all',
    topicView: null,
    selectedAuthority: null,
    favorites: storage.getArray('fll:favorites'),
    recents: storage.getArray('fll:recents'),
    selectedClient: storage.get('fll:selected-client', 'all'),
    clientNote: '',
    showInstall: false,
    showAbout: false,
    noteSaved: false,
    clientNoteSaved: false,
    focusSearch: false,
  };
  state.clientNote = state.selectedClient === 'all' ? '' : storage.get(`fll:client-note:${state.selectedClient}`, '');

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function normalize(value = '') {
    return value.toLowerCase().replace(/[’']/g, '').replace(/§/g, '').replace(/[.,]/g, ' ');
  }

  function activeClient() {
    return clients.find(client => client.id === state.selectedClient) || null;
  }

  function favoriteAuthorities() {
    return state.favorites.map(id => authorityMap.get(id)).filter(Boolean);
  }

  function recentAuthorities() {
    return state.recents.map(id => authorityMap.get(id)).filter(Boolean);
  }

  function noteAuthorities() {
    return authorities.filter(authority => storage.get(`fll:note:${authority.id}`, '').trim().length > 0);
  }

  function searchResults() {
    const query = normalize(state.searchQuery).trim();
    return authorities
      .filter(authority => state.searchTopic === 'all' || authority.topic === state.searchTopic)
      .map(authority => {
        if (!query) return { authority, score: 1 };
        const searchable = normalize([
          authority.citation, authority.title, authority.summary, authority.useWhen,
          authority.tags.join(' '), authority.related.join(' '), authority.entityTypes.join(' '),
        ].join(' '));
        const terms = query.split(/\s+/).filter(Boolean);
        const matched = terms.filter(term => searchable.includes(term));
        const citationBoost = normalize(authority.citation).includes(query) ? 8 : 0;
        const titleBoost = normalize(authority.title).includes(query) ? 5 : 0;
        const tagBoost = authority.tags.some(tag => normalize(tag).includes(query)) ? 3 : 0;
        return { authority, score: matched.length * 2 + citationBoost + titleBoost + tagBoost };
      })
      .filter(item => query ? item.score > 0 : true)
      .sort((a, b) => b.score - a.score || a.authority.citation.localeCompare(b.authority.citation))
      .map(item => item.authority);
  }

  function header(title, backAction = '') {
    const client = activeClient();
    return `
      <header class="app-header">
        <div class="header-left">
          ${backAction
            ? `<button class="icon-button" data-action="${backAction}" aria-label="Back">${icon('back')}</button>`
            : '<div class="brand-mark" aria-hidden="true"><span>FL</span></div>'}
          <div>
            <span class="eyebrow">Florida Local Law</span>
            <h1>${escapeHtml(title || (client ? client.name : 'Attorney Reference'))}</h1>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-button" data-action="show-install" aria-label="Install app">${icon('install')}</button>
          <button class="icon-button" data-action="show-about" aria-label="About">${icon('info')}</button>
        </div>
      </header>`;
  }

  function authorityCard(authority, compact = false) {
    const topic = topicMap.get(authority.topic);
    const favorite = state.favorites.includes(authority.id);
    return `
      <article class="authority-card ${compact ? 'compact' : ''}">
        <button class="authority-main" data-action="open-authority" data-id="${authority.id}" aria-label="Open ${escapeHtml(authority.citation)}">
          <div class="authority-meta-row">
            <span class="citation">${escapeHtml(authority.citation)}</span>
            <span class="topic-pill">${escapeHtml(topic ? topic.shortTitle : authority.topic)}</span>
          </div>
          <h3>${escapeHtml(authority.title)}</h3>
          ${compact ? '' : `<p>${escapeHtml(authority.summary)}</p>`}
          <div class="authority-footer"><span>${escapeHtml(authority.entityTypes.slice(0, 2).join(' · '))}</span>${icon('chevron', 18)}</div>
        </button>
        <button class="favorite-button ${favorite ? 'active' : ''}" data-action="toggle-favorite" data-id="${authority.id}" aria-label="${favorite ? 'Remove from' : 'Add to'} favorites">${icon('star', 19, favorite)}</button>
      </article>`;
  }

  function authorityList(items, emptyTitle, emptyText, compact = false) {
    if (!items.length) {
      return `<div class="empty-state"><div class="empty-icon">${icon('search', 28)}</div><h3>${escapeHtml(emptyTitle)}</h3><p>${escapeHtml(emptyText)}</p></div>`;
    }
    return `<div class="authority-list">${items.map(item => authorityCard(item, compact)).join('')}</div>`;
  }

  function homeScreen() {
    const client = activeClient();
    const clientAuthorities = client ? authorities.filter(a => client.focusTopics.includes(a.topic)) : authorities;
    const focusTopics = client ? topics.filter(topic => client.focusTopics.includes(topic.id)) : topics.slice(0, 6);
    const favorites = favoriteAuthorities();
    const featured = favorites.length ? favorites.slice(0, 4) : clientAuthorities.slice(0, 4);
    const recents = recentAuthorities();

    return `<main class="screen home-screen">
      ${header()}
      <section class="hero-panel">
        <div class="hero-copy">
          <span class="status-badge"><span class="status-dot"></span> 2025 statutes indexed</span>
          <h2>Find the controlling starting point quickly.</h2>
          <p>Search by citation, acronym, legal issue, or plain-language problem.</p>
        </div>
        <button class="hero-search" data-action="open-search"><span class="hero-search-icon">${icon('search')}</span><span>Search statutes and topics</span><kbd>⌘ K</kbd></button>
        <div class="quick-query-row">${['CCNA','Sunshine','CRA funds','Code lien'].map(q => `<button data-action="quick-search" data-query="${escapeHtml(q)}">${escapeHtml(q)}</button>`).join('')}</div>
      </section>
      <section class="context-strip">
        <div><span class="eyebrow">Current client view</span><strong>${escapeHtml(client ? client.name : 'All Florida local government')}</strong></div>
        <button data-action="tab" data-tab="clients">Change ${icon('chevron', 16)}</button>
      </section>
      ${recents.length ? `
      <section class="content-section">
        <div class="section-title-row"><div><span class="eyebrow">Pick up where you left off</span><h2>Recent</h2></div><button data-action="tab" data-tab="saved">View saved</button></div>
        <div class="horizontal-list">${recents.slice(0, 5).map(a => `<button class="recent-card" data-action="open-authority" data-id="${a.id}"><span>${escapeHtml(a.citation)}</span><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(topicMap.get(a.topic)?.shortTitle || a.topic)}</small></button>`).join('')}</div>
      </section>` : ''}
      <section class="content-section">
        <div class="section-title-row"><div><span class="eyebrow">Issue-based navigation</span><h2>${client ? escapeHtml(client.name + ' focus') : 'Core topics'}</h2></div><button data-action="all-topics">All topics</button></div>
        <div class="topic-grid home-topic-grid">${focusTopics.slice(0,6).map(topic => `
          <button class="topic-card" data-action="topic" data-topic="${topic.id}">
            <span class="topic-icon">${icon(topic.icon)}</span><span><strong>${escapeHtml(topic.shortTitle)}</strong><small>${authorities.filter(a => a.topic === topic.id).length} authorities</small></span>${icon('chevron',17)}
          </button>`).join('')}</div>
      </section>
      <section class="content-section">
        <div class="section-title-row"><div><span class="eyebrow">${favorites.length ? 'Your pinned authorities' : 'Suggested starting points'}</span><h2>${favorites.length ? 'Favorites' : 'Frequently needed'}</h2></div>${favorites.length ? '<button data-action="tab" data-tab="saved">See all</button>' : ''}</div>
        ${authorityList(featured, 'Nothing pinned yet', 'Open an authority and tap the star to keep it here.', true)}
      </section>
      <section class="verification-card">${icon('warning')}<div><strong>Verification layer</strong><p>Summaries are research prompts. Every card links to the official statute and displays its review date.</p></div></section>
    </main>`;
  }

  function topicsScreen() {
    if (state.topicView) {
      const topic = topicMap.get(state.topicView);
      const items = authorities.filter(a => a.topic === state.topicView);
      return `<main class="screen">
        ${header(topic.shortTitle, 'back-topics')}
        <section class="topic-detail-hero"><span class="topic-icon large">${icon(topic.icon, 28)}</span><div><span class="eyebrow">${items.length} indexed authorities</span><h2>${escapeHtml(topic.title)}</h2><p>${escapeHtml(topic.description)}</p></div></section>
        <section class="content-section flush-top">${authorityList(items,'No authorities added','This topic is ready for additional authorities.')}</section>
      </main>`;
    }
    return `<main class="screen">
      ${header('Topics')}
      <section class="page-intro"><h2>Browse by the problem in front of you.</h2><p>Each topic collects statutory starting points, practical cautions, and related authorities.</p></section>
      <section class="topic-grid full-topic-grid">${topics.map(topic => `
        <button class="topic-card expanded" data-action="topic" data-topic="${topic.id}">
          <span class="topic-icon">${icon(topic.icon)}</span><span><strong>${escapeHtml(topic.title)}</strong><small>${escapeHtml(topic.description)}</small><em>${authorities.filter(a => a.topic === topic.id).length} authorities</em></span>${icon('chevron')}
        </button>`).join('')}</section>
    </main>`;
  }

  function searchScreen() {
    const results = searchResults();
    return `<main class="screen search-screen">
      ${header('Search')}
      <section class="search-sticky">
        <div class="search-input-wrap">${icon('search')}<input id="global-search" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="Citation, acronym, issue, or phrase" aria-label="Search authorities" />${state.searchQuery ? `<button data-action="clear-search" aria-label="Clear search">${icon('close',18)}</button>` : ''}</div>
        <div class="filter-scroll"><button class="${state.searchTopic === 'all' ? 'active' : ''}" data-action="search-topic" data-topic="all">${icon('filter',15)} All</button>${topics.map(topic => `<button class="${state.searchTopic === topic.id ? 'active' : ''}" data-action="search-topic" data-topic="${topic.id}">${escapeHtml(topic.shortTitle)}</button>`).join('')}</div>
      </section>
      <section class="content-section search-results-section"><div class="results-summary"><strong>${results.length} ${results.length === 1 ? 'result' : 'results'}</strong>${state.searchQuery ? `<span>for “${escapeHtml(state.searchQuery)}”</span>` : ''}</div>${authorityList(results,'No matching authority','Try a statute number, acronym, broader phrase, or a different topic.')}</section>
    </main>`;
  }

  function savedScreen() {
    const favorites = favoriteAuthorities();
    const notes = noteAuthorities();
    const recents = recentAuthorities();
    return `<main class="screen">
      ${header('Saved')}
      <section class="page-intro compact-intro"><h2>Your working library.</h2><p>Favorites and notes remain in this browser and are not committed to GitHub.</p></section>
      <section class="content-section flush-top"><div class="section-title-row"><div><span class="eyebrow">Pinned for quick access</span><h2>Favorites</h2></div><span class="count-badge">${favorites.length}</span></div>${authorityList(favorites,'No favorites yet','Tap the star on any statute card to pin it here.',true)}</section>
      <section class="content-section"><div class="section-title-row"><div><span class="eyebrow">Device-only annotations</span><h2>Authorities with notes</h2></div><span class="count-badge">${notes.length}</span></div>${authorityList(notes,'No notes yet','Open an authority and add a local policy reference or research reminder.',true)}</section>
      <section class="content-section"><div class="section-title-row"><div><span class="eyebrow">Recently opened</span><h2>History</h2></div><span class="count-badge">${recents.length}</span></div>${authorityList(recents,'No recent research','Authorities you open will appear here.',true)}</section>
    </main>`;
  }

  function clientsScreen() {
    const client = activeClient();
    const clientAuthorities = client ? authorities.filter(a => client.focusTopics.includes(a.topic)) : [];
    return `<main class="screen">
      ${header('Clients')}
      <section class="page-intro"><h2>Shift the app’s working context.</h2><p>Client views prioritize likely topics without hiding the rest of the Florida library.</p></section>
      <section class="client-list">
        <button class="client-card ${state.selectedClient === 'all' ? 'selected' : ''}" data-action="select-client" data-client="all">
          <div class="client-avatar all">${icon('landmark')}</div><div><span class="eyebrow">General reference</span><strong>All Florida local government</strong><small>Show the full topic library without client prioritization.</small></div>${state.selectedClient === 'all' ? `<span class="selected-check">${icon('check',16)}</span>` : icon('chevron')}
        </button>
        ${clients.map(c => `<button class="client-card ${state.selectedClient === c.id ? 'selected' : ''}" data-action="select-client" data-client="${c.id}"><div class="client-avatar">${escapeHtml(c.name.split(' ').map(w => w[0]).join('').slice(0,2))}</div><div><span class="eyebrow">${escapeHtml(c.type)}</span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.subtitle)}</small></div>${state.selectedClient === c.id ? `<span class="selected-check">${icon('check',16)}</span>` : icon('chevron')}</button>`).join('')}
      </section>
      ${client ? `<section class="client-workspace">
        <div class="section-title-row"><div><span class="eyebrow">Active workspace</span><h2>${escapeHtml(client.name)}</h2></div><span class="client-type-pill">${escapeHtml(client.type)}</span></div>
        <div class="focus-topic-row">${client.focusTopics.map(id => { const topic = topicMap.get(id); return `<button data-action="topic" data-topic="${id}">${icon(topic.icon,17)} ${escapeHtml(topic.shortTitle)}</button>`; }).join('')}</div>
        <div class="client-note-panel"><div><span class="eyebrow">Stored only on this device</span><h3>Client reference note</h3></div><textarea id="client-note" rows="5" placeholder="Add charter sections, purchasing-policy thresholds, ordinance links, meeting rules, or recurring research notes…">${escapeHtml(state.clientNote)}</textarea><button class="primary-button" data-action="save-client-note">${state.clientNoteSaved ? 'Saved' : 'Save client note'}</button></div>
        <div class="section-title-row mini"><div><span class="eyebrow">Prioritized by this view</span><h3>Suggested authorities</h3></div></div>
        ${authorityList(clientAuthorities.slice(0,6),'No authorities','Add authorities to this client focus.',true)}
      </section>` : ''}
    </main>`;
  }

  function detailModal() {
    const authority = state.selectedAuthority;
    if (!authority) return '';
    const topic = topicMap.get(authority.topic);
    const favorite = state.favorites.includes(authority.id);
    const note = storage.get(`fll:note:${authority.id}`, '');
    const verified = new Date(`${authority.verifiedOn}T12:00:00`).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    return `<div class="modal-shell" role="dialog" aria-modal="true" aria-label="${escapeHtml(authority.citation)} details">
      <div class="modal-backdrop" data-action="close-detail"></div>
      <section class="detail-sheet">
        <div class="sheet-handle"></div>
        <header class="detail-header"><button class="icon-button" data-action="close-detail" aria-label="Close">${icon('close')}</button><div class="detail-title-wrap"><span class="eyebrow">${escapeHtml(topic ? topic.title : authority.topic)}</span><h2>${escapeHtml(authority.citation)}</h2></div><button class="icon-button ${favorite ? 'favorite-active' : ''}" data-action="toggle-favorite" data-id="${authority.id}" aria-label="Toggle favorite">${icon('star',22,favorite)}</button></header>
        <div class="detail-scroll">
          <div class="detail-hero"><h1>${escapeHtml(authority.title)}</h1><p>${escapeHtml(authority.summary)}</p><div class="entity-chip-row">${authority.entityTypes.map(entity => `<span>${escapeHtml(entity)}</span>`).join('')}</div></div>
          <section class="detail-section"><h3>Use when</h3><p>${escapeHtml(authority.useWhen)}</p></section>
          <section class="detail-section"><h3>Key points</h3><ul class="check-list">${authority.keyPoints.map(point => `<li>${icon('check',17)}<span>${escapeHtml(point)}</span></li>`).join('')}</ul></section>
          ${authority.cautions?.length ? `<section class="detail-section caution-box"><h3>${icon('warning',18)} Research cautions</h3><ul>${authority.cautions.map(caution => `<li>${escapeHtml(caution)}</li>`).join('')}</ul></section>` : ''}
          <section class="detail-section"><h3>Related authorities</h3><div class="tag-row">${authority.related.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join('')}</div></section>
          <section class="detail-section source-box"><div><span class="eyebrow">Official source</span><strong>${escapeHtml(authority.sourceEdition)}</strong><small>Verified ${escapeHtml(verified)}</small></div><a href="${escapeHtml(authority.officialUrl)}" target="_blank" rel="noreferrer" class="source-link">Open statute ${icon('external',17)}</a></section>
          <section class="detail-section note-box"><div class="section-heading-row"><div><span class="eyebrow">Stored only on this device</span><h3>My note</h3></div>${state.noteSaved ? `<span class="saved-indicator">${icon('check',15)} Saved</span>` : ''}</div><textarea id="authority-note" rows="5" placeholder="Add a local policy reference, research reminder, or matter note…">${escapeHtml(note)}</textarea><button class="primary-button" data-action="save-note" data-id="${authority.id}">Save note</button></section>
          <p class="legal-disclaimer">Research aid only. Confirm the current statute, session laws, local charter, code, policy, enabling act, contracts, and controlling authorities before relying on a summary.</p>
        </div>
      </section>
    </div>`;
  }

  function installModal() {
    if (!state.showInstall) return '';
    return `<div class="modal-shell" role="dialog" aria-modal="true" aria-label="Install app"><div class="modal-backdrop" data-action="close-install"></div><section class="small-modal"><button class="modal-close" data-action="close-install">${icon('close')}</button><div class="modal-icon">${icon('install',30)}</div><span class="eyebrow">Phone installation</span><h2>Add Florida Local Law to your Home Screen</h2><div class="instruction-block"><strong>iPhone / Safari</strong><p>Open the deployed site in Safari, tap the Share button, choose <b>Add to Home Screen</b>, and confirm.</p></div><div class="instruction-block"><strong>Android / Chrome</strong><p>Open the browser menu and choose <b>Install app</b> or <b>Add to Home screen</b>.</p></div><button class="primary-button full" data-action="close-install">Done</button></section></div>`;
  }

  function aboutModal() {
    if (!state.showAbout) return '';
    return `<div class="modal-shell" role="dialog" aria-modal="true" aria-label="About this app"><div class="modal-backdrop" data-action="close-about"></div><section class="small-modal"><button class="modal-close" data-action="close-about">${icon('close')}</button><div class="modal-icon">${icon('scale',30)}</div><span class="eyebrow">Version 1.0.0</span><h2>A curated local-government research launchpad</h2><p class="modal-copy">The initial library includes ${authorities.length} Florida statutory starting points across ${topics.length} practice topics. Favorites, history, and notes are stored in the local browser.</p><div class="about-stats"><div><strong>${authorities.length}</strong><span>Authorities</span></div><div><strong>${topics.length}</strong><span>Topics</span></div><div><strong>${clients.length}</strong><span>Client views</span></div></div><div class="caution-box small"><p>Research aid only. Verify current statutes, session laws, cases, Attorney General opinions, charters, ordinances, policies, and matter-specific facts.</p></div><button class="primary-button full" data-action="close-about">Close</button></section></div>`;
  }

  function desktopRail() {
    return `<aside class="desktop-rail"><div class="desktop-brand"><div class="brand-mark"><span>FL</span></div><div><strong>Florida Local Law</strong><small>Attorney Reference</small></div></div><nav>${navItems.map(item => `<button class="${state.activeTab === item.id ? 'active' : ''}" data-action="tab" data-tab="${item.id}">${icon(item.icon)}<span>${item.label}</span></button>`).join('')}</nav><div class="rail-status"><span class="status-dot"></span><div><strong>2025 edition</strong><small>Verified library</small></div></div></aside>`;
  }

  function bottomNav() {
    return `<nav class="bottom-nav" aria-label="Primary navigation">${navItems.map(item => `<button class="${state.activeTab === item.id ? 'active' : ''}" data-action="tab" data-tab="${item.id}"><span class="nav-icon">${icon(item.icon)}</span><span>${item.label}</span></button>`).join('')}</nav>`;
  }

  function render() {
    const screens = { home: homeScreen, topics: topicsScreen, search: searchScreen, saved: savedScreen, clients: clientsScreen };
    root.innerHTML = `<div class="app-shell">${desktopRail()}<div class="app-content">${screens[state.activeTab]()}</div>${bottomNav()}${detailModal()}${installModal()}${aboutModal()}</div>`;
    if (state.focusSearch && state.activeTab === 'search') {
      requestAnimationFrame(() => {
        const input = document.getElementById('global-search');
        if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
        state.focusSearch = false;
      });
    }
  }

  function goToSearch(query = '') {
    state.activeTab = 'search';
    state.searchQuery = query;
    state.searchTopic = 'all';
    state.focusSearch = true;
    render();
  }

  function openAuthority(id) {
    const authority = authorityMap.get(id);
    if (!authority) return;
    state.selectedAuthority = authority;
    state.noteSaved = false;
    state.recents = [id, ...state.recents.filter(item => item !== id)].slice(0,12);
    storage.setArray('fll:recents', state.recents);
    render();
  }

  function toggleFavorite(id) {
    state.favorites = state.favorites.includes(id) ? state.favorites.filter(item => item !== id) : [id, ...state.favorites];
    storage.setArray('fll:favorites', state.favorites);
    render();
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === 'tab') { state.activeTab = target.dataset.tab; state.topicView = null; render(); }
    if (action === 'open-search') goToSearch('');
    if (action === 'quick-search') goToSearch(target.dataset.query || '');
    if (action === 'all-topics') { state.activeTab = 'topics'; state.topicView = null; render(); }
    if (action === 'topic') { state.activeTab = 'topics'; state.topicView = target.dataset.topic; render(); }
    if (action === 'back-topics') { state.topicView = null; render(); }
    if (action === 'open-authority') openAuthority(id);
    if (action === 'toggle-favorite') { event.stopPropagation(); toggleFavorite(id); }
    if (action === 'clear-search') { state.searchQuery = ''; state.focusSearch = true; render(); }
    if (action === 'search-topic') { state.searchTopic = target.dataset.topic; state.focusSearch = true; render(); }
    if (action === 'select-client') {
      state.selectedClient = target.dataset.client;
      storage.set('fll:selected-client', state.selectedClient);
      state.clientNote = state.selectedClient === 'all' ? '' : storage.get(`fll:client-note:${state.selectedClient}`, '');
      state.clientNoteSaved = false;
      render();
    }
    if (action === 'save-client-note' && state.selectedClient !== 'all') {
      const textarea = document.getElementById('client-note');
      state.clientNote = textarea ? textarea.value : state.clientNote;
      storage.set(`fll:client-note:${state.selectedClient}`, state.clientNote);
      state.clientNoteSaved = true;
      render();
      setTimeout(() => { state.clientNoteSaved = false; render(); }, 1500);
    }
    if (action === 'close-detail') { state.selectedAuthority = null; state.noteSaved = false; render(); }
    if (action === 'save-note' && id) {
      const textarea = document.getElementById('authority-note');
      storage.set(`fll:note:${id}`, textarea ? textarea.value : '');
      state.noteSaved = true;
      render();
      setTimeout(() => { state.noteSaved = false; if (state.selectedAuthority) render(); }, 1500);
    }
    if (action === 'show-install') { state.showInstall = true; render(); }
    if (action === 'close-install') { state.showInstall = false; render(); }
    if (action === 'show-about') { state.showAbout = true; render(); }
    if (action === 'close-about') { state.showAbout = false; render(); }
  });

  root.addEventListener('input', event => {
    if (event.target.id === 'global-search') {
      const cursor = event.target.selectionStart || event.target.value.length;
      state.searchQuery = event.target.value;
      render();
      requestAnimationFrame(() => {
        const input = document.getElementById('global-search');
        if (input) { input.focus(); input.setSelectionRange(cursor, cursor); }
      });
    }
    if (event.target.id === 'client-note') state.clientNote = event.target.value;
  });

  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      goToSearch('');
    }
    if (event.key === 'Escape') {
      if (state.selectedAuthority) state.selectedAuthority = null;
      else if (state.showInstall) state.showInstall = false;
      else if (state.showAbout) state.showAbout = false;
      render();
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }

  render();
})();
