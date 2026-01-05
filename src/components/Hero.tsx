'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PopupButton } from 'react-calendly';
import styles from './Hero.module.css';

export default function Hero() {
     const heroRef = useRef<HTMLElement>(null);
     const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

     useEffect(() => {
          setRootElement(document.body);
     }, []);

     useEffect(() => {
          const ctx = gsap.context(() => {
               gsap.from('.hero-title', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
               });

               gsap.from('.hero-subtitle', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: 0.1,
                    ease: 'power3.out',
               });

               gsap.from(`.${styles.heroContent} p`, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out',
               });

               gsap.from('.hero-actions', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power3.out',
               });

               gsap.from('.hero-img', {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
               });
          }, heroRef);

          return () => ctx.revert();
     }, []);

     return (
          <section id="home" className={styles.hero} ref={heroRef}>
               <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                         <h1 className="hero-title">TruckBilty</h1>
                         <h3 className="hero-subtitle">
                              "हर ट्रांसपोर्ट की जरूरत"
                         </h3>
                         <h3 className="hero-subtitle">
                              User-friendly Easy to use Mobile and web application for Transport Business
                         </h3>
                         <p>Register Today and Get 7 Days Free Trial and Explore amazing Features</p>

                         <div className={styles.contactNumbers}>
                              <div className='call-now'>Call Us -</div>
                              <a href="tel:+919680767999">
                                   <span>+91 96807 67999</span>
                              </a>
                              <a href="tel:+919998060916">
                                   <span>+91 99980 60916</span>
                              </a>
                              <a href="tel:+917698945785">
                                   <span>+91 76989 45785</span>
                              </a>
                         </div>

                         <div className="hero-actions">
                              {rootElement && (
                                   <PopupButton
                                        url="https://calendly.com/keyur-challengetechnolabs/30min"
                                        rootElement={rootElement}
                                        text="Book Demo"
                                        className="my-btn btn-primary"
                                   />
                              )}
                              <button className='app-btn'>
                                   <img src="/images/app-store-badge-dark.svg" alt="App Store" />
                              </button>
                              <button className='app-btn'>
                                   <img src="/images/google-play-badge-dark.svg" alt="Google Play" />
                              </button>
                         </div>

                    </div>

                    <div className="hero-img">
                         <img src="/images/hero-img.svg" alt="hero-img" />
                    </div>
               </div>
          </section>
     );
}
