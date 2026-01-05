'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerCleanup({ children }: { children: React.ReactNode }) {
     const pathname = usePathname();
     const prevPathname = useRef(pathname);
     const isCleaningUp = useRef(false);

     useEffect(() => {
          // Refresh ScrollTrigger when pathname changes to ensure correct positioning
          if (prevPathname.current !== pathname) {
               prevPathname.current = pathname;

               // Small timeout to allow new content to render before refreshing
               setTimeout(() => {
                    ScrollTrigger.refresh();
               }, 100);
          }
     }, [pathname]);

     // Additional cleanup on window events can be simplifed or removed if not needed 
     // For now, we'll keep a simple refresh on resize which ScrollTrigger does automatically, 
     // but we can add a listener for visibility change if needed, or just remove it to be safe.
     useEffect(() => {
          return () => {
               // Optional: clear any global ScrollTrigger listeners if absolutely necessary, 
               // but usually not needed if components clean up themselves.
          };
     }, []);

     return <>{children}</>;
}
