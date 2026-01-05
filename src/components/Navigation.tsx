'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Navigation.module.css';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navbarState, setNavbarState] = useState<'normal' | 'fixed' | 'hidden'>('normal');
  const lastScrollTop = useRef(0);
  const scrollThreshold = 50;
  const pathname = usePathname();
  const router = useRouter();

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Handle nav link click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    closeMobileMenu();

    if (pathname === '/') {
      // Already on home page, just scroll to section
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      }
      return;
    }

    // Navigate to home page first, then scroll will happen via useEffect
    router.push(`/#${sectionId}`);
  };

  useEffect(() => {
    if (pathname !== '/') return;
    if (!window.location.hash) return;

    const id = window.location.hash.replace('#', '');
    const target = document.getElementById(id);

    if (!target) return;

    // slight delay to ensure layout is ready
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }, 100);
  }, [pathname]);

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        if (scrollTop < lastScrollTop.current) {
          // Scrolling UP - show fixed navbar
          setNavbarState('fixed');
        } else {
          // Scrolling DOWN - hide navbar
          setNavbarState('hidden');
        }
      } else {
        // At top of page - show normal navbar
        setNavbarState('normal');
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll, false);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScrollSpy = () => {
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) return;

      const navbar = document.getElementById('navbar');
      const navOffset = navbar?.offsetHeight || 0;
      const scrollPos = window.scrollY + navOffset + 10;

      if (window.scrollY < (sections[0] as HTMLElement).offsetHeight / 2) {
        setActiveSection('home');
        return;
      }

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height && id) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);

  return (
    <>
      <nav
        id="navbar"
        className={`${styles.mynavbar} ${navbarState === 'fixed' ? styles.navbarFixed : ''
          } ${navbarState === 'hidden' ? styles.navbarHidden : ''}`}
      >
        <div className={styles.navContainer}>
          <div className={styles.navWrapper}>
            <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, 'home')}>
              <img src="/images/logo/Truck Bilty-04.svg" alt="TruckBilty Logo" />
            </a>
            <ul className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
              <li>
                <a
                  href="#home"
                  className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={`${styles.navLink} ${activeSection === 'features' ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, 'features')}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#details"
                  className={`${styles.navLink} ${activeSection === 'details' ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, 'details')}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className={`${styles.navLink} ${activeSection === 'pricing' ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, 'pricing')}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className={`${styles.navLink} ${activeSection === 'reviews' ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, 'reviews')}
                >
                  Reviews
                </a>
              </li>
              <li className={styles.mobileLoginItem}>
                <a href="https://beta.truckbilty.com/" target='_blank' className="my-btn btn-primary">
                  Login
                </a>
              </li>
            </ul>
            <a href="https://beta.truckbilty.com/" target='_blank' className={`my-btn btn-primary ${styles.desktopLoginBtn}`}>
              Login
            </a>
            <button
              className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`}
              id="mobileMenuBtn"
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.navBottomDesign}></div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
}
