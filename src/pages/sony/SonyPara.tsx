import styled from "@emotion/styled";
import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
  title: string;
  desc: string;
  diff: MotionValue;
  index: number;
}

export const SonyPara = ({ title, desc, diff, index }: Props) => {
  const opacity = useTransform(
    diff,
    [400 * index, 400 * index + 100, 400 * index + 300, 400 * (index + 1)],
    [0, 1, 1, index === 2 ? 1 : 0]
  );

  const y = useTransform(diff, [400 * index, 400 * (index + 1)], [25, -25]);

  return (
    <Container style={{ opacity, y }}>
      <Content>
        <div>{title}</div>
        <div className="desc">{desc}</div>
      </Content>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  top: 0;
  position: absolute;
  font-size: 15px;
  line-height: 1.48;
  font-weight: 600;
  letter-spacing: 0.012em;
  margin: 0;

  .desc {
    color: #6e6e73;
  }
`;
