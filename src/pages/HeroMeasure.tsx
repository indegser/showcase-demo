import { useEffect } from "react";
import useMeasure from "react-use-measure";
import { useScrollStore, useViewStore } from "./Showcase.hooks";

export function HeroMeasure() {
  const [ref, bound] = useMeasure();

  useEffect(() => {
    if (bound.width > 0 && bound.height > 0) {
      useViewStore.setState({
        width: bound.width,
        height: bound.height,
      });
    }
  }, [bound]);

  useEffect(() => {
    const handleScroll = () => {
      useScrollStore.setState({ y: window.pageYOffset });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        visibility: "hidden",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: -9999,
      }}
    ></div>
  );
}
