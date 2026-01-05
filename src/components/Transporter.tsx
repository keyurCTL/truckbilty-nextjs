'use client';
 
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Transporter.module.css';
 
gsap.registerPlugin(ScrollTrigger);
 
export default function Transporter() {
     const transporterRef = useRef<HTMLElement>(null);
     const ctxRef = useRef<gsap.Context | null>(null);
 
     useEffect(() => {
          const isMobile = window.innerWidth <= 768;
 
          if (!isMobile && transporterRef.current) {
               ctxRef.current = gsap.context(() => {
                    // Pin the transporter section
                    ScrollTrigger.create({
                         id: 'transporter-pin',
                         trigger: transporterRef.current,
                         start: 'top top',
                         end: '+=200%',
                         pin: true,
                         scrub: true,
                         anticipatePin: 1,
                         pinSpacing: true,
                         // CRITICAL: Prevent pin reparenting issues
                         pinReparent: false
                    });
 
                    // Horizontal slide animation for second slide
                    gsap.fromTo(
                         `.${styles.transTwo}`,
                         { x: '100%' },
                         {
                              x: '0%',
                              scrollTrigger: {
                                   id: 'transporter-slide',
                                   trigger: transporterRef.current,
                                   start: 'top top',
                                   end: '+=150%',
                                   scrub: true
                              }
                         }
                    );
 
                    // First slide heading animation
                    gsap.from(`.${styles.transOne} .heading-design`, {
                         scrollTrigger: {
                              id: 'transporter-heading-1',
                              trigger: transporterRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 60,
                         opacity: 0,
                         duration: 1,
                         ease: 'power3.out'
                    });
 
                    // First slide image animation
                    gsap.from(`.${styles.transImgOne}`, {
                         scrollTrigger: {
                              id: 'transporter-img-1',
                              trigger: transporterRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 120,
                         opacity: 0,
                         duration: 1,
                         ease: 'power3.out'
                    });
 
                    // Second slide heading animation
                    gsap.from(`.${styles.transTwo} .heading-design`, {
                         scrollTrigger: {
                              id: 'transporter-heading-2',
                              trigger: transporterRef.current,
                              start: 'top top',
                              end: '+=50vh',
                              scrub: 1
                         },
                         y: 60,
                         opacity: 0,
                         ease: 'power2.out'
                    });
 
                    // Second slide image animation
                    gsap.from(`.${styles.transImgTwo}`, {
                         scrollTrigger: {
                              id: 'transporter-img-2',
                              trigger: transporterRef.current,
                              start: 'top top',
                              end: '+=50vh',
                              scrub: 1
                         },
                         y: 120,
                         opacity: 0,
                         ease: 'power2.out'
                    });
               }, transporterRef);
 
               // Refresh on window resize
               const handleResize = () => {
                    ScrollTrigger.refresh();
               };
 
               window.addEventListener('resize', handleResize);
 
               return () => {
                    window.removeEventListener('resize', handleResize);
                   
                    // CRITICAL FIX: Kill ScrollTriggers synchronously before context revert
                    const triggers = ScrollTrigger.getAll();
                    triggers.forEach((st) => {
                         if (st.vars.id?.startsWith('transporter')) {
                              // Kill without animation and revert DOM changes immediately
                              st.kill(false, true);
                         }
                    });
                   
                    // Revert context after ScrollTriggers are killed
                    if (ctxRef.current) {
                         ctxRef.current.revert();
                         ctxRef.current = null;
                    }
               };
          } else if (isMobile && transporterRef.current) {
               // Mobile: Simple fade-in animations
               ctxRef.current = gsap.context(() => {
                    gsap.from(`.${styles.transOne} .heading-design`, {
                         scrollTrigger: {
                              id: 'transporter-mobile-heading-1',
                              trigger: `.${styles.transOne}`,
                              start: 'top 80%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 40,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out'
                    });
 
                    gsap.from(`.${styles.transImgOne}`, {
                         scrollTrigger: {
                              id: 'transporter-mobile-img-1',
                              trigger: `.${styles.transOne}`,
                              start: 'top 70%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 60,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out'
                    });
 
                    gsap.from(`.${styles.transTwo} .heading-design`, {
                         scrollTrigger: {
                              id: 'transporter-mobile-heading-2',
                              trigger: `.${styles.transTwo}`,
                              start: 'top 80%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 40,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out'
                    });
 
                    gsap.from(`.${styles.transImgTwo}`, {
                         scrollTrigger: {
                              id: 'transporter-mobile-img-2',
                              trigger: `.${styles.transTwo}`,
                              start: 'top 70%',
                              toggleActions: 'play none none reverse'
                         },
                         y: 60,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out'
                    });
               }, transporterRef);
 
               return () => {
                    const triggers = ScrollTrigger.getAll();
                    triggers.forEach((st) => {
                         if (st.vars.id?.includes('transporter')) {
                              st.kill(false, true);
                         }
                    });
                   
                    if (ctxRef.current) {
                         ctxRef.current.revert();
                         ctxRef.current = null;
                    }
               };
          }
     }, []);
 
     return (
          <section className={styles.transporter} id="transporter" ref={transporterRef}>
               <div className={`side-line ${styles.leftLine}`}></div>
               <div className={`side-line ${styles.rightLine}`}></div>
               <div className={styles.transporterContainer}>
                    <div className={`${styles.transSlide} ${styles.transOne}`}>
                         <div className="heading-design">
                              <div className="flower top">
                                   <img src="/images/flower-top.svg" alt="flower-top" />
                              </div>
                              <h1>Why Transporters Struggle</h1>
                              <div className="flower bottom">
                                   <img src="/images/flower-top.svg" alt="flower-bottom" />
                              </div>
                         </div>
                         <div className={styles.transImgOne}>
                              <img src="/images/trans-img-one.png" alt="trans-img-one" />
                         </div>
                    </div>
                    <div className={`${styles.transSlide} ${styles.transTwo}`}>
                         <div className="heading-design">
                              <div className="flower top">
                                   <img src="/images/flower-top.svg" alt="flower-top" />
                              </div>
                              <h1>How TruckBilty Fixes It</h1>
                              <div className="flower bottom">
                                   <img src="/images/flower-top.svg" alt="flower-bottom" />
                              </div>
                         </div>
                         <div className={styles.transImgTwo}>
                              <img src="/images/trans-img-two.png" alt="trans-img-two" />
                         </div>
                    </div>
               </div>
          </section>
     );
}