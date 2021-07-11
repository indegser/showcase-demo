import styled from "@emotion/styled";

export const Listener = () => {
  return (
    <Container>
      <Image src="https://www.apple.com/v/airpods-max/c/images/overview/audio_quality_eq__bw20hke6z1ea_xlarge.jpg" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 82vh;
  object-fit: cover;
  position: absolute;
  top: -6vh;
`;
