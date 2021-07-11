import { MotionValue, useSpring, useViewportScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";

export const useIntersection = (
  opacity: MotionValue<number>,
  y: MotionValue<number>
) => {
  const diff = useSpring(0, {
    mass: 0.1,
    bounce: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const prevY = useRef(0);
  const { scrollY } = useViewportScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scale = scaleLinear().domain([0.8, 1]).range([0, 1]).clamp(true);

    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];

      const rectY = entry.boundingClientRect.y;

      // if (rectY > prevY.current) {
      //   console.log("up");
      // } else {
      //   console.log("down");
      // }

      setVisible(entry.isIntersecting);
      prevY.current = rectY;
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
    if (!visible) return;

    const prevY = scrollY.get();
    const unsub = scrollY.onChange((y) => {
      diff.set(Math.abs(y - prevY));
      console.log(diff.get());
    });

    return () => {
      unsub();
    };
  }, [visible, scrollY, diff]);

  return [ref, diff];
};
