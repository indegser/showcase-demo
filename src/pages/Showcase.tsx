import { Design } from "common/hero/Design";
import { Hero } from "common/hero/Hero";
import { Listener } from "common/hero/Listener";
import { HeroMeasure } from "./HeroMeasure";
import { useViewStore } from "./Showcase.hooks";

export function Showcase() {
  const isViewReady = useViewStore((s) => s.height > 0);
  return (
    <div>
      <HeroMeasure />
      {isViewReady && (
        <>
          <Hero />
          <Listener />
          <Design />
        </>
      )}
    </div>
  );
}
