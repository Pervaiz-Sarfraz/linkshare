import React from "react";
import AddCompany from "../comp/AddCompany";
import { motion } from "framer-motion";

const AddCompanyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem 1rem' }}
    >
      <AddCompany />
    </motion.div>
  );
};

export default AddCompanyPage;
