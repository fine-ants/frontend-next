import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import { useState } from "react";
import { Portfolio, PortfolioDetails, PortfolioHolding } from "../../api/types";
import { PortfolioPageTab } from "../../types";
import MainPanelD from "./desktop/MainPanelD";

type Props = {
  tab: PortfolioPageTab;
  portfolio: Portfolio;
  onChangeTab: (tab: PortfolioPageTab) => void;
};

export default function MainPanel({ tab, portfolio, onChangeTab }: Props) {
  //   const { portfolioId } = useParams();

  const { isDesktop, isMobile } = useResponsiveLayout();

  //   const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));

  //   const {
  //     data: portfolioSSE,
  //     //TODO: SSE 에러일때 핸들링처리
  //   } = useSSE<PortfolioSSE>({
  //     url: `/api/portfolio/${portfolioId}/holdings/realtime`,
  //     eventTypeName: "portfolioDetails",
  //   });

  //   // Static Data
  //   const { portfolioDetails, portfolioHoldings } = portfolio;
  //   // Realtime Data
  //   const {
  //     portfolioDetails: portfolioDetailsSSE,
  //     portfolioHoldings: portfolioHoldingsSSE,
  //   } = portfolioSSE ?? { portfolioDetails: null, portfolioHoldings: [] };

  const [freshPortfolioDetailsData, setFreshPortfolioDetailsData] =
    useState<PortfolioDetails>(portfolio.portfolioDetails);

  const [freshPortfolioHoldingsData, setFreshPortfolioHoldingsData] = useState<
    PortfolioHolding[]
  >(portfolio.portfolioHoldings);

  //   useEffect(() => {
  //     setFreshPortfolioDetailsData({
  //       ...portfolioDetails,
  //       ...portfolioDetailsSSE,
  //     });

  //     setFreshPortfolioHoldingsData(
  //       portfolioHoldings.map((holding, index) => ({
  //         ...holding,
  //         ...portfolioHoldingsSSE[index],
  //       }))
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [portfolioSSE]);

  //   useEffect(() => {
  //     setFreshPortfolioDetailsData({
  //       ...portfolioDetailsSSE,
  //       ...portfolioDetails,
  //     });

  //     setFreshPortfolioHoldingsData(
  //       portfolioHoldings.map((holding, index) => ({
  //         ...portfolioHoldingsSSE[index],
  //         ...holding,
  //       }))
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [portfolio]);

  //   const hasNoHoldings = portfolioHoldings.length === 0;
  const hasNoHoldings = false;

  return (
    <>
      {isDesktop && (
        <MainPanelD
          freshPortfolioDetailsData={freshPortfolioDetailsData}
          freshPortfolioHoldingsData={freshPortfolioHoldingsData}
          hasNoHoldings={hasNoHoldings}
        />
      )}
      {/* {isMobile && (
        <MainPanelM
          freshPortfolioDetailsData={freshPortfolioDetailsData}
          freshPortfolioHoldingsData={freshPortfolioHoldingsData}
          tab={tab}
          onChangeTab={onChangeTab}
        />
      )} */}
    </>
  );
}
