import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import { useEffect, useState } from "react";
import usePortfolioDetailsQuery from "../../api/queries/usePortfolioDetailsQuery";
import { PortfolioDetails, PortfolioHolding } from "../../api/types";
import { usePortfolioId } from "../../hook/usePortfolioId";
import MainPanelD from "./desktop/MainPanelD";

// type Props = {
//   tab: PortfolioPageTab;
//   onChangeTab: (tab: PortfolioPageTab) => void;
// };

// export default function MainPanel({ tab, onChangeTab }: Props) {
export default function MainPanel() {
  const portfolioId = usePortfolioId();

  const { isDesktop } = useResponsiveLayout();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));

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

  useEffect(() => {
    setFreshPortfolioDetailsData(portfolio.portfolioDetails);
    setFreshPortfolioHoldingsData(portfolio.portfolioHoldings);
    // setFreshPortfolioDetailsData({
    //   ...portfolioDetailsSSE,
    //   ...portfolioDetails,
    // });

    // setFreshPortfolioHoldingsData(
    //   portfolioHoldings.map((holding, index) => ({
    //     ...portfolioHoldingsSSE[index],
    //     ...holding,
    //   }))
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio]);

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
