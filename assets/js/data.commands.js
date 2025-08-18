export const COMMANDS = [
  { name: "/setup",           tags: ["admin"],           usage: "/setup",           short: "Initial configuration.", details: "Sets up log channels (all-in-one or seperate for each event)." },
  { name: "/premium",  tags: ["user"],            usage: "/premium",  short: "Check premium status.", details: "Shows if premium is active and the duration." },
  { name: "/search",          tags: ["user", "premium"],            usage: "/search 'username'",  short: "Search user logs.", details: "Search for recent logs of a specific user." },
  { name: "/clear",           tags: ["admin", "premium"],           usage: "/clear 'user | server' 'username'",   short: "Clear user or server logs.", details: "Clear logs for a user or the whole server." },
  { name: "/export",           tags: ["admin", "whitelabel"],           usage: "/export",   short: "Export server logs.", details: "Exports all servers logs into a file." },
  // Example multi-tag:
  // { name: "/audit export", tags: ["premium","admin"], usage: "/audit export", short: "Export logs as CSV.", details: "Premium-only with extended filters." },
];

export const TAG_STYLES = {
  admin:   'bg-red-500/15 text-red-400 border-red-500/40',
  whitelabel: 'bg-sky-300/10 text-sky-300 border-sky-400/40',
  premium: 'bg-amber-400/10 text-amber-300 border-amber-400/40',
  user:    'bg-emerald-400/10 text-emerald-300 border-emerald-400/40'
};
