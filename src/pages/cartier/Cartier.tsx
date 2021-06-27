import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useRafLoop } from "react-use";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { usePreloadImages } from "./Cartier.hooks";
import { useCallback } from "react";

const frameCount = 328;

interface Props {
  frameCount: number;
  getCurrentFrame: (index: number) => string;
}

export const Cartier = (props: Props) => {
  const [measureRef, bound] = useMeasure();
  const ref = useRef<HTMLCanvasElement>(null);

  const indexRef = useRef({ prev: 0, next: 1 });

  const currentFrame = (index: number) =>
    `/cook/cuts/image${index.toString().padStart(6, "0")}.png`;

  const { frames, ...frameState } = usePreloadImages(frameCount, currentFrame);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const context = ref.current?.getContext("2d");
      if (context == null) return;

      const frame = frames.get(frameIndex.toString())

      if (!frameState.loaded || frame == null) {
        console.warn(`Cannot render frame at ${frameIndex}`)
        return;
      }

      const { width, height } = frameState;
      const scale = Math.max(
        bound.width / width,
        bound.height / height
      );

      // get the top left position of the image
      const x = bound.width / 2 - (width / 2) * scale;
      const y = bound.height / 2 - (height / 2) * scale;

      context.drawImage(frame, x, y, width * scale, height * scale);
    },
    [bound, frames, frameState]
  );

  useEffect(() => {
    if (bound.width === 0 || !frameState.loaded) return;
    drawFrame(indexRef.current.next);
  }, [drawFrame, bound.width, frameState.loaded]);

  useRafLoop(() => {
    const { prev, next } = indexRef.current!;
    if (next === prev) return;

    const delta = Math.max(1, Math.log(Math.abs(next - prev)))
    const nextPrev = Math.round(next > prev ? prev + delta : prev - delta);
    indexRef.current.prev = nextPrev;
    drawFrame(nextPrev);
  }, true);

  const handleScroll = useCallback(() => {
    const html = document.documentElement;
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    indexRef.current.next = frameIndex;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div style={{ minHeight: "500vh" }}>
      <Canvas
        ref={mergeRefs([ref, measureRef])}
        width={bound.width}
        height={bound.height}
      />
    </div>
  );
};

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;
