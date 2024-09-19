import dashboardD from "@/assets/images/dashboardD.svg";
import dashboardM from "@/assets/images/dashboardM.svg";
import featureIconChart from "@/assets/images/feature_icon_chart.svg";
import featureIconNotification from "@/assets/images/feature_icon_notification.svg";
import featureIconWatchlist from "@/assets/images/feature_icon_watchlist.svg";
import LandingTop from "@/assets/images/img_topbg.svg";
import landingTopChart from "@/assets/images/landingTopChart.png";
import portfolioImageD1 from "@/assets/images/portfolioD1.svg";
import portfolioImageD2 from "@/assets/images/portfolioD2.svg";
import portfolioImageD3 from "@/assets/images/portfolioD3.svg";
import portfolioImageM1 from "@/assets/images/portfolioM1.svg";
import portfolioImageM2 from "@/assets/images/portfolioM2.svg";
import portfolioImageM3 from "@/assets/images/portfolioM3.svg";
import BasePage from "@/components/BasePage";
import Button from "@/components/Buttons/Button";
import { TextButton } from "@/components/Buttons/TextButton";
import Header from "@/components/Header/Header";
import Routes from "@/constants/Routes";
import {
  MAIN_HEADER_TOTAL_HEIGHT_D,
  MAIN_HEADER_TOTAL_HEIGHT_M,
  TV_TICKER_TAPE_WIDGET_HEIGHT,
} from "@/constants/styleConstants";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function LandingPage() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const router = useRouter();

  const moveToSignInPage = () => {
    router.push(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    router.push(Routes.SIGNUP);
  };

  return (
    <>
      <Header />
      <BasePage>
        <LandingTopBG $isMobile={isMobile}>
          <Image
            src={LandingTop}
            alt="Landing Background"
            layout="fill"
            objectFit="cover"
          />
          <LandingTopBGContent $isMobile={isMobile}>
            <LandingTopText $isMobile={isMobile}>
              <p>
                주식 자산 관리를 <br />더 쉽고 간편하게
              </p>
              <h2>
                실시간 자산 현황을 확인하고{isMobile && <br />} 똑똑한 투자
                관리를 시작하세요
              </h2>
              {isMobile && (
                <ButtonWrapper>
                  <TextButton
                    size="h32"
                    color="white"
                    onClick={moveToSignInPage}>
                    로그인
                  </TextButton>
                  <Button
                    variant="primary"
                    size="h32"
                    onClick={moveToSignUpPage}>
                    회원가입
                  </Button>
                </ButtonWrapper>
              )}
            </LandingTopText>
            <LandingTopChart
              src={landingTopChart}
              alt="landingTopChart"
              $isMobile={isMobile}
            />
          </LandingTopBGContent>
        </LandingTopBG>

        <LandingBottom $isMobile={isMobile}>
          <FeatureContainer>
            <FeatureTitle $isMobile={isMobile}>대시보드</FeatureTitle>
            <FeatureDescription $isMobile={isMobile}>
              보유 자산을{isMobile && <br />} 한 눈에 확인하세요
            </FeatureDescription>
            <DashboardImage
              width={100}
              height={100}
              src={isMobile ? dashboardM.src : dashboardD.src}
              alt="dashboard"
              $isMobile={isMobile}
            />
          </FeatureContainer>

          <FeatureContainer>
            <FeatureTitle $isMobile={isMobile}>포트폴리오</FeatureTitle>
            <FeatureDescription $isMobile={isMobile}>
              투자 목적에 맞는 다양한{isMobile && <br />}
              포트폴리오를 생성하고{isDesktop && <br />}
              자산을{isMobile && <br />} 효율적으로 관리할 수 있습니다
            </FeatureDescription>
            <PortfolioImageContainer $isMobile={isMobile}>
              <PortfolioImage
                src={isMobile ? portfolioImageM1.src : portfolioImageD1.src}
                alt="portfolio1"
                $isMobile={isMobile}
              />
              <PortfolioImage
                src={isMobile ? portfolioImageM2.src : portfolioImageD2.src}
                alt="portfolio2"
                $isMobile={isMobile}
              />
              <PortfolioImage
                src={isMobile ? portfolioImageM3.src : portfolioImageD3.src}
                alt="portfolio3"
                $isMobile={isMobile}
              />
            </PortfolioImageContainer>
          </FeatureContainer>

          <ComfortContainer $isMobile={isMobile}>
            <div>
              <FeatureTitle $isMobile={isMobile}>편의 기능</FeatureTitle>
              <FeatureDescription $isMobile={isMobile}>
                성공적인 투자 관리를 위한
                <br />
                다양한 기능을 지원합니다
              </FeatureDescription>
            </div>

            <FeatureBoxWrapper $isMobile={isMobile}>
              <FeatureBox $isMobile={isMobile}>
                <Image
                  src={featureIconWatchlist.src}
                  alt="관심 종목"
                  width={isMobile ? 56 : 80}
                  height={isMobile ? 56 : 80}
                />
                관심 종목
              </FeatureBox>
              <FeatureBox $isMobile={isMobile}>
                <Image
                  src={featureIconChart.src}
                  alt="종목 상세 차트"
                  width={isMobile ? 56 : 80}
                  height={isMobile ? 56 : 80}
                />
                종목 상세 차트
              </FeatureBox>
              <FeatureBox $isMobile={isMobile}>
                <Image
                  src={featureIconNotification.src}
                  alt="손익 알림"
                  width={isMobile ? 56 : 80}
                  height={isMobile ? 56 : 80}
                />
                손익 알림
              </FeatureBox>
            </FeatureBoxWrapper>
          </ComfortContainer>
        </LandingBottom>
      </BasePage>
    </>
  );
}

const LandingTopBG = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  //TODO : TV_TICKER_TAPE를 추가하기 전까지 해당 높이 제외되고 있음
  height: calc(
    100vh -
      ${({ $isMobile }) =>
        $isMobile
          ? MAIN_HEADER_TOTAL_HEIGHT_M
          : MAIN_HEADER_TOTAL_HEIGHT_D - TV_TICKER_TAPE_WIDGET_HEIGHT}px
  );
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${({ $isMobile }) => ($isMobile ? "52px 8px" : "0")};
  position: relative;
  overflow: hidden;
`;

const LandingTopBGContent = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: center;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? "40px" : "237px")};
  z-index: 1;
`;

const LandingTopText = styled.div<{ $isMobile: boolean }>`
  width: auto;
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "224px")};
  text-align: ${({ $isMobile }) => ($isMobile ? "center" : "start")};

  > p {
    ${({ $isMobile }) =>
      $isMobile ? designSystem.font.display3 : designSystem.font.display1};
    color: ${designSystem.color.neutral.white};
    margin-bottom: ${({ $isMobile }) => ($isMobile ? "24px" : "40px")};
  }

  > h2 {
    ${({ $isMobile }) =>
      $isMobile ? designSystem.font.body2 : designSystem.font.body1};
    color: ${designSystem.color.neutral.white};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const LandingTopChart = styled(Image)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "741px")};
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "681px")};
  pointer-events: none;
`;

const LandingBottom = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: ${({ $isMobile }) => ($isMobile ? "80px" : "200px")};
  margin: 0 auto;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "0" : "200px")};
  padding: ${({ $isMobile }) =>
    $isMobile ? "80px 16px" : "120px 240px 0 240px"};
  width: 100%;
  max-width: 1920px;
  height: auto;
  min-height: inherit;
  background-color: ${designSystem.color.neutral.white};
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureTitle = styled.h3<{ $isMobile: boolean }>`
  margin-right: auto;
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title5 : designSystem.font.heading3};
  color: ${designSystem.color.primary.blue500};
`;

const FeatureDescription = styled.p<{ $isMobile: boolean }>`
  margin-right: auto;
  margin-top: 16px;
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.heading3 : designSystem.font.display2};
  color: #111111;
`;

const DashboardImage = styled(Image)<{ $isMobile: boolean }>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? "100%" : "640px")};
  margin-top: ${({ $isMobile }) => ($isMobile ? "32px" : "80px")};
  border-radius: ${({ $isMobile }) => ($isMobile ? "0" : "16px")};
  pointer-events: none;
`;

const PortfolioImageContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
  margin-top: ${({ $isMobile }) => ($isMobile ? "32px" : "80px")};
`;

const PortfolioImage = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "464px")};
  height: ${({ $isMobile }) => ($isMobile ? "100%" : "464px")};
  border-radius: 16px;
  pointer-events: none;
`;

const ComfortContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  height: auto;
  justify-content: space-between;
  align-items: flex-start;
`;
const FeatureBoxWrapper = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "24px")};
  margin-top: 45px;
`;

const FeatureBox = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "224px")};
  height: ${({ $isMobile }) => ($isMobile ? "108px" : "224px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "0" : "8px")};
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title5 : designSystem.font.heading3};
  color: ${designSystem.color.primary.blue50};
  background-color: ${designSystem.color.primary.blue300};
  border-radius: ${({ $isMobile }) => ($isMobile ? "8px" : "16px")};
  pointer-events: none;
`;
