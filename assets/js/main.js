import { COMMANDS, TAG_STYLES } from './data.commands.js';
import { mountAccordion } from './ui.accordion.js';
import { mountReveal } from './ui.reveal.js';
import { mountNavActive /*, enableSmoothLinks*/ } from './ui.nav.js';
import { renderComparison } from './ui.table.js';

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Animations and nav
mountReveal();
mountNavActive();
// enableSmoothLinks(); // uncomment if you prefer JS-driven smooth scroll

// Commands search/filter
const listEl   = document.getElementById('commands-list');
const searchEl = document.getElementById('search');
const chips    = Array.from(document.querySelectorAll('.role-chip'));

const selectedTags = new Set(); // e.g., {'admin','premium'}
let searchQuery  = '';

const accordion = mountAccordion(listEl, COMMANDS, TAG_STYLES);

function matchesTags(cmd) {
  if (selectedTags.size === 0) return true; // no filter -> show all
  const tags = new Set(cmd.tags || []);
  for (const t of selectedTags) if (tags.has(t)) return true; // ANY selected tag
  return false;
  // For ALL selected tags instead:
  // return [...selectedTags].every(t => tags.has(t));
}

function filterCommands() {
  const q = searchQuery.trim().toLowerCase();
  const out = COMMANDS.filter(c => {
    const byTags = matchesTags(c);
    const byText = !q || c.name.toLowerCase().includes(q) || (c.usage||'').toLowerCase().includes(q);
    return byTags && byText;
  });
  accordion.render(out);
}

// chip behavior
chips.forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    if (tag === 'all') {
      selectedTags.clear();
      chips.forEach(b => b.classList.remove('bg-white/10','active'));
      btn.classList.add('bg-white/10','active');
    } else {
      // toggle this tag
      const isOn = btn.classList.toggle('bg-white/10');
      btn.classList.toggle('active', isOn);
      // deactivate 'All'
      const allBtn = chips.find(b => b.dataset.tag === 'all');
      allBtn?.classList.remove('bg-white/10','active');
      if (isOn) selectedTags.add(tag);
      else selectedTags.delete(tag);
      // if none selected, activate 'All'
      if (selectedTags.size === 0) {
        allBtn?.classList.add('bg-white/10','active');
      }
    }
    filterCommands();
  });
});

searchEl?.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  filterCommands();
});

// initial render
filterCommands();

// Comparison table
const compBody = document.querySelector('#comparison tbody');
renderComparison(compBody, [
  { feature: 'Easy Setup',  basic: true,  premium: true,  whitelabel: true  },
  { feature: 'Track VC joins/leaves/moves',         basic: true,  premium: true,  whitelabel: true  },
  { feature: 'Clean embeds in one or seperate channel(s)',         basic: true,  premium: true,  whitelabel: true  },
  { feature: 'Connection duration info on leave/move',         basic: false,  premium: true,  whitelabel: true  },
  { feature: 'Search recent logs of specific user (<code>/search</code>)',         basic: false,  premium: "50 logs",  whitelabel: "100 logs"  },
  { feature: 'Clear server or user logs (<code>/clear</code>)',         basic: false,  premium: true,  whitelabel: true  },
  { feature: 'Priority support',         basic: false,  premium: true,  whitelabel: true  },
  { feature: 'Seperate hosted bot-instance (better response time)',         basic: false,  premium: false,  whitelabel: true  },
  { feature: 'Customizable bot (name, avatar, banner, description)',         basic: false,  premium: false,  whitelabel: true  },
  { feature: 'Export logs including <code>/cleared</code> ones into a file (<code>/export</code>)',         basic: false,  premium: false,  whitelabel: true  },
]);
