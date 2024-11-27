import designSystem from "@/styles/designSystem";
import { MenuItem as MuiMenuItem } from "@mui/material";
import styled from "styled-components";

export default styled(MuiMenuItem)`
  height: inherit;
  padding: 0 4px;
  gap: 4px;
  background-color: ${designSystem.color.neutral.white};
  ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};

  &:hover {
    background-color: ${designSystem.color.neutral.gray50};
  }

  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: ${designSystem.color.neutral.gray50} !important;
  }
`;
