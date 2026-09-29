export interface CronAnalysis {
  isValid: boolean;
  humanReadable: string;
  parts: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
  };
  examples: string[];
}

export function explainCron(expr: string): CronAnalysis {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return {
      isValid: false,
      humanReadable: 'Invalid expression. Standard cron requires 5 fields: minute, hour, day-of-month, month, day-of-week.',
      parts: { minute: '', hour: '', dayOfMonth: '', month: '', dayOfWeek: '' },
      examples: []
    };
  }

  const [min, hr, dom, mon, dow] = parts;

  let desc = 'Runs ';

  // Minutes
  if (min === '*' && hr === '*') desc += 'every minute';
  else if (min.startsWith('*/')) desc += `every ${min.slice(2)} minutes`;
  else if (min === '0' && hr === '*') desc += 'at the start of every hour';
  else if (min !== '*' && hr !== '*') desc += `at ${hr.padStart(2, '0')}:${min.padStart(2, '0')}`;
  else desc += `at minute ${min}`;

  // Days of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (dow !== '*') {
    if (dow.includes(',')) {
      const named = dow.split(',').map(d => days[parseInt(d)] || d).join(', ');
      desc += ` on ${named}`;
    } else if (dow.includes('-')) {
      desc += ` on days ${dow}`;
    } else {
      desc += ` every ${days[parseInt(dow)] || dow}`;
    }
  }

  // Month
  if (mon !== '*') {
    desc += ` in month ${mon}`;
  }

  // Day of Month
  if (dom !== '*') {
    desc += ` on day-of-month ${dom}`;
  }

  return {
    isValid: true,
    humanReadable: desc + '.',
    parts: {
      minute: min,
      hour: hr,
      dayOfMonth: dom,
      month: mon,
      dayOfWeek: dow
    },
    examples: [
      '0 * * * * (Every hour)',
      '0 0 * * * (Every midnight)',
      '*/15 * * * * (Every 15 minutes)',
      '0 9 * * 1-5 (Every weekday at 9:00 AM)',
      '0 0 1 * * (First day of every month)'
    ]
  };
}
