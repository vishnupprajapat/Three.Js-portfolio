import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 }); // Tracks mouse position
  useEffect(() => {
    const main = document.querySelector('#root');
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      mousePosition.current.x = clientX;
      mousePosition.current.y = clientY;
      gsap.to(cursorRef.current, {
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        duration: 0.03,
        ease: 'power1.in',
      });
    };
    main.addEventListener('mousemove', handleMouseMove);
    return () => {
      main.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div
      className="cursor w-5 h-5 z-[99999999999999999999] bg-white rounded-full fixed pointer-events-none"
      ref={cursorRef}
    />
  );
};

export default Cursor;
