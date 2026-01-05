'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
     {
          icon: '/images/bilty.svg',
          title: 'Bilty / LR',
          description: 'Generate / Edit / Delete - Topay or To be Billed Bilty and Share by Email or WhatsApp to Customer'
     },
     {
          icon: '/images/load-advice.svg',
          title: 'Load Advice',
          description: 'Generate Loading Slip By Entering Truck Number, From - To, Rate and Customer name'
     },
     {
          icon: '/images/invoice.svg',
          title: 'Invoice',
          description: 'Generate Invoice From Loading Slip & Topay Bilty Or By Entering Manual Data'
     },
     {
          icon: '/images/quotation.svg',
          title: 'Create Party',
          description: 'Create Consignor/Consignee By Entering GST No. Only, Name And Address Will be Auto fill'
     },
     {
          icon: '/images/income.svg',
          title: 'Manage Account',
          description: 'Manage Bilty Advance and Invoice Amount and keep track on payment'
     },
     {
          icon: '/images/invoice.svg',
          title: 'Quick Reports',
          description: 'Generate Ladger Report, Bilty / LR Report, Invoice Report, Advance Report Etc.'
     }
];

export default function Features() {
     const featuresRef = useRef<HTMLElement>(null);

     useEffect(() => {
          const ctx = gsap.context(() => {
               // Features heading container
               gsap.from(`.${styles.headingDesign}`, {
                    scrollTrigger: {
                         trigger: `.${styles.headingDesign}`,
                         start: 'top 80%',
                         toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
               });

               // Features heading h1
               gsap.from(`.${styles.headingDesign} h1`, {
                    scrollTrigger: {
                         trigger: `.${styles.headingDesign}`,
                         start: 'top 80%',
                         toggleActions: 'play none none reverse'
                    },
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'back.out(1.7)'
               });

               // Features cards
               gsap.from(`.${styles.featuresCard}`, {
                    scrollTrigger: {
                         trigger: `.${styles.featuresGrid}`,
                         start: 'top 80%',
                         toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    delay: 0.2,
                    ease: 'power3.out'
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
