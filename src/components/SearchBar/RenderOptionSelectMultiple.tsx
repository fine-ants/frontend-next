import { StockSearchItem } from "@/features/stock/api";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import CheckBox from "../Checkbox";
import splitAndIncludeDelimiter from "./utils/splitAndIncludeDelimiter";

type RenderOptionSelectMultipleProps = {
  props: HTMLAttributes<HTMLLIElement>;
  searchValue: string;
  option: StockSearchItem;
  selectedOptions: StockSearchItem[];
  onClick: () => void;
};

export default function RenderOptionSelectMultiple({
  props,
  searchValue,
  option,
  selectedOptions,
  onClick,
}: RenderOptionSelectMultipleProps) {
  const { isMobile } = useResponsiveLayout();

  const isSelected = (tickerSymbol: string) =>
    !!selectedOptions.find((item) => item.tickerSymbol === tickerSymbol);

  return (
    <SelectRow
      {...props}
      style={renderOptionSelectStyles(isMobile)}
      onClick={onClick}>
      <CheckBox
        size="h16"
        checkType="check"
        checked={isSelected(option.tickerSymbol)}
        inputProps={{
          "aria-label": `checkbox-${option.tickerSymbol}`,
        }}
      />
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
    </SelectRow>
  );
}

const renderOptionSelectStyles = (isMobile: boolean) => {
  return {
    minHeight: isMobile ? "56px" : "32px",
    justifyContent: "flex-start",
  };
};

const SelectRow = styled.li`
  display: flex;
  gap: 8px;
`;

const CompanyName = styled.p<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title4 : designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  ${designSystem.font.body4};
  color: ${designSystem.color.neutral.gray400};
`;

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
