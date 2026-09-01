"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useSectionReveal
 *
 * Shared IntersectionObserver hook for section entrance reveals.
 * Returns [ref, isVisible].
 *
 * Attach `ref` to the section element you want to observe.
 * When it enters the viewport, `isVisible` becomes true and the observer
 * disconnects (one-shot reveal).
 *
 * Pair with the `.rm-reveal` CSS utility class and add `.is-visible` to the
 * section when `isVisible` is true:
 *
 *   const [ref, visible] = useSectionReveal();
 *   <section ref={ref} className={`my-section${visible ? " is-visible" : ""}`}>
 *     <div className="rm-reveal">...</div>
 *   </section>
 *
 * @param {string} [rootMargin="0px 0px -8% 0px"] - Viewport margin for early trigger.
 * @returns {[React.RefObject, boolean]}
 */
export function useSectionReveal(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, isVisible];
}
