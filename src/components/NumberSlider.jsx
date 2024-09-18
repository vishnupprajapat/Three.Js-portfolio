import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NumberSlider = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Default active number (8 in your case)
  const sliderRef = useRef(null);

  // Array of numbers to display
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // Function to animate the number change
  const animateChange = (index) => {
    const sliderItems = sliderRef.current.children;

    gsap.to(sliderItems, {
      opacity: 0.5,
      scale: 0.8,
      duration: 0.3,
      ease: 'power1.out',
      stagger: 0.1,
    });
    gsap.to(sliderItems[index], {
      opacity: 1,
      scale: 1.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    animateChange(activeIndex);
  }, [activeIndex]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="slider-container" ref={sliderRef}>
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`slider-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}>
          {number}
        </div>
      ))}
    </div>
  );
};

export default NumberSlider;
