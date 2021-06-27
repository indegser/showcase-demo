import { useMemo } from "react"

export const usePreloadImages = (frameCount: number, getCurrentFrame: (index: number) => string) => {
  const images = useMemo(() => {
    if (typeof window == 'undefined') return new Map();

    const images = new Map()
  
    for (let i = 1; i < frameCount; i++) {
      const image = new Image();
      image.src = getCurrentFrame(i)
      images.set(i.toString(), image)
    }

    return images
  }, [getCurrentFrame, frameCount])
  
  return images as Map<string, HTMLImageElement>
}
