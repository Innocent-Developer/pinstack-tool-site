export interface ToolItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  badge: string;
  icon: string;
  category: 'Code Generation' | 'Database' | 'Security' | 'DevOps' | 'Utilities';
  popular?: boolean;
}

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'json-to-ts',
    title: 'JSON to TypeScript, Go & Python',
    shortTitle: 'JSON to Types',
    description: 'Instantly convert nested JSON payloads into TypeScript interfaces, Go structs with json tags, or Python dataclasses.',
    href: '/tools/json-to-typescript',
    badge: 'Code Generator',
    icon: '⚡',
    category: 'Code Generation',
    popular: true,
  },
  {
    id: 'curl-to-code',
    title: 'cURL to Fetch, Axios, Python & Go',
    shortTitle: 'cURL to Code',
    description: 'Transform cURL commands into production-ready API client code across JavaScript Fetch, Axios, Python requests, and Go.',
    href: '/tools/curl-to-code',
    badge: 'API Client',
    icon: '🌐',
    category: 'Code Generation',
    popular: true,
  },
  {
    id: 'sql-fmt',
    title: 'SQL Query Formatter & Beautifier',
    shortTitle: 'SQL Formatter',
    description: 'Format, indent, and prettify messy SQL queries across PostgreSQL, MySQL, SQLite, and BigQuery automatically.',
    href: '/tools/sql-formatter',
    badge: 'Database',
    icon: '🗄️',
    category: 'Database',
    popular: true,
  },
  {
    id: 'jwt-dbg',
    title: 'JWT Token Debugger & Inspector',
    shortTitle: 'JWT Debugger',
    description: 'Decode and inspect JSON Web Tokens in the browser. View headers, claims, and expiry dates without leaking data.',
    href: '/tools/jwt-debugger',
    badge: 'Security',
    icon: '🛡️',
    category: 'Security',
    popular: true,
  },
  {
    id: 'hash-gen',
    title: 'Hash, HMAC & UUID Generator',
    shortTitle: 'Hash & HMAC',
    description: 'Hardware-accelerated SHA-256 digests, HMAC webhook signature generation, and batch UUID v4 creation via Web Crypto.',
    href: '/tools/hash-generator',
    badge: 'Cryptography',
    icon: '🔐',
    category: 'Security',
  },
  {
    id: 'json-diff',
    title: 'JSON Diff & Response Comparator',
    shortTitle: 'JSON Diff',
    description: 'Compare two API JSON responses side-by-side. Spot added keys, removed fields, and mutated values instantly.',
    href: '/tools/json-diff',
    badge: 'Comparator',
    icon: '⚖️',
    category: 'Utilities',
  },
  {
    id: 'regex-test',
    title: 'Regex Live Tester & Explainer',
    shortTitle: 'Regex Tester',
    description: 'Test, debug, and explain regular expressions in real time with syntax matching, flag toggles, and group inspector.',
    href: '/tools/regex-tester',
    badge: 'Debugger',
    icon: '🔍',
    category: 'Utilities',
  },
  {
    id: 'cron-gen',
    title: 'Cron Expression Schedule Generator',
    shortTitle: 'Cron Generator',
    description: 'Translate cryptic 5-part cron schedules into natural English sentences and calculate future execution timelines.',
    href: '/tools/cron-generator',
    badge: 'DevOps',
    icon: '⏱️',
    category: 'DevOps',
  },
  {
    id: 'base64-enc',
    title: 'Base64 & URL Encoder / Decoder',
    shortTitle: 'Base64 & URL',
    description: 'Encode and decode Base64 strings, URL components, and binary tokens with full multi-byte UTF-8 Unicode support.',
    href: '/tools/base64-encoder',
    badge: 'Encoder',
    icon: '🔄',
    category: 'Utilities',
  },
];

export const TOOL_CATEGORIES = [
  'All',
  'Code Generation',
  'Database',
  'Security',
  'DevOps',
  'Utilities',
] as const;
