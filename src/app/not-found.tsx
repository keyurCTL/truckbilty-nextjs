'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './error.module.css';

export default function NotFound() {

     return (
          <div className={styles.errorContainer}>
               <div className={styles.content}>
                    {/* Image Section */}
                    <div className={styles.imageWrapper}>
                         <img
                              src="/images/truck-404.png"
                              alt="Broken Indian truck with worried driver"
                         />
                    </div>

                    {/* Text Section */}
                    <div className={styles.textContent}>
                         <h1 className={styles.title}>404</h1>
                         <div className={styles.subTitle}>
                              <h3>कुछ तो हुआ है,</h3>
                              <h3>लगता है आप रास्ता भूल गए हैं !</h3>
                         </div>
                         <p className={styles.description}>
                              Looks like this truck broke down before reaching its destination.
                              The page you’re looking for doesn’t exist or took a wrong turn.
                         </p>

                         <div className={styles.actions}>
                              <Link href="/" className="my-btn btn-primary">
                                   Go Back Home
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
}
