import { MotionValue, useSpring, useViewportScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const useIntersection = (
  opacity: MotionValue<number>,
  y: MotionValue<number>
) => {
  const diff = useSpring(0, {
    mass: 0.1,
    bounce: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      console.log(entry.boundingClientRect.y, scrollY.get());
      setVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [1],
      rootMargin: "-100% 0px 1px 0px",
    });

    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const prevY = scrollY.get();
    const unsub = scrollY.onChange((y) => {
      const diffVal = y - prevY;
      diff.set((diffVal < 0 ? 1200 : 0) + diffVal);
    });

    return () => {
      unsub();
    };
  }, [visible, scrollY, diff]);

  return [ref, diff];
};
