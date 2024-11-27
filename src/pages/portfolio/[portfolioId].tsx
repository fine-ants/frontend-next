import BasePage from "@/components/BasePage";
import {
  getPortfolioCharts,
  getPortfolioDetails,
} from "@/features/portfolio/api";
import ChartsPanel from "@/features/portfolio/components/Portfolio/ChartPanel";
import MainPanel from "@/features/portfolio/components/Portfolio/Mainpanel";
import { usePortfolioId } from "@/features/portfolio/hook/usePortfolioId";
import { PortfolioPageTab } from "@/features/portfolio/types";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import styled from "styled-components";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const portfolioId = context.params?.portfolioId;
  const cookies = context.req.cookies;

  const { data: portfolio } = await getPortfolioDetails(
    Number(portfolioId),
    cookies
  );

  const { data: portfolioHoldingCharts } = await getPortfolioCharts(
    Number(portfolioId),
    cookies
  );

  return { props: { portfolio, portfolioHoldingCharts } };
};

export default function PortfolioPage({
  portfolio,
  portfolioHoldingCharts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isMobile } = useResponsiveLayout();
  const portfolioId = usePortfolioId();

  const [tab, setTab] = useState<PortfolioPageTab>("portfolio");

  const onChangeTab = (tab: PortfolioPageTab) => {
    setTab(tab);
  };

  return (
    <BasePage key={portfolioId}>
      <Container $isMobile={isMobile}>
        <PanelWrapper
          $isMobile={isMobile}
          $isVisible={isMobile ? tab === "portfolio" : true}>
          <MainPanel
            key={portfolioId}
            tab={tab}
            portfolio={portfolio}
            onChangeTab={onChangeTab}
          />
        </PanelWrapper>

        <PanelWrapper
          $isMobile={isMobile}
          $isVisible={isMobile ? tab === "chart" : true}>
          <ChartsPanel
            tab={tab}
            portfolioHoldingCharts={portfolioHoldingCharts}
            onChangeTab={onChangeTab}
          />
        </PanelWrapper>
      </Container>
    </BasePage>
  );
}

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
