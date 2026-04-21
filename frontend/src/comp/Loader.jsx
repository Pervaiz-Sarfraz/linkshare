import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="loader-container" style={{ minHeight: '100vh', flexDirection: 'column', gap: '1.5rem' }}>
      <motion.div
        className="loader"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.5, 1]
        }}
        style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
          boxShadow: '0 0 30px var(--brand-glow)'
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          fontFamily: 'Poppins',
          fontWeight: 700,
          color: 'var(--brand)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.9rem'
        }}
      >
        Loading LinkShare...
      </motion.p>
    </div>
  );
};

export default Loader;
