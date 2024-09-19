import designSystem from "@/styles/designSystem";
import { FormHelperText } from "@mui/material";
import styled from "styled-components";

export const ErrorText = styled(FormHelperText)`
  margin: 0;
  position: absolute;
  ${designSystem.font.body4};
  color: ${designSystem.color.state.red500};
`;
