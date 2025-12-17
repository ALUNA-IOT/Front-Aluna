'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientHeader() {
  const pathname = usePathname();

  // No renderizar el Header si estamos en /Users
  if (pathname.startsWith('/Users')) {
    return null;
  }

  return <Header />;
}
