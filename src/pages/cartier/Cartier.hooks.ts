import { useCallback, useEffect, useMemo, useState } from "react"

export type FrameState = {
  width: number
  height: number
  loaded: true
} | {
  loaded: false
}

export const usePreloadImages = (frameCount: number, getCurrentFrame: (index: number) => string) => {
  const [frameState, setFrameState] = useState<FrameState>({ loaded: false });
  const frames = useMemo(() => new Map<string, HTMLImageElement>(), [])

  const handleLoad = useCallback((event) => {
    const image = event.target;
    if (image == null) return;

    setFrameState({
      width: image.naturalWidth,
      height: image.naturalHeight,
      loaded: true,
    })
  }, [])

  useEffect(() => {
    for (let i = 1; i < frameCount; i++) {
      const image = new Image();
      image.src = getCurrentFrame(i)
      frames.set(i.toString(), image)
  
      if (i === 1) {
        image.onload = handleLoad
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return { frames, ...frameState }
}
