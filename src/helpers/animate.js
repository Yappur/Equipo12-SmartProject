import { gsap } from "gsap";

//MODALES
export const slideInUp = (element) => {
  gsap.fromTo(
    element,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 }
  );
};

export const slideOutDown = (element, onComplete) => {
  gsap.to(element, {
    y: 100,
    opacity: 0,
    duration: 0.4,
    onComplete: onComplete || null,
  });
};
