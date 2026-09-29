export interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  data: string | null;
}

export function parseCurl(curlCommand: string): ParsedCurl {
  const cleanCmd = curlCommand.replace(/\\\n/g, ' ').replace(/\n/g, ' ').trim();
  
  let method = 'GET';
  let url = '';
  const headers: Record<string, string> = {};
  let data: string | null = null;

  // Match URL: first string looking like http:// or https:// or quoted
  const urlMatch = cleanCmd.match(/(https?:\/\/[^\s'"]+)/i);
  if (urlMatch) {
    url = urlMatch[1];
  }

  // Method detection
  const methodMatch = cleanCmd.match(/-X\s+([A-Z]+)/i) || cleanCmd.match(/--request\s+([A-Z]+)/i);
  if (methodMatch) {
    method = methodMatch[1].toUpperCase();
  }

  // Headers detection
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let hMatch;
  while ((hMatch = headerRegex.exec(cleanCmd)) !== null) {
    const colonIdx = hMatch[1].indexOf(':');
    if (colonIdx > -1) {
      const k = hMatch[1].slice(0, colonIdx).trim();
      const v = hMatch[1].slice(colonIdx + 1).trim();
      headers[k] = v;
    }
  }

  // Data detection
  const dataMatch = cleanCmd.match(/(?:-d|--data|--data-raw|--data-binary)\s+['"]([^'"]+)['"]/);
  if (dataMatch) {
    data = dataMatch[1];
    if (method === 'GET') method = 'POST';
  }

  return { method, url: url || 'https://api.example.com/v1/resource', headers, data };
}

export function curlToFetch(parsed: ParsedCurl): string {
  const options: Record<string, any> = {
    method: parsed.method,
    headers: parsed.headers,
  };
  if (parsed.data) {
    try {
      options.body = JSON.parse(parsed.data);
    } catch {
      options.body = parsed.data;
    }
  }

  return `const response = await fetch('${parsed.url}', {
  method: '${parsed.method}',
  headers: ${JSON.stringify(parsed.headers, null, 4)},${parsed.data ? `\n  body: JSON.stringify(${parsed.data}),` : ''}
});
const data = await response.json();
console.log(data);`;
}

export function curlToAxios(parsed: ParsedCurl): string {
  const config = {
    method: parsed.method.toLowerCase(),
    url: parsed.url,
    headers: parsed.headers,
    ...(parsed.data ? { data: parsed.data } : {}),
  };

  return `import axios from 'axios';

const response = await axios({
  method: '${parsed.method.toLowerCase()}',
  url: '${parsed.url}',
  headers: ${JSON.stringify(parsed.headers, null, 4)},${parsed.data ? `\n  data: ${parsed.data},` : ''}
});
console.log(response.data);`;
}

export function curlToPython(parsed: ParsedCurl): string {
  const pyHeaders = JSON.stringify(parsed.headers, null, 4).replace(/true/g, 'True').replace(/false/g, 'False');
  
  return `import requests

url = "${parsed.url}"
headers = ${pyHeaders}
${parsed.data ? `payload = ${parsed.data}\nresponse = requests.${parsed.method.toLowerCase()}(url, headers=headers, json=payload)` : `response = requests.${parsed.method.toLowerCase()}(url, headers=headers)`}

print(response.status_code)
print(response.json())`;
}

export function curlToGo(parsed: ParsedCurl): string {
  return `package main

import (
    "fmt"
    "net/http"
    "io"${parsed.data ? `\n    "strings"` : ''}
)

func main() {
    client := &http.Client{}
    ${parsed.data ? `payload := strings.NewReader(\`${parsed.data}\`)\n    req, err := http.NewRequest("${parsed.method}", "${parsed.url}", payload)` : `req, err := http.NewRequest("${parsed.method}", "${parsed.url}", nil)`}
    if err != nil {
        panic(err)
    }

${Object.entries(parsed.headers).map(([k, v]) => `    req.Header.Add("${k}", "${v}")`).join('\n')}

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    bodyText, _ := io.ReadAll(resp.Body)
    fmt.Println(string(bodyText))
}`;
}
