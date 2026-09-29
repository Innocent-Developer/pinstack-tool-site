function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str: string) {
  return str
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function generateTypeScript(jsonStr: string, rootInterfaceName = 'RootObject'): string {
  try {
    const parsed = JSON.parse(jsonStr);
    const interfaces: string[] = [];

    const getType = (val: any, keyName: string): string => {
      if (val === null) return 'any';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'any[]';
        const innerType = getType(val[0], keyName.endsWith('s') ? keyName.slice(0, -1) : keyName + 'Item');
        return `${innerType}[]`;
      }
      if (typeof val === 'object') {
        const interfaceName = capitalize(keyName);
        parseObject(val, interfaceName);
        return interfaceName;
      }
      if (typeof val === 'number') return 'number';
      if (typeof val === 'boolean') return 'boolean';
      if (typeof val === 'string') return 'string';
      return 'any';
    };

    const parseObject = (obj: Record<string, any>, name: string) => {
      const lines = [`export interface ${name} {`];
      for (const [key, value] of Object.entries(obj)) {
        const typeStr = getType(value, key);
        lines.push(`  ${key}: ${typeStr};`);
      }
      lines.push('}');
      interfaces.unshift(lines.join('\n'));
    };

    if (Array.isArray(parsed)) {
      if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
        parseObject(parsed[0], rootInterfaceName);
        return interfaces.join('\n\n') + `\n\nexport type ${rootInterfaceName}List = ${rootInterfaceName}[];`;
      } else {
        return `export type ${rootInterfaceName} = any[];`;
      }
    } else if (typeof parsed === 'object' && parsed !== null) {
      parseObject(parsed, rootInterfaceName);
      return interfaces.join('\n\n');
    } else {
      return `export type ${rootInterfaceName} = ${typeof parsed};`;
    }
  } catch (err: any) {
    throw new Error('Invalid JSON format: ' + err.message);
  }
}

export function generateGoStruct(jsonStr: string, rootStructName = 'DataModel'): string {
  try {
    const parsed = JSON.parse(jsonStr);
    const structs: string[] = [];

    const getGoType = (val: any, fieldName: string): string => {
      if (val === null) return 'interface{}';
      if (Array.isArray(val)) {
        if (val.length === 0) return '[]interface{}';
        const innerType = getGoType(val[0], fieldName);
        return `[]${innerType}`;
      }
      if (typeof val === 'object') {
        const structName = toPascalCase(fieldName);
        parseGoStruct(val, structName);
        return structName;
      }
      if (typeof val === 'number') {
        return Number.isInteger(val) ? 'int64' : 'float64';
      }
      if (typeof val === 'boolean') return 'bool';
      if (typeof val === 'string') return 'string';
      return 'interface{}';
    };

    const parseGoStruct = (obj: Record<string, any>, name: string) => {
      const lines = [`type ${name} struct {`];
      for (const [key, value] of Object.entries(obj)) {
        const pascalName = toPascalCase(key) || 'Field';
        const typeStr = getGoType(value, key);
        lines.push(`\t${pascalName} ${typeStr} \`json:"${key}"\``);
      }
      lines.push('}');
      structs.unshift(lines.join('\n'));
    };

    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      parseGoStruct(parsed, rootStructName);
      return structs.join('\n\n');
    }
    return `type ${rootStructName} interface{}`;
  } catch (err: any) {
    throw new Error('Invalid JSON: ' + err.message);
  }
}

export function generatePythonClass(jsonStr: string, rootClassName = 'DataModel'): string {
  try {
    const parsed = JSON.parse(jsonStr);
    const classes: string[] = [];

    const getPyType = (val: any, field: string): string => {
      if (val === null) return 'Any';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'List[Any]';
        return `List[${getPyType(val[0], field)}]`;
      }
      if (typeof val === 'object') {
        const clsName = toPascalCase(field);
        parsePy(val, clsName);
        return clsName;
      }
      if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
      if (typeof val === 'boolean') return 'bool';
      if (typeof val === 'string') return 'str';
      return 'Any';
    };

    const parsePy = (obj: Record<string, any>, name: string) => {
      const lines = [`@dataclass`, `class ${name}:`];
      const entries = Object.entries(obj);
      if (entries.length === 0) {
        lines.push('    pass');
      } else {
        for (const [k, v] of entries) {
          lines.push(`    ${k}: ${getPyType(v, k)}`);
        }
      }
      classes.unshift(lines.join('\n'));
    };

    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      parsePy(parsed, rootClassName);
      return `from dataclasses import dataclass\nfrom typing import List, Any, Optional\n\n` + classes.join('\n\n');
    }
    return `# Non-object JSON payload\n${rootClassName} = Any`;
  } catch (err: any) {
    throw new Error('Invalid JSON: ' + err.message);
  }
}
