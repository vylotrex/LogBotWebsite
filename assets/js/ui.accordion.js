export function mountAccordion(listEl, commands, tagStyles) {
  function makeItem(cmd) {
    const item = document.createElement('div');
    item.className = 'rounded-xl bg-[#0f131a] border border-white/5 overflow-hidden';

    const header = document.createElement('button');
    header.className = 'w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5 transition';

    const badges = (cmd.tags || []).map(t =>
      `<span class="text-xs px-2 py-1 rounded-full border ${tagStyles[t]||'border-white/20 text-slate-300'} capitalize">${t}</span>`
    ).join(' ');

    header.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="font-mono text-slate-100">${cmd.name}</span>
        <span class="flex gap-2">${badges}</span>
      </div>
      <svg class="h-4 w-4 text-slate-400 transition -rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 111.02 1.1l-4.2 3.8a.75.75 0 01-1.02 0l-4.2-3.8a.75.75 0 01-.02-1.06z"/></svg>
    `;

    const contentWrap = document.createElement('div');
    contentWrap.className = 'accordion-content grid';
    const content = document.createElement('div');
    content.className = 'min-h-0 overflow-hidden px-4 pb-3 pt-0';
    content.innerHTML = `
      <div class="text-sm text-slate-300">${cmd.short || ''}</div>
      <div class="mt-2 text-xs text-slate-400"><span class="font-semibold text-slate-300">Usage:</span> ${cmd.usage || ''}</div>
      <div class="mt-2 text-xs text-slate-400">${cmd.details || ''}</div>
    `;
    contentWrap.appendChild(content);

    header.addEventListener('click', () => {
      const isOpen = contentWrap.classList.contains('open');
      document.querySelectorAll('.accordion-content.open').forEach(el => {
        el.classList.remove('open');
        el.previousSibling?.querySelector('svg')?.classList.add('-rotate-90');
      });
      if (!isOpen) {
        contentWrap.classList.add('open');
        header.querySelector('svg')?.classList.remove('-rotate-90');
      }
    });

    item.appendChild(header);
    item.appendChild(contentWrap);
    return item;
  }

  return {
    render(filtered) {
      listEl.innerHTML = '';
      if (!filtered.length) {
        listEl.innerHTML = `<div class="text-slate-400 text-sm">No matches. Adjust your filter or search.</div>`;
        return;
      }
      filtered.forEach(cmd => listEl.appendChild(makeItem(cmd)));
    }
  };
}
