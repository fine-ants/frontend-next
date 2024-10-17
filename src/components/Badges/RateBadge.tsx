import designSystem from "@/styles/designSystem";
import { thousandsDelimiter } from "@fineants/demolition";
import styled from "styled-components";
import { Icon } from "../Icon";

type Size = 12 | 16 | 24;

type Props = {
  value: number;
  bgColorStatus?: boolean;
  iconStatus?: boolean;
  size: Size;
  noPercent?: boolean;
};

export default function RateBadge({
  value,
  bgColorStatus = true,
  iconStatus = true,
  size,
  noPercent = false,
}: Props) {
  return (
    <StyledRateBadge
      $colors={getColors(value)}
      $bgColorStatus={bgColorStatus}
      $size={size}>
      {iconStatus && value !== 0 && (
        <Icon size={12} icon={getIcon(value)} color={getIconColor(value)} />
      )}
      <span>
        {thousandsDelimiter(Math.abs(value))}
        {noPercent ? "" : "%"}
      </span>
    </StyledRateBadge>
  );
}

const StyledRateBadge = styled.div<{
  $colors: { color: string; bgColor: string };
  $bgColorStatus: boolean;
  $size: Size;
}>`
  height: ${({ $size }) => $size}px;
  padding: ${({ $bgColorStatus }) => ($bgColorStatus ? "3.5px 4px" : "0")};
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  background-color: ${({ $colors, $bgColorStatus }) =>
    $bgColorStatus ? $colors.bgColor : "transparent"};
  border-radius: 4px;
  color: ${({ $colors }) => $colors.color};

  > span {
    ${({ $size }) =>
      $size === 12 ? designSystem.font.title6 : designSystem.font.title5};
  }
`;

const getColors = (value: number) => {
  if (value > 0) {
    return {
      color: designSystem.color.state.green500,
      bgColor: designSystem.color.state.green16,
    };
  } else if (value === 0) {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  } else if (value < 0) {
    return {
      color: designSystem.color.state.red500,
      bgColor: designSystem.color.state.red16,
    };
  } else {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  }
};

const getIcon = (value: number) => {
  return value > 0 ? "up" : value < 0 ? "down" : "none";
};

const getIconColor = (value: number) => {
  return value > 0 ? "green500" : value < 0 ? "red500" : "gray400";
};
