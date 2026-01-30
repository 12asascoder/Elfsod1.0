import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './ui/resizable-navbar';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Check login status from localStorage
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token) {
        setIsLoggedIn(true);

        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            setUserName(user.name || user.username || 'User');
          } catch (error) {
            console.error('Error parsing user data:', error);
            setUserName('User');
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    };

    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (if user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);

    // Listen for custom login event
    const handleLoginEvent = () => checkAuthStatus();
    window.addEventListener('userLoggedIn', handleLoginEvent);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('userLoggedIn', handleLoginEvent);
    };
  }, []);

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Command Center', link: '/command-center' },
    { name: 'Targeting Intel', link: '/targeting_intel' },
    { name: 'Ad Surveillance', link: '/ad-surveillance' },
    { name: 'Auto Create', link: '/auto-create' },
    { name: 'Reverse Engineering', link: '/video-analysis' }
  ];

  const handleNavClick = (link: string) => {
    navigate(link);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update state
    setIsLoggedIn(false);
    setUserName(null);
    setIsMobileMenuOpen(false);

    // Redirect to home
    navigate('/');
  };

  return (
    <Navbar className="bg-transparent backdrop-blur-md">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#121212]/80 border-white/5 dark:bg-[#121212]/80 dark:border-white/5 rounded-[24px] max-w-[1550px] mt-4">
        <div className="flex items-center gap-2 px-2">
          <span className="text-2xl font-bold tracking-tighter text-white font-serif italic">ELFSOD</span>
        </div>

        {isLoggedIn && (
          <NavItems
            items={navItems}
            className="text-slate-400"
          />
        )}

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              {/* Show user name */}
              {userName && (
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <span className="opacity-60 font-medium">Hello,</span>
                  <span className="text-white">{userName}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full bg-[#1a1a1a] border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavbarButton
                variant="secondary"
                onClick={() => navigate('login')}
                className="text-white"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                variant="gradient"
                onClick={() => navigate('sign-up')}
              >
                Get Started
              </NavbarButton>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <button
              key={`mobile - link - ${idx} `}
              onClick={() => handleNavClick(item.link)}
              className="relative text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 transition-colors text-left w-full"
            >
              <span className="block font-medium">{item.name}</span>
            </button>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex w-full flex-col gap-4 mt-4">
            {isLoggedIn ? (
              <>
                {/* Show user name on mobile */}
                {userName && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 px-2 py-2 text-center bg-slate-50 rounded-lg font-mulish">
                    Logged in as <span className="font-semibold text-cyan-600">{userName}</span>
                  </div>
                )}
                <NavbarButton
                  onClick={handleLogout}
                  variant="secondary"
                  className="w-full"
                >
                  Logout
                </NavbarButton>
              </>
            ) : (
              <>
                <NavbarButton
                  onClick={() => handleNavClick('/login')}
                  variant="secondary"
                  className="w-full"
                >
                  Sign In
                </NavbarButton>
                <NavbarButton
                  onClick={() => handleNavClick('/sign-up')}
                  variant="gradient"
                  className="w-full"
                >
                  Get Started
                </NavbarButton>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default Navigation;