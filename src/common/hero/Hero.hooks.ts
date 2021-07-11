import useMeasure from "react-use-measure"

export const useHeroBound = () => {
  const [ref, bound] = useMeasure()
  return [ref, bound] as const
}