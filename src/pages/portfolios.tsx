import { AsyncBoundary } from "@/components/AsyncBoundary";
import BasePage from "@/components/BasePage";
import TableSkeleton from "@/components/Table/TableSkeleton";
import { PortfolioListTableErrorFallback } from "@/features/portfolio/components/PortfolioList/errorFallback/PortfolioListTableErrorFallback";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import dynamic from "next/dynamic";
import styled from "styled-components";

export default function PortfolioListPage() {
  const { isMobile } = useResponsiveLayout();

  return (
    <BasePage>
      <StyledPortfolioList $isMobile={isMobile}>
        <AsyncBoundary
          ErrorFallback={PortfolioListTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <PortfolioList />
        </AsyncBoundary>
      </StyledPortfolioList>
    </BasePage>
  );
}

const PortfolioList = dynamic(
  () => import("@/features/portfolio/components/PortfolioList/PortfolioList"),
  {
    ssr: false,
  }
);

const StyledPortfolioList = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "32px")};
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
  flex: 1;
`;
