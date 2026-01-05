'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Pricing.module.css';
import { plansData } from './common/plansData';

const Pricing = () => {
     const [activePlan, setActivePlan] = useState(plansData[0]);
     const milestoneRef = useRef<HTMLDivElement>(null);
     const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
     const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
     const boardRef = useRef<HTMLDivElement>(null);
     const milestoneWrapperRef = useRef<HTMLDivElement>(null);

     // Initial load animation
     useEffect(() => {
          const ctx = gsap.context(() => {
               // Animate board entrance
               gsap.from(boardRef.current, {
                    x: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
               });

               // Animate milestone entrance
               gsap.from(milestoneWrapperRef.current, {
                    x: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
               });

               // Stagger animate rows
               gsap.from(rowRefs.current, {
                    x: -30,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.3,
               });
          });

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

     // Handle plan selection with arrow rotation
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

     return (
          <>
               <section className={styles.pricing} id="pricing">
                    <div className={`side-line ${styles.leftLine}`}></div>
                    <div className={`side-line ${styles.rightLine}`}></div>

                    <div className={styles.pricingContainer}>
                         <div className="heading-design">
                              <div className="flower top">
                                   <img src="/images/flower-top.svg" alt="flower-top" />
                              </div>
                              <h1>Choose Your Plan</h1>
                              <div className="flower bottom">
                                   <img src="/images/flower-top.svg" alt="flower-bottom" />
                              </div>
                         </div>

                         <div className={styles.plansConatiner}>
                              <div className={styles.boardWrapper}>
                                   <div className={styles.board} ref={boardRef}>
                                        {plansData.map((plan, index) => (
                                             <div
                                                  key={plan.id}
                                                  ref={(el) => {(rowRefs.current[index] = el)}}
                                                  className={`${styles.row} ${
                                                       activePlan.id === plan.id ? styles.highlight : ''
                                                  }`}
                                                  onClick={() => handlePlanClick(plan, index)}
                                                  style={{ cursor: 'pointer' }}
                                             >
                                                  <div
                                                       className={styles.arrow}
                                                       ref={(el) => {(arrowRefs.current[index] = el)}}
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
                                   <div className={styles.milestone} ref={milestoneRef}>
                                        <div className={styles.milestoneTop}>
                                             <h3>{activePlan.name}</h3>
                                             <h5>₹{activePlan.price}/-</h5>
                                        </div>

                                        <div className={styles.milestoneBody}>
                                             <span className={styles.tc}>* T & C Apply</span>
                                             <h6>{activePlan.duration}</h6>

                                             <p>
                                                  Users: <span>{activePlan.limits.users}</span>
                                             </p>
                                             <p>
                                                  Companies: <span>{activePlan.limits.companies}</span>
                                             </p>
                                             <p>
                                                  Branches: <span>{activePlan.limits.branches}</span>
                                             </p>
                                             <p>
                                                  Bilties: <span>{activePlan.limits.bilties}</span>
                                             </p>
                                             <p>
                                                  Invoices: <span>{activePlan.limits.invoices}</span>
                                             </p>
                                             <p>
                                                  Loading Slips:{' '}
                                                  <span>{activePlan.limits.loadingSlips}</span>
                                             </p>
                                        </div>

                                        <div className={styles.basePlatform}>
                                             <a className="my-btn btn-primary">Register Now</a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          </>
     );
};

export default Pricing;