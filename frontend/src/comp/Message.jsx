import { useEffect } from 'react';
import {motion,AnimatePresence } from 'framer-motion';
import { useMessage } from '../context/MessageContext';
import { cross } from "../assets/Logo/index.js";
const flyVariants = {
  hidden: { y: -1000, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -1000, opacity: 0, transition: { duration: 0.1 } },
};

export default function Message() {
  const { message, setMessage } = useMessage();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);
console.log("motion",motion);

  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="container"
        variants={flyVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{message}</p>
        <div className="closeBtn" onClick={() => setMessage(null)} role="button">
          <img src={cross} alt="close" height="100%" width="100%" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
