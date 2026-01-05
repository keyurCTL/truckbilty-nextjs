'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
     const footerRef = useRef<HTMLElement | null>(null);
     const pathname = usePathname();
     const router = useRouter();

     const [year, setYear] = useState<number | null>(null);

     useEffect(() => {
          setYear(new Date().getFullYear());
     }, []);

     // Handle footer navigation to home sections
     const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
          e.preventDefault();

          if (pathname === '/') {
               // Already on home page, just scroll to section
               const target = document.getElementById(sectionId);
               if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
               return;
          }

          // Navigate to home page with hash
          router.push(`/#${sectionId}`);
     };

     useEffect(() => {
          if (!footerRef.current) return;

          const ctx = gsap.context(() => {
               gsap.from(`.${styles.footerTop} > div`, {
                    scrollTrigger: {
                         id: 'footer-top',
                         trigger: footerRef.current,
                         start: 'top 80%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
               });

               gsap.from(`.${styles.footerMiddle}`, {
                    scrollTrigger: {
                         id: 'footer-middle',
                         trigger: footerRef.current,
                         start: 'top 70%',
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
               });

               gsap.from(`.${styles.footerBottom}`, {
                    scrollTrigger: {
                         id: 'footer-bottom',
                         trigger: footerRef.current,
                         start: 'top 65%',
                    },
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
               });
          }, footerRef);

          return () => {
               ctx.revert();
          };
     }, []);

     return (
          <>

               <section ref={footerRef} className={styles.footer} id="footer">
                    <div className={styles.footerContainer}>
                         <div className={styles.footerTop}>
                              <div className={styles.ftOne}>
                                   <h4>Reach out us at</h4>
                                   <div className={styles.contactInfo}>
                                        <a href="mailto:truckbilty@gmail.com" className="contact-link">
                                             <img src="/images/envelope.svg" alt="envelope" />
                                             <span>truckbilty@gmail.com</span>
                                        </a>
                                        <a href="tel:+9196807067999" className="contact-link">
                                             <img src="/images/call.svg" alt="call" />
                                             <span>+91 968070 67999</span>
                                        </a>
                                        <a href="tel:+919998060916" className="contact-link">
                                             <img src="/images/call.svg" alt="call" />
                                             <span>+91 99980 60916</span>
                                        </a>
                                        <a href="tel:+917698945785" className="contact-link">
                                             <img src="/images/call.svg" alt="call" />
                                             <span>+91 76989 45785</span>
                                        </a>
                                   </div>
                              </div>

                              <div className={styles.ftTwo}>
                                   <img src="/images/logo/Truck Bilty-04.svg" alt="TruckBilty Logo" />
                              </div>

                              <div className={styles.ftThree}>
                                   <h4>Find Us On</h4>
                                   <div className={styles.socialLinks}>
                                        <a href="https://www.instagram.com/truckbilty" target="_blank">
                                             <img src="/images/insta.svg" alt="Instagram" />
                                        </a>
                                        <a href="https://www.facebook.com/truckbilty" target="_blank">
                                             <img src="/images/facebook.svg" alt="Facebook" />
                                        </a>
                                        <a href="https://youtube.com/@truckbilty" target="_blank">
                                             <img src="/images/youtube.svg" alt="Youtube" />
                                        </a>
                                        <a href="https://www.pintrest.com/truckbilty" target="_blank">
                                             <img src="/images/pintrest.svg" alt="Pinterest" />
                                        </a>
                                   </div>

                                   <div className={styles.contactInfo}>
                                        <a
                                             href="https://share.google/Eey8RK54WfCW36XL5"
                                             className="contact-link"
                                             target="_blank"
                                        >
                                             <img src="/images/location.svg" alt="location" />
                                             <span>
                                                  10, Keshar Arcade, Sector -8, Gandhidham, Kutch - 370201, Gujarat
                                             </span>
                                        </a>
                                        <a
                                             href="https://share.google/V1ozFFeQqr1lLo6pd"
                                             className="contact-link"
                                             target="_blank"
                                        >
                                             <img src="/images/location.svg" alt="location" />
                                             <span>
                                                  916, City Centre 2, Science City Rd, Sola, Ahmedabad, Gujarat
                                                  380060
                                             </span>
                                        </a>
                                   </div>
                              </div>
                         </div>

                         <div className={styles.footerMiddle}>
                              <div className={styles.appButtons}>
                                   <a href="#">
                                        <img src="/images/app-store-badge.svg" alt="App Store" />
                                   </a>
                                   <a href="#">
                                        <img src="/images/google-play-badge.svg" alt="Google Play" />
                                   </a>
                              </div>

                              <div className={styles.footerNavigation}>
                                   <Link href="/terms-and-conditions" target='_blank'>Terms & Conditions</Link>
                                   <Link href="/privacy-policy" target='_blank'>Privacy Policy</Link>
                                   <Link href="/refund-policy" target='_blank'>Refund Policy</Link>
                              </div>
                         </div>

                         <div className={styles.footerBottom}>
                              <div className={styles.copyrightContent}>
                                   <div>
                                        Website Design & Developed By{' '}
                                        <a href="https://challengetechnolabs.com/" target="_blank">
                                             Challenge Technolabs
                                        </a>
                                   </div>
                                   <div>Copyright ©{year ?? ''} All rights reserved by TruckBilty.</div>
                              </div>
                         </div>
                    </div>
               </section>
          </>
     );
};

export default Footer;
