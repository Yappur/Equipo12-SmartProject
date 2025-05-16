import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * ANIMACIONES MODALES
 */
export const slideInUp = (element) => {
  if (!element) return null;
  return gsap.fromTo(
    element,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 }
  );
};

export const slideOutDown = (element, onComplete) => {
  if (!element) return null;
  return gsap.to(element, {
    y: 100,
    opacity: 0,
    duration: 0.4,
    onComplete: onComplete || null,
  });
};

/**
 * ANIMACIONES UNIVERSALES
 * Función unificada para crear animaciones al hacer scroll o en la carga inicial
 */
export const createAnimation = (element, options = {}) => {
  if (!element) return null;

  const defaults = {
    y: 30,
    x: 0,
    opacity: 0,
    duration: 0.7,
    delay: 0,
    ease: "power2.out",
    useScrollTrigger: false,
    start: "top 80%",
  };

  const settings = { ...defaults, ...options };

  // Configuración base de la animación
  const animConfig = {
    y: 0,
    x: 0,
    opacity: 1,
    duration: settings.duration,
    delay: settings.delay,
    ease: settings.ease,
  };

  // Añadir ScrollTrigger si es necesario
  if (settings.useScrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: element,
      start: settings.start,
      toggleActions: "play none none none",
    };
  }

  // Crear y devolver la animación
  return gsap.fromTo(
    element,
    {
      y: settings.y,
      x: settings.x,
      opacity: 0,
    },
    animConfig
  );
};

/**
 * ANIMACIÓN DE SECCIÓN HERO
 * Versión simplificada que funciona con elementos individuales o un objeto con refs
 */
export const animateHero = (elements) => {
  if (!elements) return null;

  // Comprobar si nos pasaron un objeto con referencias o elementos directos
  const title = elements.title || elements.titleRef?.current;
  const description = elements.description || elements.descriptionRef?.current;
  const button = elements.button || elements.buttonRef?.current;
  const image = elements.image || elements.imageRef?.current;

  // Verificar que al menos tenemos el elemento principal
  if (!title) {
    console.warn("Elemento hero principal no encontrado");
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Añadir animaciones secuenciales
  tl.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });

  // Añadir el resto de elementos si existen
  if (description) {
    tl.fromTo(
      description,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );
  }

  if (button) {
    tl.fromTo(
      button,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.2"
    );
  }

  if (image) {
    tl.fromTo(
      image,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );
  }

  return tl;
};

/**
 * ANIMACIÓN DE GRUPOS DE ELEMENTOS
 * Anima varios elementos con opciones de stagger
 */
export const animateGroup = (elements, options = {}) => {
  if (!elements) return null;

  // Asegurar que elements sea un array
  const elementsArray = Array.isArray(elements) ? elements : [elements];
  // Filtrar elementos nulos
  const validElements = elementsArray.filter(
    (el) => el !== null && el !== undefined
  );

  if (validElements.length === 0) return null;

  const defaults = {
    y: 30,
    x: 0,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
    useScrollTrigger: true,
    start: "top 80%",
  };

  const settings = { ...defaults, ...options };

  // Configuración base de la animación
  const animConfig = {
    y: 0,
    x: 0,
    opacity: 1,
    duration: settings.duration,
    stagger: settings.stagger,
    ease: settings.ease,
  };

  // Añadir ScrollTrigger si es necesario
  if (settings.useScrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: validElements[0], // Usar el primer elemento como trigger
      start: settings.start,
      toggleActions: "play none none none",
    };
  }

  // Crear y devolver la animación
  return gsap.fromTo(
    validElements,
    {
      y: settings.y,
      x: settings.x,
      opacity: 0,
    },
    animConfig
  );
};

/**
 * INICIALIZADOR DE ANIMACIONES
 * Versión simplificada que es menos propensa a errores
 */
export const initAnimations = (refs) => {
  // Limpiar animaciones previas
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Timeline para animaciones iniciales (no dependen de scroll)
  const initialTl = gsap.timeline();

  // Animaciones para cada sección

  // Hero section
  if (refs.hero?.title) {
    const heroTl = animateHero({
      title: refs.hero?.title,
      description: refs.hero?.description,
      button: refs.hero?.button,
      image: refs.hero?.image,
    });

    if (heroTl) initialTl.add(heroTl, 0);
  }

  // Vacantes section - con ScrollTrigger
  if (refs.vacantes) {
    const titles = Array.isArray(refs.vacantes.title)
      ? refs.vacantes.title
      : [refs.vacantes.title];

    // Títulos con efecto stagger
    if (titles.some((t) => t)) {
      animateGroup(titles, {
        useScrollTrigger: true,
        stagger: 0.2,
      });
    }

    // Descripción
    if (refs.vacantes.description) {
      createAnimation(refs.vacantes.description, {
        useScrollTrigger: true,
        delay: 0.2,
      });
    }

    // Contenido
    if (refs.vacantes.content) {
      createAnimation(refs.vacantes.content, {
        useScrollTrigger: true,
        delay: 0.3,
        y: 40,
      });
    }
  }

  // Recruiters section
  if (refs.recruiters) {
    // Imagen
    if (refs.recruiters.image) {
      createAnimation(refs.recruiters.image, {
        useScrollTrigger: true,
        x: -30,
        y: 0,
      });
    }

    // Título
    if (refs.recruiters.title) {
      createAnimation(refs.recruiters.title, {
        useScrollTrigger: true,
        delay: 0.2,
      });
    }

    // Descripción
    if (refs.recruiters.description) {
      createAnimation(refs.recruiters.description, {
        useScrollTrigger: true,
        delay: 0.3,
      });
    }

    // Beneficios con stagger
    if (refs.recruiters.benefits && refs.recruiters.benefits.length > 0) {
      animateGroup(refs.recruiters.benefits, {
        useScrollTrigger: true,
        stagger: 0.1,
        delay: 0.3,
      });
    }

    // Botón
    if (refs.recruiters.button) {
      createAnimation(refs.recruiters.button, {
        useScrollTrigger: true,
        delay: 0.5,
      });
    }
  }

  // Herramientas section
  if (refs.herramientas) {
    // Header
    if (refs.herramientas.header) {
      createAnimation(refs.herramientas.header, {
        useScrollTrigger: true,
      });
    }

    // Cards con stagger
    if (refs.herramientas.cards && refs.herramientas.cards.length > 0) {
      animateGroup(refs.herramientas.cards, {
        useScrollTrigger: true,
        stagger: 0.15,
        y: 40,
      });
    }
  }

  return () => {
    initialTl.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf("*");
  };
};

export const initAnimationsWithRefs = initAnimations;
