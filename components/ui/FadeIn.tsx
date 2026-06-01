'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
  className?: string;
  staggerChildren?: number;
  duration?: number;
};

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  fullWidth = false,
  className = '',
  staggerChildren,
  duration = 0.8,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Premium smooth ease-out (like Apple)

  const directionOffsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionOffsets[direction];

  const variants = {
    hidden: { 
      opacity: 0, 
      x: offset.x, 
      y: offset.y 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { 
        duration: duration, 
        ease: customEasing,
        delay: delay,
        when: 'beforeChildren',
        staggerChildren: staggerChildren,
      } 
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Sub-component for children of a staggered parent
export function FadeInStaggerItem({ children, className = '', style }: { children: ReactNode, className?: string, style?: React.CSSProperties }) {
  const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: customEasing }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
