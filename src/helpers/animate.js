import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// Función para animar elementos con fade in desde abajo
export const fadeInUp = (element, delay = 0, duration = 0.8) => {
  if (!element) return null;

  return gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
    }
  );
};

// Función para animar elementos al hacer scroll
export const createScrollAnimation = (element, options = {}) => {
  if (!element) return null;

  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    start: "top 80%",
  };

  const settings = { ...defaults, ...options };

  return gsap.fromTo(
    element,
    {
      y: settings.y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: settings.duration,
      ease: settings.ease,
      scrollTrigger: {
        trigger: element,
        start: settings.start,
        toggleActions: "play none none none",
      },
    }
  );
};

// Función para animar la sección hero - MEJORADA
export const animateHero = (elements) => {
  if (
    !elements ||
    !elements.title ||
    !elements.description ||
    !elements.button ||
    !elements.image
  ) {
    console.warn("Elementos hero no encontrados");
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    elements.title,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }
  )
    .fromTo(
      elements.description,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      elements.button,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.2"
    )
    .fromTo(
      elements.image,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );

  return tl;
};

// Función para animar secciones al hacer scroll - MEJORADA
export const animateOnScroll = (elements, options = {}) => {
  if (!elements) {
    console.warn("No se encontraron elementos para animar en scroll");
    return null;
  }

  // Asegurar que elements sea un array
  const elementsArray = Array.isArray(elements) ? elements : [elements];

  const animations = [];

  elementsArray.forEach((element, index) => {
    if (!element) return;

    const delay = options.stagger
      ? index * options.stagger
      : options.delay || 0;
    const animation = createScrollAnimation(element, { ...options, delay });
    animations.push(animation);
  });

  return animations;
};
// Inicializar animaciones básicas - VERSIÓN PARA REFS
export const initAnimationsWithRefs = (refs) => {
  // Limpiar animaciones previas
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Hero section
  if (refs.hero) {
    animateHero(refs.hero);
  }

  // Animaciones al hacer scroll
  if (refs.vacantes) {
    animateOnScroll(refs.vacantes.title);
    animateOnScroll(refs.vacantes.description, { delay: 0.2 });
    animateOnScroll(refs.vacantes.content, { delay: 0.4 });
  }

  if (refs.recruiters) {
    animateOnScroll(refs.recruiters.image, { x: -50, y: 0 });
    animateOnScroll(refs.recruiters.title, { delay: 0.2 });
    animateOnScroll(refs.recruiters.description, { delay: 0.4 });
    animateOnScroll(refs.recruiters.benefits, { stagger: 0.1 });
    animateOnScroll(refs.recruiters.button, { delay: 0.6 });
  }

  if (refs.herramientas) {
    animateOnScroll(refs.herramientas.header);
    animateOnScroll(refs.herramientas.cards, { stagger: 0.15 });
  }

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
};
