import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useScroll } from "react-use-gesture";
import { useRafLoop } from "react-use";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { usePreloadImages } from "./Cartier.hooks";
import { useCallback } from "react";

const frameCount = 109;
const imageWidth = 1280;
const imageHeight = 688;

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

  const images = usePreloadImages(frameCount, currentFrame);

  const drawImage = useCallback(
    (image: HTMLImageElement | undefined) => {
      const context = ref.current?.getContext("2d");
      if (context == null || image == null) return;

      const scale = Math.max(
        bound.width / imageWidth,
        bound.height / imageHeight
      );

      // get the top left position of the image
      const x = bound.width / 2 - (imageWidth / 2) * scale;
      const y = bound.height / 2 - (imageHeight / 2) * scale;

      context.drawImage(image, x, y, imageWidth * scale, imageHeight * scale);
    },
    [bound]
  );

  const updateImage = (index: number) => {
    const canvas = ref.current!;
    const context = canvas.getContext("2d");
    if (context == null) return;

    const scale = Math.max(
      canvas.offsetWidth / imageWidth,
      canvas.offsetHeight / imageHeight
    );

    // get the top left position of the image
    const x = canvas.offsetWidth / 2 - (imageWidth / 2) * scale;
    const y = canvas.offsetHeight / 2 - (imageHeight / 2) * scale;

    const imageAtIndex = images.get(index.toString());

    if (imageAtIndex == null) return;

    context.drawImage(
      imageAtIndex,
      x,
      y,
      imageWidth * scale,
      imageHeight * scale
    );
  };

  useEffect(() => {
    if (bound.width === 0) return;
    const image = images.get(indexRef.current.next.toString());

    drawImage(image);
  }, [drawImage, bound.width, images]);

  useRafLoop(() => {
    const { prev, next } = indexRef.current!;
    if (next === prev) return;

    const nextPrev = next > prev ? prev + 1 : prev - 1;
    indexRef.current.prev = nextPrev;
    updateImage(nextPrev);
  }, true);

  const handleScroll = useCallback(() => {
    console.log("called?");
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
    <div style={{ minHeight: "300vh" }}>
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
