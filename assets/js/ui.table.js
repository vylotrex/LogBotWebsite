export const CHECK = '<span class="text-green-400">✔</span>';
export const DASH  = '<span class="text-slate-500">—</span>';

function formatCell(v) {
  // Explicit boolean handling
  if (v === true) return CHECK;
  if (v === false || v == null) return DASH;

  // Numbers (e.g., 50, 100)
  if (typeof v === 'number' && Number.isFinite(v)) {
    return `<span class="font-medium tabular-nums">${v}</span>`;
  }

  // Strings (e.g., "Unlimited")
  if (typeof v === 'string') {
    return v; // assumes safe/intentional HTML if provided
  }

  // Fallback
  return DASH;
}

export function renderComparison(tbodyEl, rows) {
  if (!tbodyEl) return;
  tbodyEl.innerHTML = '';

  rows.forEach(({ feature, basic, premium, whitelabel }) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-white/5 transition';
    tr.innerHTML = `
      <td class="p-4 w-1/2">${feature}</td>
      <td class="p-4 text-center w-1/6">${formatCell(basic)}</td>
      <td class="p-4 text-center w-1/6">${formatCell(premium)}</td>
      <td class="p-4 text-center w-1/6">${formatCell(whitelabel)}</td>
    `;
    tbodyEl.appendChild(tr);
  });
}
