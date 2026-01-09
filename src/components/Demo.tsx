'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Demo.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Demo = () => {
     const truckRef = useRef<HTMLDivElement>(null);
     const sectionRef = useRef<HTMLDivElement>(null);
     const headingRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const ctx = gsap.context(() => {
               if (headingRef.current) {
                    gsap.from(headingRef.current, {
                         scrollTrigger: {
                              trigger: headingRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none none'
                         },
                         y: 50,
                         opacity: 0,
                         duration: 1,
                         ease: 'power3.out'
                    });

                    gsap.from(headingRef.current.querySelector('h1'), {
                         scrollTrigger: {
                              trigger: headingRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none none'
                         },
                         scale: 0.5,
                         opacity: 0,
                         duration: 0.8,
                         delay: 0.2,
                         ease: 'back.out(1.7)'
                    });
               }
               // Heading animation
               if (truckRef.current) {
                    gsap.from(truckRef.current, {
                         scrollTrigger: {
                              trigger: truckRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none none'
                         },
                         x: 200,
                         opacity: 0,
                         duration: 1,
                         delay: 0.2,
                         ease: 'power3.out'
                    });
               }
          }, sectionRef);

          return () => ctx.revert();
     }, []);

     return (
          <>
               <section className={styles.demo} id="demo" ref={sectionRef}>
                    <div className={`side-line ${styles.leftLine}`}></div>
                    <div className={`side-line ${styles.rightLine}`}></div>

                    <div className={styles.demoContainer}>
                         <div className="heading-design" ref={headingRef}>
                              <div className="flower top">
                                   <img src="/images/flower-top.svg" alt="flower-top" />
                              </div>
                              <h1>See TruckBilty in Action</h1>
                              <div className="flower bottom">
                                   <img src="/images/flower-top.svg" alt="flower-bottom" />
                              </div>
                         </div>

                         <div className={styles.demoContent}>
                              <div className={styles.appButtons}>
                                   <a href="#">
                                        <img src="/images/app-store-badge.svg" alt="App Store" />
                                   </a>
                                   <a href="#">
                                        <img src="/images/google-play-badge.svg" alt="Google Play" />
                                   </a>
                              </div>
                              <div className={styles.demoImage} ref={truckRef}>
                                   <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/Atq4tVEt0d0?si=T1DjwrTKxHqGNrXi"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                   >
                                   </iframe>
                              </div>
                         </div>
                    </div>
                    <div className={styles.roadDivider}></div>
               </section>
          </>
     );
};

export default Demo;