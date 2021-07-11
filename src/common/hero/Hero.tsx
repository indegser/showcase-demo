import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { SonyPara } from "pages/sony/SonyPara";
import { useIntersection } from "./useIntersection";

const paras = [
  {
    title: "헤드폰에 도전하다",
    desc: `업계 최고 수준의 노이즈 캔슬링 기술과 소니 최고 고음질 LDAC를
    지원하는 WF-1000XM4가 출시되었습니다. 출시와 동시에 전량 완판된 바로
    그 이어폰이에요. 예약판매 혜택으로 오직 29CM 사용자에게만 13% 쿠폰을
    지급합니다. 음악을 재생하는 순간, 기다림을 후회하지 않을 거예요.`,
  },
  {
    title: "몰입을 넘어 소통까지",
    desc: `10년 연속 1위 헤드폰 브랜드 소니 헤드폰. 음질부터 디자인까지 모든 것이 뛰어나 노이즈 캔슬링 헤드폰의 대명사가 되었습니다. 오직 29CM에서는 한정판 사일런트 화이트 에디션까지 놀라운 혜택으로 만나볼 수 있습니다.`,
  },
  {
    title: "차원이 다른 음악 감상, Walkman",
    desc: "소니의 워크맨은 스튜디오 원음을 그대로 담아 고해상도 음원(High Resolution Audio)를 완벽하게 재생할 수 있습니다. 전문적인 음악 감상을 선호하는 이들에게 소니 워크맨과 헤드폰 조합을 추천합니다. 매일 듣던 음악이 새롭게 들리는 놀라운 경험을 하게 될 거예요.",
  },
];

export const Hero = () => {
  const [ref, diff] = useIntersection();

  return (
    <Container>
      <Before>
        <h1>Sony.</h1>
        <p>
          소니는 반세기 동안 축적해온 독보적인 기술을 기반으로 음향기기 산업의
          발전을 선도하고 있습니다. 최상의 음질을 자랑하는 헤드폰과 이어폰부터
          스튜디오 원음을 그대로 담은 고해상도 음원(High Resolution Audio)를
          완벽하게 재생할 수 있는 워크맨까지, 엔터테인먼트 전반을 아우르는
          사운드 제품을 만듭니다.
        </p>
      </Before>
      <Parallax>
        <div style={{ height: 1200 }}></div>
        <StickyEl>
          <img
            src="/images/audio.jpeg"
            style={{ width: 500, marginLeft: -200, height: "auto" }}
          />
          <div style={{ position: "relative", height: 240 }}>
            {paras.map((para, i) => (
              <SonyPara key={para.title} {...para} index={i} diff={diff} />
            ))}
          </div>
          <div ref={ref} />
        </StickyEl>
      </Parallax>
    </Container>
  );
};

const Parallax = styled.div``;

const Before = styled.div`
  h1 {
    font-size: 56px;
    line-height: 1.07143;
    font-weight: 800;
    letter-spacing: -0.003em;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 1.51053;
    font-weight: 720;
    letter-spacing: 0.012em;
  }
`;

const Container = styled.section`
  width: 100vw;
  color: white;
  background: black;
  padding: 40px 20px;
  font-size: 32px;
  font-weight: 720;
  line-height: 1.4;

  --fade-distance: 100px;
  --is-visible-distance: 200px;
`;

const StickyEl = styled.div`
  position: sticky;
  bottom: 0;
`;

export const Para = styled(motion.div)`
  font-size: 15px;
  line-height: 1.48;
  font-weight: 600;
  letter-spacing: 0.012em;
  margin: 0;

  .desc {
    color: #6e6e73;
  }
`;
