'use client';

import { useEffect, useState } from 'react';
import DesktopSigninPage from './DesktopSigninPage';
import DesktopSignupPage from './DesktopSignupPage';
import MobileSigninPage from './MobileSigninPage';
import MobileSignupPage from './MobileSignupPage';

interface AuthPageProps {
  type: 'signin' | 'signup';
}

export default function AuthPage({ type }: AuthPageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (type === 'signin') {
    return isMobile ? <MobileSigninPage /> : <DesktopSigninPage />;
  }

  return isMobile ? <MobileSignupPage /> : <DesktopSignupPage />;
}

