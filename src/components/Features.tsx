'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Features.module.css';
import { featuresData } from './common/featuresData';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
     const featuresRef = useRef<HTMLElement>(null);

     useEffect(() => {
          const ctx = gsap.context(() => {

               // Heading timeline
               const headingTl = gsap.timeline({
                    scrollTrigger: {
                         trigger: `.${styles.headingDesign}`,
                         start: 'top 80%',
                    }
               });

               headingTl
                    .from(`.${styles.headingDesign}`, {
                         y: 50,
                         opacity: 0,
                         duration: 1,
                         ease: 'power3.out'
                    })
                    .from(`.${styles.headingDesign} h1`, {
                         scale: 0.5,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'back.out(1.7)'
                    }, '-=0.6');

               // Feature cards
               gsap.from(`.${styles.featuresCard}`, {
                    scrollTrigger: {
                         trigger: `.${styles.featuresGrid}`,
                         start: 'top 80%',
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
               });

               // Icons
               gsap.from(`.${styles.fcCardIcon}`, {
                    scrollTrigger: {
                         trigger: `.${styles.featuresGrid}`,
                         start: 'top 80%',
                    },
                    scale: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    delay: 0.2,
                    ease: 'back.out(1.7)'
               });

          }, featuresRef);

          return () => ctx.revert();
     }, []);


     return (
          <section id="features" className={styles.features} ref={featuresRef}>
               <div className={`side-line ${styles.leftLine}`}></div>
               <div className={`side-line ${styles.rightLine}`}></div>

               <div className={styles.featuresContent}>
                    <div className={`heading-design ${styles.headingDesign}`}>
                         <div className="flower top">
                              <img src="/images/flower-top.svg" alt="flower-top" />
                         </div>
                         <h1>Key Features</h1>
                         <div className="flower bottom">
                              <img src="/images/flower-top.svg" alt="flower-bottom" />
                         </div>
                         <p>
                              Truck Bilty Offers Online Software For Transporters & Brokers for Creating and managing
                              Loading Slip, Bilty/LR, Invoice. you can create professional looking Documents form
                              your Phone or Computer and Share to party by Email or WhatsApp
                         </p>
                    </div>
                    <div className={styles.featuresGrid}>
                         {featuresData.map((feature, index) => (
                              <div key={index} className={styles.featuresCard}>
                                   <div className={styles.fcCardIcon}>
                                        <img src={feature.icon} alt={feature.title} />
                                   </div>
                                   <div className={styles.fcCardContent}>
                                        <div className={styles.title}>{feature.title}</div>
                                        <p>{feature.description}</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
