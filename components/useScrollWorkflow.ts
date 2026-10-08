"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Scroll events only read scrollY; all layout reads happen when geometry changes. */
export function useScrollWorkflow(stepCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const geometry = useRef({ start: 0, distance: 210, enabled: false });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    if (!track || !scene) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollFrame = 0;
    let measureFrame = 0;
    let anchorFrame = 0;
    let previousAnchor: string | null = null;
    let disposed = false;

    const restoreAnchoring = () => {
      if (previousAnchor !== null) {
        document.documentElement.style.overflowAnchor = previousAnchor;
        previousAnchor = null;
      }
    };
    const preventExpansionJump = () => {
      // A restored viewport can initially sit below the compact server-rendered
      // scene. Adding its scroll track must not push that viewport's anchor down
      // by the entire travel distance. Suppress native anchoring only while React
      // commits this height change; normal page anchoring then resumes.
      if (previousAnchor === null) {
        previousAnchor = document.documentElement.style.overflowAnchor;
        document.documentElement.style.overflowAnchor = "none";
      }
      window.cancelAnimationFrame(anchorFrame);
      anchorFrame = window.requestAnimationFrame(() => {
        anchorFrame = window.requestAnimationFrame(restoreAnchoring);
      });
    };

    const update = () => {
      scrollFrame = 0;
      const { start, distance, enabled } = geometry.current;
      if (!enabled) return;
      const next = Math.max(0, Math.min(stepCount - 1, Math.round((window.scrollY - start) / distance)));
      if (activeRef.current !== next) {
        activeRef.current = next;
        setActive(next);
      }
    };
    const measure = () => {
      measureFrame = 0;
      if (disposed) return;
      const sceneHeight = scene.getBoundingClientRect().height;
      const top = 20;
      const enabled = !motion.matches && sceneHeight + top * 2 <= window.innerHeight;
      const distance = window.innerWidth < 900 ? 180 : 210;
      if (enabled !== geometry.current.enabled) preventExpansionJump();
      geometry.current = {
        start: track.getBoundingClientRect().top + window.scrollY - top,
        distance,
        enabled,
      };
      track.style.setProperty("--workflow-scene-height", `${sceneHeight}px`);
      track.style.setProperty("--workflow-travel", `${distance * (stepCount - 1)}px`);
      setScrollMode((previous) => previous === enabled ? previous : enabled);
      update();
    };
    const requestMeasure = () => {
      if (!measureFrame) measureFrame = window.requestAnimationFrame(measure);
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(requestMeasure);
    observer.observe(scene);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestMeasure, { passive: true });
    window.addEventListener("orientationchange", requestMeasure);
    window.addEventListener("pageshow", requestMeasure);
    window.addEventListener("load", requestMeasure);
    window.addEventListener("hashchange", requestMeasure);
    motion.addEventListener("change", requestMeasure);
    document.fonts.ready.then(() => { if (!disposed) requestMeasure(); });
    requestMeasure();

    return () => {
      disposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(measureFrame);
      window.cancelAnimationFrame(anchorFrame);
      restoreAnchoring();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener("orientationchange", requestMeasure);
      window.removeEventListener("pageshow", requestMeasure);
      window.removeEventListener("load", requestMeasure);
      window.removeEventListener("hashchange", requestMeasure);
      motion.removeEventListener("change", requestMeasure);
    };
  }, [stepCount]);

  const selectStep = useCallback((index: number) => {
    const { enabled, start, distance } = geometry.current;
    if (enabled) {
      // An immediate native jump keeps the focused rail in place and avoids a
      // competing animation while the user's scroll remains the source of truth.
      window.scrollTo({ top: start + index * distance, behavior: "instant" });
    }
    activeRef.current = index;
    setActive(index);
  }, []);

  return { active, scrollMode, trackRef, sceneRef, selectStep };
}
