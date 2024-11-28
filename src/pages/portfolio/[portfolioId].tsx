import { AsyncBoundary } from "@/components/AsyncBoundary";
import BasePage from "@/components/BasePage";
import ChartsPanelErrorFallback from "@/features/portfolio/components/Chart/errorFallback/ChartsPanelErrorFallback";
import ChartsPanelSkeleton from "@/features/portfolio/components/Portfolio/skeletons/ChartsPanelSkeleton";
import MainPanelSkeleton from "@/features/portfolio/components/Portfolio/skeletons/MainPanelSkeleton";
import MainPanelErrorFallback from "@/features/portfolio/components/errorFallback/MainPanelErrorFallback";
import { usePortfolioId } from "@/features/portfolio/hook/usePortfolioId";
import { PortfolioPageTab } from "@/features/portfolio/types";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";

export default function PortfolioPage() {
  const { isMobile } = useResponsiveLayout();
  const portfolioId = usePortfolioId();

  // const [tab, setTab] = useState<PortfolioPageTab>("portfolio");
  const [tab] = useState<PortfolioPageTab>("portfolio");

  // const onChangeTab = (tab: PortfolioPageTab) => {
  //   setTab(tab);
  // };

  return (
    <BasePage key={portfolioId}>
      <Container $isMobile={isMobile}>
        <PanelWrapper
          $isMobile={isMobile}
          $isVisible={isMobile ? tab === "portfolio" : true}>
          <AsyncBoundary
            ErrorFallback={MainPanelErrorFallback}
            SuspenseFallback={<MainPanelSkeleton />}>
            {/* <MainPanel key={portfolioId} tab={tab} onChangeTab={onChangeTab} /> */}
            <MainPanel key={portfolioId} />
          </AsyncBoundary>
        </PanelWrapper>

        <PanelWrapper
          $isMobile={isMobile}
          $isVisible={isMobile ? tab === "chart" : true}>
          <AsyncBoundary
            ErrorFallback={ChartsPanelErrorFallback}
            SuspenseFallback={<ChartsPanelSkeleton />}>
            {/* <ChartPanel tab={tab} onChangeTab={onChangeTab} /> */}
            <ChartPanel />
          </AsyncBoundary>
        </PanelWrapper>
      </Container>
    </BasePage>
  );
}

const MainPanel = dynamic(
  import("@/features/portfolio/components/Portfolio/MainPanel"),
  {
    ssr: false,
  }
);

const ChartPanel = dynamic(
  import("@/features/portfolio/components/Portfolio/ChartPanel"),
  {
    ssr: false,
  }
);

const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "16px 0 32px 0px" : "40px 150px")};
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  gap: ${({ $isMobile }) => ($isMobile ? "0px" : "32px")};
`;

const PanelWrapper = styled.div<{ $isMobile: boolean; $isVisible: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
