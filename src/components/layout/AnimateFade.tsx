import { motion } from 'framer-motion';
import * as React from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function AnimateFade({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ type: 'linear', duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
