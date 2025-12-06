/* eslint-disable lingui/no-unlocalized-strings */

import { HandHeartIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export const DonationBanner = () => (
  <motion.a
    href="https://opencollective.com/elevate"
    target="_blank"
    whileHover={{ height: 48 }}
    initial={{ opacity: 0, y: -50, height: 32 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
    className="hidden w-screen items-center justify-center gap-x-2 bg-primary-800 text-xs font-bold leading-relaxed text-neutral-50 lg:flex"
  >
    <HandHeartIcon weight="bold" size={14} className="shrink-0" />
    <span>
      If this project has helped you, please consider donating to Elevate as we're running
      out of server resources with the increasing number of users.
    </span>
  </motion.a>
);
