import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const content = () => (
  <motion.div
    className="flex flex-col items-center bg-blue-200"
    variants={FADE_DOWN_ANIMATION_VARIANTS}
  >
    <motion.div
      className="flex flex-row flex-wrap items-center gap-1 px-4 "
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      contenttttt
    </motion.div>
  </motion.div>
);
