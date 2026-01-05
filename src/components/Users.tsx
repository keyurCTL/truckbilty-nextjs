'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Users.module.css';


const logos = [
  { src: '/images/userlogo-1.png', name: 'JRL Transport' },
  { src: '/images/userlogo-2.png', name: 'ARC' },
  { src: '/images/userlogo-3.png', name: 'HBR' },
  { src: '/images/userlogo-4.png', name: 'JRC' },
  { src: '/images/userlogo-5.png', name: 'KGC' },
  { src: '/images/userlogo-6.png', name: 'RDR' },
  { src: '/images/userlogo-7.png', name: 'RS' },
  { src: '/images/userlogo-8.png', name: 'NPGR' },
  { src: '/images/userlogo-9.png', name: 'HPR Tranport' },
  { src: '/images/userlogo-10.png', name: 'MRL' },
  { src: '/images/userlogo-11.png', name: 'UFC' },
  { src: '/images/userlogo-12.png', name: ' SS Group' },
  { src: '/images/userlogo-13.png', name: 'SRC' },
];

const Users = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;

    // Duplicate content ONCE for seamless looping
    marquee.innerHTML += marquee.innerHTML;

    const totalWidth = marquee.scrollWidth / 2;

    tweenRef.current = gsap.to(marquee, {
      x: -totalWidth,
      duration: 150,
      ease: 'linear',
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

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

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  return (
    <>
      <section className={styles.users} id="users" ref={sectionRef}>
        <div className={`side-line ${styles.leftLine}`}></div>
        <div className={`side-line ${styles.rightLine}`}></div>

        <div className={styles.usersContainer}>
          <div className="heading-design" ref={headingRef}>
            <div className="flower top">
              <img src="/images/flower-top.svg" alt="flower-top" />
            </div>
            <h1 className={styles.detailsHeading}>Our Users</h1>
            <div className="flower bottom">
              <img src="/images/flower-top.svg" alt="flower-bottom" />
            </div>
          </div>

          <div
            className={styles.marqueeWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.marquee} ref={marqueeRef}>
              {[...logos, ...logos].map((logo, index) => (
                <div className={styles.logoItem} key={index}>
                  <img src={logo.src} alt={logo.name} />
                  <span className={styles.tooltip}>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
