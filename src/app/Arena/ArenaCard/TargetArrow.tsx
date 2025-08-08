import { motion } from "framer-motion"


export default function TargetArrow() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
      className="absolute translate-y-[1.5rem] sm:-translate-y-[2rem] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300/80 rounded-full" 
      style={{ boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.14)' }}
    />
  )
}