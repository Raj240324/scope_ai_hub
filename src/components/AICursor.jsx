import { useEffect, useRef } from "react";

export default function AICursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      // Subtracting 50% offset handles perfect centering natively via fixed CSS and coordinates translation.
      cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    };

    // Event delegation is used here to natively support React Client-Side routes
    // without having to re-bind standard query selectors whenever view components change via hydration.
    const handleMouseOver = (e) => {
      if (e.target.closest("button, a, [role='button'], input[type='submit'], input[type='button'], .cursor-pointer")) {
        cursor.classList.add("hover");
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("button, a, [role='button'], input[type='submit'], input[type='button'], .cursor-pointer")) {
        cursor.classList.remove("hover");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    // Use document event delegation for SPA dynamic nodes
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="ai-cursor"></div>;
}
