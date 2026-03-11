export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE } }
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.55, ease: EASE } }
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EASE } }
};

export const fadeRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EASE } }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: EASE } }
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

export const staggerItem = fadeUp;

export const fadeUpMobile = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE } }
};
