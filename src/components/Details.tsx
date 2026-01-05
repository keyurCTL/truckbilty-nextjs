'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Details.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AccordionItem {
     title: string;
     image: string;
     content: string[][];
}

const accordionData: AccordionItem[] = [
     {
          title: 'Bilty / LR',
          image: '/images/bilty-truck.png',
          content: [
               ['Create ToPay / Billed Bilty', 'Create Empty Bilty', 'Auto / Manual LR No', 'Add Ship To Details'],
               ['Add Insurance Details', 'Bank Details', 'Signature & Logo', 'Highlighted Advance Amount']
          ]
     },
     {
          title: 'Invoice',
          image: '/images/invoice-truck.png',
          content: [
               ['Auto Number and Date', 'Auto Invoice From Bilty', 'Auto Invoice Form Load Advice'],
               ['Full Details', 'Logo and Signature', 'Bank Account Details']
          ]
     },
     {
          title: 'Load Advice',
          image: '/images/loading-slip-truck.png',
          content: [
               ['Auto Number & Date', 'Rate And Type', 'Bank Account Details', 'Truck And Driver Details'],
               ['Logo and Signature', 'Guarantee Weight', 'Adavance Entery', 'Metrial Details']
          ]
     }
];

export default function Details() {
     const [activeIndex, setActiveIndex] = useState(0);
     const [currentImage, setCurrentImage] = useState(accordionData[0].image);
     const imageRef = useRef<HTMLImageElement>(null);
     const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
     const headingRef = useRef<HTMLDivElement>(null);
     const sectionRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          // Animate accordion content
          contentRefs.current.forEach((content, index) => {
               if (content) {
                    if (index === activeIndex) {
                         gsap.to(content, {
                              height: 'auto',
                              duration: 0.4,
                              ease: 'power2.out'
                         });
                    } else {
                         gsap.to(content, {
                              height: 0,
                              duration: 0.4,
                              ease: 'power2.in'
                         });
                    }
               }
          });
     }, [activeIndex]);

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
          }, sectionRef);

          return () => ctx.revert();
     }, []);

     const handleAccordionClick = (index: number) => {
          if (index === activeIndex) return;

          const newImage = accordionData[index].image;

          // Truck going away animation
          gsap.to(imageRef.current, {
               opacity: 0,
               scale: 0,
               x: 0,
               y: -40,
               duration: 0.5,
               ease: 'power2.in',
               onComplete: () => {
                    setCurrentImage(newImage);

                    // New truck comes from far
                    gsap.fromTo(
                         imageRef.current,
                         {
                              opacity: 0,
                              scale: 0,
                              x: 0,
                              y: 40
                         },
                         {
                              opacity: 1,
                              scale: 1,
                              x: 0,
                              y: 0,
                              duration: 0.8,
                              ease: 'power3.out'
                         }
                    );
               }
          });

          setActiveIndex(index);
     };

     return (
          <section className={styles.details} id="details" ref={sectionRef}>
               <div className={`side-line ${styles.leftLine}`}></div>
               <div className={`side-line ${styles.rightLine}`}></div>
               <div className={styles.detailsContainer}>
                    <div className="heading-design" ref={headingRef}>
                         <div className="flower top">
                              <img src="/images/flower-top.svg" alt="flower-top" />
                         </div>
                         <h1 className={styles.detailsHeading}>Transport Documents</h1>
                         <div className="flower bottom">
                              <img src="/images/flower-top.svg" alt="flower-bottom" />
                         </div>
                    </div>
                    <div className={styles.biltyContainer}>
                         {/* LEFT: ACCORDION */}
                         <div className={styles.biltyAccordion}>
                              {accordionData.map((item, index) => (
                                   <div
                                        key={index}
                                        className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
                                   >
                                        <button
                                             className={styles.accordionHeader}
                                             onClick={() => handleAccordionClick(index)}
                                        >
                                             <img src="/images/horn.svg" alt="horn" /> {item.title}
                                        </button>
                                        <div
                                             ref={(el) => {
                                                  contentRefs.current[index] = el;
                                             }}
                                             className={styles.accordionContent}
                                        >
                                             {item.content.map((column, colIndex) => (
                                                  <ul key={colIndex}>
                                                       {column.map((text, textIndex) => (
                                                            <li key={textIndex}>{text}</li>
                                                       ))}
                                                  </ul>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>

                         {/* RIGHT: IMAGE PREVIEW */}
                         <div className={styles.biltyPreview}>
                              <img ref={imageRef} src={currentImage} alt="Document Preview" />
                         </div>
                    </div>
               </div>
          </section>
     );
}