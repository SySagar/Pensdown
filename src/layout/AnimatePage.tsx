import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimateFrameProps {
  children: ReactNode;
}

const AnimatePage: React.FC<AnimateFrameProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
