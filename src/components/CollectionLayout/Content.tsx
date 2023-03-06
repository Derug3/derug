import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const content = () => (
  <motion.div
    className="flex flex-col items-left h-10 text-left justify-center"
    style={{
      borderBottom: "2px solid rgb(9, 194, 246)",
    }}
    variants={FADE_DOWN_ANIMATION_VARIANTS}
  >
    <motion.div
      className="flex flex-row flex-wrap items-center font-mono font-bold "
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      LISTING STATS
    </motion.div>
  </motion.div>
);
