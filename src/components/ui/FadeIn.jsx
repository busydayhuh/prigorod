import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function FadeIn({
  children,
  delay = 0,
  immediate = false,
  className,
  direction = "up",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (immediate || !ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, ref]);

  return (
    <div
      ref={ref}
      className={cn(`fade-${direction}`, immediate && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
