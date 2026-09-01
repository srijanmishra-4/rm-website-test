"use client";

import { usePathname } from "next/navigation";

/**
 * PageTransition
 *
 * Wraps the page <main> content with a subtle fade+lift animation on
 * every route change. Uses the `.rm-page-enter` CSS class defined in
 * `styles/motion.css` which animates opacity and a 6px vertical translate
 * over 280ms.
 *
 * The `key` prop on the wrapper div forces React to remount the element on
 * each pathname change, which re-triggers the CSS animation naturally.
 *
 * No external animation library is used.
 * The animation is disabled automatically when the user has
 * `prefers-reduced-motion: reduce` set at the OS level (handled in motion.css).
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="rm-page-enter">
      {children}
    </div>
  );
}
