import React from "react";
import { motion } from "framer-motion";

export default function Card({
  title,
  subtitle,
  footer,
  children,
  gradient = "from-brand-indigo to-brand-violet",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} shadow-md hover:shadow-xl`}
    >
      <div className="bg-white rounded-2xl h-full p-5 flex flex-col">
        <div className="mb-2">
          {title && (
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-indigo to-brand-violet">
              {title}
            </h3>
          )}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex-1">{children}</div>
        {footer && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
}
