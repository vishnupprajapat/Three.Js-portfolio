import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

function SmoothScrolling({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = lenisRef.current.lenis;

    function update(time) {
      lenis.raf(time * 500);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        easing: (t) => t,
        smoothWheel: true,
        duration: 0.5,
      }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
