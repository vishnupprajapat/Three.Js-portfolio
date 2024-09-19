import React from 'react';
import splitText from '../../utils/splitText';
import { motion } from 'framer-motion';

const TextAnimate = () => {
  const mainText = splitText('Vishnu');

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 150,
    },
    reveal: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div className="absolute  h-screen z-[999] w-full flex flex-col justify-center items-center  bg-[#0f172a]">
      <motion.h1
        className="text-[4rem] md:text-[14vw] translate-y-[-20%] xl:text-[184px] font-futura font-semibold text-white uppercase overflow-hidden"
        initial="hidden"
        animate="reveal"
        transition={{ staggerChildren: 0.2 }}>
        {mainText.map((char, idx) => {
          return (
            <motion.span
              variants={charVariants}
              transition={{
                duration: 3,
                stiffness: 450,
                damping: 100,
                ease: 'backInOut',
              }}
              style={{
                display: 'inline-block',
              }}
              key={idx}>
              {char}
            </motion.span>
          );
        })}
      </motion.h1>
    </motion.div>
  );
};

export default TextAnimate;
