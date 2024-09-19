import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
// import Lenis from 'lenis';
import Preloader from './Preloader';
import Navbar from '../sections/Navbar';

const Wrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      window.scrollTo(0, 0);
      const timer2 = setTimeout(() => {
        document.body.classList.add('scroll');
      }, 3000);
      return () => {
        clearTimeout(timer2);
      };
    }, 2900);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  //   useEffect(() => {
  //     const lenis = new Lenis();
  //     const raf = (time) => {
  //       lenis.raf(time);
  //       requestAnimationFrame(raf);
  //     };
  //     requestAnimationFrame(raf);

  //     return () => {
  //       lenis.destroy(); // Cleanup Lenis instance
  //       cancelAnimationFrame(raf); // Cleanup RAF loop
  //     };
  //   }, []);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      {!isLoading && (
        <>
          <div className="wrapper">{children}</div>
          <Navbar />
        </>
      )}
    </>
  );
};

export default Wrapper;
