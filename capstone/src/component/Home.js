import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import backgroundImg from '../img/hero_background.jpg';
import plantBackgroungImg from '../img/plant_background3.jpg';
import plantImg from '../img/watering-plants (1).png';
import alertImg from '../img/notification.png';
import infoBackgroundImg from '../img/Info_background.jpg';
import plantPot from '../img/plant-pot.png';
import planting from '../img/planting.png';
import user from '../img/registered.png';
import arrow from '../img/down-arrow.png';
import graph from '../img/monitor.png';

const BasicLayout = styled.div`
  height: 85vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  position: relative;
  align-item: center;
  justify-content: center;
`;
const HeroLayout = styled(BasicLayout)`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ValueLayout = styled(BasicLayout)`
  margin: 1rem;
  color: #000;
  background-image: url(${plantBackgroungImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 7.5rem 7.5rem;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
`;
const ValueDiv = styled.div`
  height: 100%;
  width: 25%;
  margin-right: 3rem;
  margin-left: 3rem;
  display: grid;
  grid-template-rows: 1fr 1fr 4fr;
  position: relative;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  padding: 2rem 1rem;
`;
const ValueImg = styled.img.attrs(({ src }) => ({
  src: src,
  alt: 'Article Cover',
}))`
  width: 4rem;
  margin: 0 auto;
`;
const InfoLayout = styled(BasicLayout)`
  background-image: url(${infoBackgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 5rem;
`;
const InfoItem = styled.div`
  margin: 1rem;
  margin-right: 3rem;
  margin-left: 3rem;
  display: grid;
  grid-template-rows: 0.3fr 0.3fr 0.3fr;
  position: relative;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  padding: 2rem 1rem;
`;
const Head = styled.div`
  grid-column: span 3;
`;
const Foot = styled.div`
  grid-column: span 3;
  display: flex;
  margin: 0 auto;
`;
const Box = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 8rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  padding: 2rem;
`;
const Btn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const CustomBtn = styled(Btn)`
  width: 10rem;
  border: 3px solid #48742c;
  background: rgb(196, 225, 165, 0.1);
  color: #48742c;
  font-weight: 700;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  &:hover {
    background: #48742c;
    color: white;
    transition: 0.5s;
  }
`;
const Title = styled.h2`
  font-size: 3.5rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #2d3f22;
  font-weight: 700;
`;
const SubTitle = styled.h4`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const InfoSub = styled(SubTitle)`
  margin: 2rem;
`;
const PlainText = styled.p`
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(80, 112, 61);
  font-weight: 400;
`;
const SmallText = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.334;
`;
const InfoSmall = styled(SmallText)`
  margin-top: 1rem;
  font-weight: 400;
`;
const Underline = styled.div`
  width: 80px;
  height: 0.4rem;
  border-radius: 1rem;
  margin: 0 auto;
  margin-bottom: 4rem;
  color: #48742c;
  background: #48742c;
  display: flex;
  position: relative;
  align-item: center;
  justify-content: center;
`;
const InfoUnderLine = styled(Underline)`
  margin-bottom: 2rem;
`;
const BtnGroup = styled.div`
  display: flex;
  margin: 0 auto;
`;
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <HeroLayout>
        <Box>
          <Title>Don't starve Chorok!</Title>
          <Underline></Underline>
          <PlainText>Full Time Managed Plant Care Service</PlainText>
          <BtnGroup>
            <CustomBtn onClick={() => navigate(`/signin`)}>Register</CustomBtn>
            <CustomBtn onClick={() => navigate(`/login`)}>Login</CustomBtn>
          </BtnGroup>
          <SmallText>WHAT IS THIS SERVICE?</SmallText>
        </Box>
      </HeroLayout>
      <ValueLayout>
        <ValueDiv>
          <ValueImg src={plantImg}></ValueImg>
          <SubTitle>Auto Managing</SubTitle>
          <SmallText>
            Our Service can automatically manage all the environment in booth.
          </SmallText>
        </ValueDiv>
        <ValueDiv>
          <ValueImg src={graph}></ValueImg>
          <SubTitle>Realtime Data</SubTitle>
          <SmallText>
            Anytime you want, you can view your plant and all the realtime
            environment information.
          </SmallText>
        </ValueDiv>
        <ValueDiv>
          <ValueImg src={alertImg}></ValueImg>
          <SubTitle>Alert Events</SubTitle>
          <SmallText>
            If there are any unexpected event, we will alert you about the
            event.
          </SmallText>
        </ValueDiv>
      </ValueLayout>
      <InfoLayout>
        <Head>
          <Title>How It Works</Title>
          <InfoUnderLine></InfoUnderLine>
        </Head>
        <InfoItem>
          <InfoSub>1.</InfoSub>
          <ValueImg src={user}></ValueImg>
          <InfoSmall>SignIn Our Service</InfoSmall>
        </InfoItem>
        <InfoItem>
          <InfoSub>2.</InfoSub>
          <ValueImg src={plantPot}></ValueImg>
          <InfoSmall>Register Your Booth</InfoSmall>
        </InfoItem>
        <InfoItem>
          <InfoSub>3.</InfoSub>
          <ValueImg src={planting}></ValueImg>
          <InfoSmall>Plant What You Want!</InfoSmall>
        </InfoItem>
        <Foot>
          <CustomBtn onClick={scrollToTop}>Start</CustomBtn>
        </Foot>
      </InfoLayout>
      <Btn onClick={() => navigate(`/datalist`)}>DataList</Btn>
    </div>
  );
}
