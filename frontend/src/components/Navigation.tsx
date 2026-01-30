import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Navbar,
  NavBody,
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

  const location = useLocation();

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Command Center', link: '/command-center' },
    { name: 'Targeting Intel', link: '/targeting_intel' },
    { name: 'Ad Surveillance', link: '/ad-surveillance' },
    { name: 'Auto Create', link: '/auto-create' },
    { name: 'Reverse Engineering', link: '/video-analysis' }
  ];

  const firstName = userName ? userName.split(' ')[0] : null;

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
      <NavBody className="bg-[#121212] border-white/5 dark:bg-[#121212] dark:border-white/5 rounded-[18px] max-w-[1400px] mt-4 py-2">
        <div className="flex items-center gap-2 px-4">
          <Link to="/home" className="text-2xl font-bold tracking-[0.1em] text-white italic font-serif hover:opacity-80 transition-opacity">
            ELFSOD
          </Link>
        </div>

        {isLoggedIn && (
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  key={item.link}
                  to={item.link}
                  className={`relative py-1 text-sm font-medium transition-all ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-6 pr-2">
          {isLoggedIn ? (
            <>
              {/* Show first name only */}
              {firstName && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
                  <span className="opacity-60">Hello,</span>
                  <span className="text-white">{firstName}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-8 py-2.5 rounded-full bg-black border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all shadow-lg active:scale-95"
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