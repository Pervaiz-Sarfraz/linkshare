import React from "react";
import { ValuesData } from "../constants/index";
import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiShield, FiStar, FiZap } from "react-icons/fi";

const icons = [FiZap, FiHeart, FiShield, FiTarget, FiStar];

const JobAbout = () => {
  return (
    <section className="value-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="value-title">Values That Drive Us</h2>
      </motion.div>

      <div className="value-grid">
        {ValuesData.slice(0, 3).map((item, i) => {
          const Icon = icons[i] || FiZap;
          return (
            <motion.div
              key={item.id}
              className="value-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="value-card-header">
                <div className="value-card-icon">
                   <Icon size={24} />
                </div>
                <span className="value-card-title">{item.title}</span>
              </div>
              <p className="value-card-desc">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default JobAbout;