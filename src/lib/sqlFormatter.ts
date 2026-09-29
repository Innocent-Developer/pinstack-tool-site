export function formatSQL(sql: string): string {
  if (!sql.trim()) return '';

  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'FULL JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
    'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE', 'UNION ALL', 'UNION',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AS', 'ON', 'IN', 'NOT IN',
    'IS NULL', 'IS NOT NULL', 'EXISTS', 'NOT EXISTS', 'LIKE', 'BETWEEN'
  ];

  let formatted = sql.replace(/\s+/g, ' ').trim();

  // Highlight keywords
  for (const kw of keywords) {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    formatted = formatted.replace(regex, kw.toUpperCase());
  }

  // Major clauses that start on a new un-indented line
  const majorClauses = [
    'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY',
    'LIMIT', 'OFFSET', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'JOIN',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'
  ];

  for (const clause of majorClauses) {
    const reg = new RegExp(`\\s*\\b(${clause})\\b\\s*`, 'g');
    formatted = formatted.replace(reg, `\n$1 `);
  }

  // Comma split inside SELECT
  const lines = formatted.split('\n').map(line => line.trim()).filter(Boolean);
  const result: string[] = [];

  for (let line of lines) {
    if (line.startsWith('SELECT')) {
      const parts = line.substring(6).split(',');
      result.push('SELECT');
      parts.forEach((p, idx) => {
        const comma = idx < parts.length - 1 ? ',' : '';
        result.push(`  ${p.trim()}${comma}`);
      });
    } else if (line.startsWith('AND ') || line.startsWith('OR ')) {
      result.push(`  ${line}`);
    } else {
      result.push(line);
    }
  }

  return result.join('\n').trim();
}
