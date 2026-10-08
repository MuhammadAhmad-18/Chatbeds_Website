"use client";
import { useEffect } from "react";
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(
        ".section-heading, .pillar, .ai-grid article, .property-list article",
      )
      .forEach((element) => {
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-ready")
        .forEach((element) => element.classList.remove("reveal-ready"));
    };
  }, []);
  return null;
}
