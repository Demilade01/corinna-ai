// filepath: /src/i18n/request.ts
import { NextRequest } from 'next/server';

export default function getLocaleFromRequest(request: NextRequest) {
  // Extract the locale from the request (e.g., from the URL or headers)
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'en';
  return locale;
}