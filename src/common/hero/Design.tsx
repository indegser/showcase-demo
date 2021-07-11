import styled from "@emotion/styled";
import { useHeroBound } from "./Hero.hooks";

export const Design = () => {
  const [ref, bound] = useHeroBound();
  return (
    <Page ref={ref}>
      <p>
        AirPods Max combine high-fidelity audio with industry-leading Active
        Noise Cancellation to deliver an unparalleled listening experience. Each
        part of their custom-built driver works to produce sound with ultra-low
        distortion across the audible range. From deep, rich bass to accurate
        mids and crisp, clean highs, you’ll hear every note with a new sense of
        clarity.
      </p>
    </Page>
  );
};

const Page = styled.div`
  height: 150vh;
  width: 100vw;
  background: #f0f0f0;
  padding: 90px 20px;
`;
