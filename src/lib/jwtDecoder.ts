export interface DecodedJWT {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
  isExpired: boolean;
  expiresAt?: string;
  issuedAt?: string;
}

export function decodeJWT(token: string): DecodedJWT {
  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: A valid JSON Web Token must have exactly 3 parts separated by dots.');
  }

  function b64DecodeUnicode(str: string) {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
    const decoded = atob(padded);
    return decodeURIComponent(
      Array.prototype.map.call(decoded, (c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
  }

  try {
    const header = JSON.parse(b64DecodeUnicode(parts[0]));
    const payload = JSON.parse(b64DecodeUnicode(parts[1]));
    const signature = parts[2];

    let isExpired = false;
    let expiresAt: string | undefined;
    let issuedAt: string | undefined;

    if (payload.exp && typeof payload.exp === 'number') {
      const expDate = new Date(payload.exp * 1000);
      expiresAt = expDate.toUTCString();
      isExpired = Date.now() > payload.exp * 1000;
    }

    if (payload.iat && typeof payload.iat === 'number') {
      issuedAt = new Date(payload.iat * 1000).toUTCString();
    }

    return {
      header,
      payload,
      signature,
      isExpired,
      expiresAt,
      issuedAt
    };
  } catch (e: any) {
    throw new Error('Failed to parse token payload: ' + e.message);
  }
}
