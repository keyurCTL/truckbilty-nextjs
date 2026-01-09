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
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    closeMobileMenu();

    if (pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleBlogsClick = () => {
    closeMobileMenu();
  };

  useEffect(() => {
    if (pathname === '/blogs') {
      setActiveSection('blogs');
    } else if (pathname === '/') {
      setActiveSection('home');
    } else {
      setActiveSection('');
    }
  }, [pathname]);

  // Handle hash navigation when coming from another page
  useEffect(() => {
    if (pathname !== '/') return;
    
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const scrollToSection = () => {
      const target = document.getElementById(hash);
      if (target) {
        // Use a longer delay to ensure the page is fully loaded
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(hash);
        }, 150);
      }
    };

    // Try immediately
    scrollToSection();

    // Also try after a short delay as fallback
    const timeoutId = setTimeout(scrollToSection, 300);

    return () => clearTimeout(timeoutId);
  }, [pathname, typeof window !== 'undefined' ? window.location.hash : '']);

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
            <a href="#home" className={styles.logo} onClick={(e) => handleSectionClick(e, 'home')}>
              <img src="/images/logo/tb-logo.svg" alt="TruckBilty Logo" />
            </a>
            <ul className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
              <li>
                <a
                  href="#home"
                  className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}
                  onClick={(e) => handleSectionClick(e, 'home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={`${styles.navLink} ${activeSection === 'features' ? styles.active : ''}`}
                  onClick={(e) => handleSectionClick(e, 'features')}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#details"
                  className={`${styles.navLink} ${activeSection === 'details' ? styles.active : ''}`}
                  onClick={(e) => handleSectionClick(e, 'details')}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className={`${styles.navLink} ${activeSection === 'pricing' ? styles.active : ''}`}
                  onClick={(e) => handleSectionClick(e, 'pricing')}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className={`${styles.navLink} ${activeSection === 'reviews' ? styles.active : ''}`}
                  onClick={(e) => handleSectionClick(e, 'reviews')}
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className={`${styles.navLink} ${pathname === '/blogs' ? styles.active : ''
                    }`}
                  onClick={handleBlogsClick}
                >
                  Blogs
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
