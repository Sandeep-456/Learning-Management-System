import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-[2000]"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="w-12 h-12 rounded-full border-4 border-transparent border-t-indigo-500 border-r-violet-500"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
