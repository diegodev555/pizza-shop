import { motion } from 'framer-motion';
import pbjLogo from '../assets/pbj-logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAnimation?: boolean;
  showGlow?: boolean;
  linkTo?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const glowVariants: any = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 0.9, 0.6],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const Logo = ({
  className = '',
  size = 'md',
  showAnimation = false,
  showGlow = false,
}: LogoProps) => {
  const img = (
    <img
      src={pbjLogo}
      alt="PB&J - Pizza, Burgers & Joy"
      className={`${sizeMap[size]} object-cover rounded-full ${className}`}
      style={{ filter: showGlow ? 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.4))' : undefined }}
    />
  );

  if (showAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex"
      >
        {showGlow ? (
          <motion.div
            className="relative inline-flex"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          >
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />
            {img}
          </motion.div>
        ) : (
          img
        )}
      </motion.div>
    );
  }

  if (showGlow) {
    return (
      <div className="relative inline-flex">
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />
        {img}
      </div>
    );
  }

  return img;
};