import { PortfolioHoldingsDividendChartItem } from "@/features/portfolio/api/types";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import styled from "styled-components";
import DividendBarChart from "./DividendBarChart";

type Props = {
  dividendChart: PortfolioHoldingsDividendChartItem[];
};

export default function DividendBarChartContainer({ dividendChart }: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledDividendBarChartContainer>
      <ChartLabel $isMobile={isMobile}>예상 월 배당금</ChartLabel>
      <DividendBarChart data={dividendChart} />
    </StyledDividendBarChartContainer>
  );
}

const StyledDividendBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartLabel = styled.h1<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.heading4 : designSystem.font.heading3};
  color: ${designSystem.color.neutral.gray900};
`;
