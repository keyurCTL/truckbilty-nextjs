'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Reviews.module.css';
import { reviewsData } from './common/reviewsData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
     const [index, setIndex] = useState(0);
     const [isPaused, setIsPaused] = useState(false);

     const sliderRef = useRef(null);
     const headingRef = useRef(null);
     const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
     const reviewWrapperRef = useRef(null);

     useEffect(() => {
          if (isPaused) return;

          const timer = setInterval(() => {
               if (!sliderRef.current) return;

               gsap.to(sliderRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    onComplete: () => {
                         setIndex((prev) => (prev + 1) % reviewsData.length);

                         gsap.fromTo(
                              sliderRef.current,
                              { opacity: 0, y: 20 },
                              { opacity: 1, y: 0, duration: 0.5 }
                         );
                    }
               });
          }, 4000);

          return () => clearInterval(timer);
     }, [isPaused]);

     useEffect(() => {
          const ctx = gsap.context(() => {

               // Animate heading on scroll
               gsap.from(headingRef.current, {
                    scrollTrigger: {
                         trigger: headingRef.current,
                         start: 'top 80%',
                         toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: -30,
                    duration: 1
               });

               // Animate stats cards with stagger
               gsap.from(statsRefs.current, {
                    scrollTrigger: {
                         trigger: statsRefs.current[0],
                         start: 'top 80%',
                         toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.2,
                    duration: 0.8
               });

               // Animate review wrapper
               gsap.from(reviewWrapperRef.current, {
                    scrollTrigger: {
                         trigger: reviewWrapperRef.current,
                         start: 'top 80%',
                         toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    delay: 0.5
               });
          }, sliderRef);

          return () => ctx.revert();
     }, []);

     const handleMouseEnter = () => {
          setIsPaused(true);
     };

     const handleMouseLeave = () => {
          setIsPaused(false);
     };


     return (
          <section className={styles.reviews} id="reviews">
               <div className={`side-line ${styles.leftLine}`}></div>
               <div className={`side-line ${styles.rightLine}`}></div>

               <div className={styles.reviewsContainer}>
                    {/* Heading */}
                    <div className="heading-design" ref={headingRef}>
                         <div className="flower top">
                              <img src="/images/flower-top.svg" alt="flower-top" />
                         </div>
                         <h1 className={styles.reviewsHeading}>Trusted By Thousands</h1>
                         <div className="flower bottom">
                              <img src="/images/flower-top.svg" alt="flower-bottom" />
                         </div>
                    </div>

                    <div className={styles.reviewsDevider}>
                         {/* Stats */}
                         <div className={styles.statsGrid}>
                              {[
                                   ['1+ Lakh', 'Documents Created'],
                                   ['1.5+ Lakh', 'Bilty Created'],
                                   ['4.7 Star', 'User Rating'],
                                   ['2500+', 'Trusted by Users']
                              ].map(([title, sub], i) => (
                                   <div className={styles.statsBg} key={i} ref={(el) => {
                                        statsRefs.current[i] = el;
                                   }}>
                                        <div className={styles.statsTitle}>{title}</div>
                                        <div className={styles.statsSubTitle}>{sub}</div>
                                   </div>
                              ))}
                         </div>

                         {/* Right Side: Hanging Review Slider */}
                         <div
                              className={styles.reviewWrapper}
                              ref={reviewWrapperRef}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                         >
                              <div className={styles.hangingString}></div>
                              <div className={styles.reviewBg}>
                                   <div className={styles.sliderContent} ref={sliderRef}>
                                        <h3 className={styles.reviewerName}>{reviewsData[index].name}</h3>
                                        <div className={styles.stars}>
                                             {"★".repeat(reviewsData[index].rating)}
                                        </div>
                                        <p className={styles.reviewText}>{reviewsData[index].text}</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Reviews;
