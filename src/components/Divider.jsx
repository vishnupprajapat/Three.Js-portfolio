import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Divider = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const setPath = () => {
    const svgWidth = svgRef.current.getBoundingClientRect().width;
    const pathString = `M 0 50 Q ${svgWidth / 2} 50 ${svgWidth} 50`;
    pathRef.current.setAttribute('d', pathString);
  };

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        const rect = svg.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const pathString = `M 0 50 Q ${rect.width / 2} ${relativeY} ${rect.width} 50`;
        gsap.to(path, {
          attr: {
            d: pathString,
          },
          duration: 1.8,
          ease: 'elastic.out(2, 0.3)',
        });
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth >= 768) {
        setPath();
        gsap.to(path, {
          attr: {
            d: pathRef.current.getAttribute('d'),
          },
          duration: 1.8,
          ease: 'elastic.out(2, 0.3)',
        });
      }
    };

    setPath(); // Set initial path
    window.addEventListener('resize', setPath);
    svg.addEventListener('mousemove', handleMouseMove);
    svg.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', setPath);
      svg.removeEventListener('mousemove', handleMouseMove);
      svg.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <div className="w-full relative c-space">
      <svg ref={svgRef} width="100%" height="100" className="">
        <path fill="transparent" stroke="#414141" strokeWidth="1" ref={pathRef} className="string" />
      </svg>
    </div>
  );
};

export default Divider;
