import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessage } from '../context/MessageContext';
import { cross } from "../assets/Logo/index.js";
import { FiCheckCircle } from 'react-icons/fi';

const flyVariants = {
  hidden: { x: 100, opacity: 0, scale: 0.95 },
  visible: {
    x: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 30 }
  },
  exit: {
    x: 60, opacity: 0, scale: 0.92,
    transition: { duration: 0.2, ease: "easeIn" }
  },
};

export default function Message() {
  const { message, setMessage } = useMessage();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="container"
          variants={flyVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
            <FiCheckCircle
              style={{
                color: 'var(--success)',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            />
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {message}
            </p>
          </div>
          <div
            className="closeBtn"
            onClick={() => setMessage(null)}
            role="button"
            aria-label="Close notification"
          >
            {cross ? (
              <img src={cross} alt="close" />
            ) : (
              <span style={{ fontSize: '1rem' }}>✕</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
