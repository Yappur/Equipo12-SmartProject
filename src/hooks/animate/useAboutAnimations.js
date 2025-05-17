import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAboutAnimations() {
  const headerRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutTextRef = useRef(null);
  const missionRef = useRef(null);
  const impactRef = useRef(null);
  const differencesRef = useRef(null);
  const teamTitleRef = useRef(null);
  const teamCardsRef = useRef([]);

  const createAnimation = (element, options = {}) => {
    if (!element) return null;

    const defaults = {
      y: 30,
      x: 0,
      opacity: 0,
      duration: 0.7,
      delay: 0,
      ease: "power2.out",
      start: "top 80%",
    };

    const settings = { ...defaults, ...options };

    return gsap.fromTo(
      element,
      {
        y: settings.y,
        x: settings.x,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: settings.duration,
        delay: settings.delay,
        ease: settings.ease,
        scrollTrigger: {
          trigger: element,
          start: settings.start,
          toggleActions: "play none none none",
        },
      }
    );
  };

  const animateGroup = (elements, options = {}) => {
    if (!elements || elements.length === 0) return null;

    const validElements = Array.isArray(elements)
      ? elements.filter((el) => el !== null && el !== undefined)
      : [elements].filter((el) => el !== null && el !== undefined);

    if (validElements.length === 0) return null;

    const defaults = {
      y: 30,
      x: 0,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      start: "top 80%",
    };

    const settings = { ...defaults, ...options };

    return gsap.fromTo(
      validElements,
      {
        y: settings.y,
        x: settings.x,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: settings.duration,
        stagger: settings.stagger,
        ease: settings.ease,
        scrollTrigger: {
          trigger: validElements[0],
          start: settings.start,
          toggleActions: "play none none none",
        },
      }
    );
  };

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    if (aboutImageRef.current && aboutTextRef.current) {
      createAnimation(aboutImageRef.current, { x: -30, y: 0 });
      createAnimation(aboutTextRef.current, { delay: 0.2 });
    }

    if (missionRef.current && impactRef.current) {
      createAnimation(missionRef.current, { delay: 0.1 });
      createAnimation(impactRef.current, { delay: 0.2 });
    }

    if (differencesRef.current) {
      createAnimation(differencesRef.current);
    }

    if (teamTitleRef.current) {
      createAnimation(teamTitleRef.current);
    }

    if (teamCardsRef.current.length > 0) {
      animateGroup(teamCardsRef.current, {
        stagger: 0.15,
        y: 40,
        delay: 0.2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return {
    headerRef,
    aboutImageRef,
    aboutTextRef,
    missionRef,
    impactRef,
    differencesRef,
    teamTitleRef,
    teamCardsRef,
  };
}
