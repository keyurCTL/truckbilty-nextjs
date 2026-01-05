'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Pricing.module.css';
import { plansData } from './common/plansData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
     const [activePlan, setActivePlan] = useState(plansData[0]);
     const [expandedAccordion, setExpandedAccordion] = useState<string | null>(plansData[0].id);
     const milestoneRef = useRef<HTMLDivElement>(null);
     const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
     const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
     const boardRef = useRef<HTMLDivElement>(null);
     const milestoneWrapperRef = useRef<HTMLDivElement>(null);
     const sectionRef = useRef<HTMLDivElement>(null);
     const headingRef = useRef<HTMLDivElement>(null);

     // Initial load animation with ScrollTrigger
     useEffect(() => {
          const ctx = gsap.context(() => {
               // Heading animation
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

               // Board animation
               if (boardRef.current) {
                    gsap.from(boardRef.current, {
                         scrollTrigger: {
                              trigger: boardRef.current,
                              start: 'top 85%',
                              toggleActions: 'play none none none'
                         },
                         x: -100,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out',
                    });
               }

               // Milestone animation
               if (milestoneWrapperRef.current) {
                    gsap.from(milestoneWrapperRef.current, {
                         scrollTrigger: {
                              trigger: milestoneWrapperRef.current,
                              start: 'top 85%',
                              toggleActions: 'play none none none'
                         },
                         x: 100,
                         opacity: 0,
                         duration: 0.8,
                         ease: 'power3.out',
                    });
               }

               // Rows stagger animation
               if (rowRefs.current.length > 0) {
                    gsap.from(rowRefs.current, {
                         scrollTrigger: {
                              trigger: boardRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none none'
                         },
                         x: -30,
                         opacity: 0,
                         duration: 0.5,
                         stagger: 0.1,
                         ease: 'power2.out',
                         delay: 0.4,
                    });
               }

               // Rotate the first arrow by default
               if (arrowRefs.current[0]) {
                    gsap.to(arrowRefs.current[0], {
                         scrollTrigger: {
                              trigger: boardRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none none'
                         },
                         rotation: 90,
                         duration: 0.4,
                         delay: 0.9,
                         ease: 'back.out(1.7)',
                    });
               }
          }, sectionRef);

          return () => ctx.revert();
     }, []);

     // Animate milestone content when plan changes
     useEffect(() => {
          if (!milestoneRef.current) return;

          const ctx = gsap.context(() => {
               const tl = gsap.timeline();

               // Fade out and slide up
               tl.to(milestoneRef.current, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
               })
                    // Fade in and slide down
                    .fromTo(
                         milestoneRef.current,
                         { y: 20, opacity: 0 },
                         {
                              y: 0,
                              opacity: 1,
                              duration: 0.4,
                              ease: 'power3.out',
                         }
                    );
          });

          return () => ctx.revert();
     }, [activePlan]);

     // Handle plan selection with arrow rotation (Desktop)
     const handlePlanClick = (plan: typeof plansData[0], index: number) => {
          setActivePlan(plan);

          // Rotate all arrows back to default
          arrowRefs.current.forEach((arrow, i) => {
               if (arrow && i !== index) {
                    gsap.to(arrow, {
                         rotation: 0,
                         duration: 0.3,
                         ease: 'power2.out',
                    });
               }
          });

          // Rotate selected arrow
          if (arrowRefs.current[index]) {
               gsap.to(arrowRefs.current[index], {
                    rotation: 90,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
               });
          }

          // Add a subtle scale effect to the selected row
          rowRefs.current.forEach((row, i) => {
               if (row) {
                    if (i === index) {
                         gsap.to(row, {
                              scale: 1.02,
                              duration: 0.3,
                              ease: 'power2.out',
                         });
                    } else {
                         gsap.to(row, {
                              scale: 1,
                              duration: 0.3,
                              ease: 'power2.out',
                         });
                    }
               }
          });
     };

     // Handle accordion toggle (Mobile/Tablet)
     const handleAccordionToggle = (planId: string) => {
          setExpandedAccordion(expandedAccordion === planId ? null : planId);
     };

     return (
          <>
               <section className={styles.pricing} id="pricing" ref={sectionRef}>
                    <div className={`side-line ${styles.leftLine}`}></div>
                    <div className={`side-line ${styles.rightLine}`}></div>

                    <div className={styles.pricingContainer}>
                         <div className="heading-design" ref={headingRef}>
                              <div className="flower top">
                                   <img src="/images/flower-top.svg" alt="flower-top" />
                              </div>
                              <h1>Choose Your Plan</h1>
                              <div className="flower bottom">
                                   <img src="/images/flower-top.svg" alt="flower-bottom" />
                              </div>
                         </div>

                         {/* Desktop View */}
                         <div className={styles.plansConatiner}>
                              <div className={styles.boardWrapper}>
                                   <div className={styles.board} ref={boardRef}>
                                        {plansData.map((plan, index) => (
                                             <div
                                                  key={plan.id}
                                                  ref={(el) => { rowRefs.current[index] = el }}
                                                  className={`${styles.row} ${activePlan.id === plan.id ? styles.highlight : ''}`}
                                                  onClick={() => handlePlanClick(plan, index)}
                                                  style={{ cursor: 'pointer' }}
                                             >
                                                  <div
                                                       className={styles.arrow}
                                                       ref={(el) => { arrowRefs.current[index] = el }}
                                                  >
                                                       <img src="/images/arrow.svg" alt="" />
                                                  </div>

                                                  <p className={styles.title}>
                                                       {plan.name} <span>| {plan.duration}</span>
                                                  </p>

                                                  <p className={styles.price}>₹{plan.price}</p>
                                             </div>
                                        ))}
                                   </div>

                                   {/* Stand */}
                                   <div className={styles.stand}>
                                        <span></span>
                                        <span></span>
                                   </div>
                              </div>

                              {/* Milestone Block */}
                              <div className={styles.milestoneWrapper} ref={milestoneWrapperRef}>
                                   <div className={styles.ground}></div>
                                   <div className={styles.milestone}>
                                        <div className={styles.milestoneTop}>
                                             <h3>{activePlan.name}</h3>
                                             <h5>₹{activePlan.price}/-</h5>
                                        </div>

                                        <div className={styles.milestoneBody} ref={milestoneRef}>
                                             <span className={styles.tc}>* T & C Apply</span>
                                             <h6>{activePlan.duration}</h6>
                                             <div className={styles.tagLine}>{activePlan.tagline}</div>

                                             <p>Users: <span>{activePlan.limits.users}</span></p>
                                             <p>Companies: <span>{activePlan.limits.companies}</span></p>
                                             <p>Branches: <span>{activePlan.limits.branches}</span></p>
                                             <p>Bilties: <span>{activePlan.limits.bilties}</span></p>
                                             <p>Invoices: <span>{activePlan.limits.invoices}</span></p>
                                             <p>Loading Slips: <span>{activePlan.limits.loadingSlips}</span></p>
                                        </div>

                                        <div className={styles.basePlatform}>
                                             <a
                                                  className='my-btn btn-primary'
                                                  href="https://beta.truckbilty.com/auth/sign-up"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                             >
                                                  Register Now
                                             </a>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Mobile/Tablet Accordion View */}
                         <div className={styles.accordionContainer}>
                              {plansData.map((plan, index) => (
                                   <div
                                        key={plan.id}
                                        className={`${styles.accordionItem} ${expandedAccordion === plan.id ? styles.expanded : ''}`}
                                   >
                                        <div
                                             className={styles.accordionHeader}
                                             onClick={() => handleAccordionToggle(plan.id)}
                                        >
                                             <div className={styles.accordionHeaderLeft}>
                                                  <h3>{plan.name}</h3>
                                                  <p className={styles.accordionDuration}>{plan.duration}</p>
                                             </div>
                                             <div className={styles.accordionHeaderRight}>
                                                  <p className={styles.accordionPrice}>₹{plan.price}</p>
                                                  <div className={`${styles.accordionIcon} ${expandedAccordion === plan.id ? styles.rotated : ''}`}>
                                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                       </svg>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className={styles.accordionContent}>
                                             <div className={styles.accordionBody}>
                                                  <span className={styles.accordionTc}>* T & C Apply</span>
                                                  <div className={styles.accordionTagline}>{plan.tagline}</div>

                                                  <div className={styles.accordionLimits}>
                                                       <p>Users: <span>{plan.limits.users}</span></p>
                                                       <p>Companies: <span>{plan.limits.companies}</span></p>
                                                       <p>Branches: <span>{plan.limits.branches}</span></p>
                                                       <p>Bilties: <span>{plan.limits.bilties}</span></p>
                                                       <p>Invoices: <span>{plan.limits.invoices}</span></p>
                                                       <p>Loading Slips: <span>{plan.limits.loadingSlips}</span></p>
                                                  </div>

                                                  <div className={styles.mblBtnWrapper}>
                                                       <a
                                                            className='my-btn btn-primary'
                                                            href="https://beta.truckbilty.com/auth/sign-up"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                       >
                                                            Register Now
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>
          </>
     );
};

export default Pricing;