'use client';

import { useState, useEffect } from 'react';
import DesktopSignupPage from './DesktopSignupPage';
import MobileSignupPage from './MobileSignupPage';
import DesktopSigninPage from './DesktopSigninPage';
import MobileSigninPage from './MobileSigninPage';

interface AuthPageProps {
  type: 'signup' | 'signin';
}

export default function AuthPage({ type }: AuthPageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (type === 'signup') {
    return isMobile ? <MobileSignupPage /> : <DesktopSignupPage />;
  }

  return isMobile ? <MobileSigninPage /> : <DesktopSigninPage />;
}
