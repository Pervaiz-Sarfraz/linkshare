import React from "react";
import AddJob from "../comp/AddJob";
import { motion } from "framer-motion";

const AddJobPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem 1rem' }}
    >
      <AddJob />
    </motion.div>
  );
};

export default AddJobPage;
