import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TextAnimate from './TextAnimate';

const opacity = {
  initial: {
    opacity: 0,
    fontSize: '1rem',
  },

  enter: {
    opacity: 0.75,
    transition: { duration: 2.05, delay: 2 },
    fontSize: '3rem',
  },
};

const slideUp = {
  initial: {
    top: 0,
    left: 0,
  },

  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.05 },
  },
};

const words = ['Energy', 'Innovation', 'Performance', 'Athletic', 'Champion', 'Victory', 'Passion', 'Just Do It'];

const Preloader = () => {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 2000 : 350,
    );
  }, [index]);

  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${
    dimensions.height
  } Q${dimensions.width / 2} ${dimensions.height + 300} 0 ${dimensions.height}  L0 0`;

  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${
    dimensions.height
  } Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },

    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 2.05 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed  h-screen w-full flex items-center justify-center z-[99999999]">
      {dimensions.width > 0 && (
        <>
          <TextAnimate />
          <AnimatePresence mode="sync">
            <motion.p
              variants={opacity}
              initial="initial"
              animate="enter"
              className="flex text-white items-center absolute mt-[14vw] z-[999999] text-[80vw]">
              <span className="block w-[10px] z-[999999] relative h-[10px] bg-[#7e22ce] rounded-full mr-[10px]"></span>
              {words[index]}
            </motion.p>
          </AnimatePresence>
          <svg className="absolute top-0 w-full curve">
            <motion.path variants={curve} initial="initial" exit="exit" className="fill-[#0f172a]"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
