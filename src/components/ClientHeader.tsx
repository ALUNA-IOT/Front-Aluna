'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientHeader() {
  const pathname = usePathname();

  // Do not render the Header if we are in /Users or /admin
  if (pathname.startsWith('/Users') || pathname.startsWith('/admin')) {
    return null;
  }

  return <Header />;
}
