import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 }); // Tracks mouse position relative to page
  const scrollOffset = useRef(0); // Tracks the current scroll offset

  useEffect(() => {
    const main = document.querySelector('#root');

    const handleMouseMove = (event) => {
      // Track mouse position relative to the entire page (including scroll)
      mousePosition.current.x = event.pageX;
      mousePosition.current.y = event.pageY - scrollOffset.current; // Adjust for scroll

      gsap.to(cursorRef.current, {
        x: mousePosition.current.x,
        y: mousePosition.current.y + scrollOffset.current, // Add back the scroll offset
        duration: 0.3, // Slightly shorter duration for a more responsive feel
        ease: 'power2.out',
      });
    };

    const handleScroll = () => {
      scrollOffset.current = window.scrollY;

      // Update the cursor position on scroll based on the last known mouse position
      gsap.to(cursorRef.current, {
        y: mousePosition.current.y + scrollOffset.current, // Adjust the Y position with scroll
        duration: 0.3, // Ensure it animates smoothly with scrolling
        ease: 'power2.out',
      });
    };

    main.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Clean up event listeners on component unmount
    return () => {
      main.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Custom cursor element */}
      <div
        className="cursor w-5 h-5 z-[99999999999999999999] bg-white rounded-full absolute pointer-events-none"
        ref={cursorRef}
      />
    </>
  );
};

export default Cursor;
