export interface DiffItem {
  path: string;
  type: 'added' | 'removed' | 'modified' | 'identical';
  oldValue?: any;
  newValue?: any;
}

export function compareJSON(obj1: any, obj2: any, path = ''): DiffItem[] {
  const diffs: DiffItem[] = [];

  if (typeof obj1 !== typeof obj2 || (obj1 === null || obj2 === null)) {
    if (obj1 !== obj2) {
      diffs.push({ path: path || 'root', type: 'modified', oldValue: obj1, newValue: obj2 });
    } else {
      diffs.push({ path: path || 'root', type: 'identical', oldValue: obj1, newValue: obj2 });
    }
    return diffs;
  }

  if (typeof obj1 === 'object') {
    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});
    const allKeys = Array.from(new Set([...keys1, ...keys2]));

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in obj1)) {
        diffs.push({ path: currentPath, type: 'added', newValue: obj2[key] });
      } else if (!(key in obj2)) {
        diffs.push({ path: currentPath, type: 'removed', oldValue: obj1[key] });
      } else {
        diffs.push(...compareJSON(obj1[key], obj2[key], currentPath));
      }
    }
  } else {
    if (obj1 !== obj2) {
      diffs.push({ path: path || 'root', type: 'modified', oldValue: obj1, newValue: obj2 });
    } else {
      diffs.push({ path: path || 'root', type: 'identical', oldValue: obj1, newValue: obj2 });
    }
  }

  return diffs;
}
