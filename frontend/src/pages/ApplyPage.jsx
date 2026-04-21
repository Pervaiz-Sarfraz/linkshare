import React from "react";
import { useParams } from "react-router-dom";
import ApplyForm from "../comp/ApplyForm";
import { motion } from "framer-motion";

const ApplyPage = () => {
  const { id } = useParams(); 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem 1rem' }}
    >
      <ApplyForm jobId={id} />
    </motion.div>
  );
};

export default ApplyPage;
