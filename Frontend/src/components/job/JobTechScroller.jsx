import { motion } from "framer-motion";
import { JobIcons } from "../../data/jobIcons";
import { useEffect, useRef, useState } from "react";

export default function JobTechScroller({ stack }) {
  const containerRef = useRef();
  const firstSetRef = useRef();
  const [firstSetWidth, setFirstSetWidth] = useState(0);

  // Measure the width of the first set container
  useEffect(() => {
    if (firstSetRef.current) {
      setFirstSetWidth(firstSetRef.current.offsetWidth);
    }
  }, [stack]);

  // Duplicate the stack for seamless flow
  const duplicatedStack = [...stack, ...stack];

  return (
    <div className="overflow-hidden py-1 w-35">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Tech Stack</h3>
      <motion.div
        className="flex gap-4"
        animate={{ x: [0, -firstSetWidth] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: Math.max(firstSetWidth / 40, 10),
        }}
      >
        {/* First set wrapped for measurement */}
        <div ref={firstSetRef} className="flex gap-4">
          {stack.map((tech, i) => {
            const item = JobIcons[tech];
            return (
              <item.Icon
                key={`first-${i}`}
                size={30}
                style={{ color: item.color }}
                className="flex-shrink-0 opacity-90"
              />
            );
          })}
        </div>

        {/* Second set for seamless attachment */}
        {stack.map((tech, i) => {
          const item = JobIcons[tech];
          return (
            <item.Icon
              key={`second-${i}`}
              size={30}
              style={{ color: item.color }}
              className="flex-shrink-0 opacity-90"
            />
          );
        })}
      </motion.div>
    </div>
  );
}
