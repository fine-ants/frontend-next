import { StockSearchItem } from "@/features/stock/api";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import splitAndIncludeDelimiter from "./utils/splitAndIncludeDelimiter";

type RenderOptionDefaultProps = {
  props: HTMLAttributes<HTMLLIElement>;
  searchValue: string;
  option: StockSearchItem;
};

export default function RenderOptionDefault({
  props,
  searchValue,
  option,
}: RenderOptionDefaultProps) {
  const { isMobile } = useResponsiveLayout();

  return (
    <li {...props} style={renderOptionDefaultStyles(isMobile)}>
      <div>
        <CompanyName $isMobile={isMobile}>
          {splitAndIncludeDelimiter(option.companyName, searchValue).map(
            (word, idx) =>
              word === searchValue ? (
                <Highlight key={idx}>{word}</Highlight>
              ) : (
                word
              )
          )}
        </CompanyName>
        <TickerSymbol>{option.tickerSymbol}</TickerSymbol>
      </div>

      {/* TODO: Add watchlist logic */}
      <Icon icon="favorite" size={isMobile ? 24 : 16} color="gray400" />
    </li>
  );
}

const renderOptionDefaultStyles = (isMobile: boolean) => ({
  height: isMobile ? "56px" : "47px",
  justifyContent: "space-between",
});

const CompanyName = styled.p<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.body2 : designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  ${designSystem.font.body4};
  color: ${designSystem.color.neutral.gray400};
`;

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
