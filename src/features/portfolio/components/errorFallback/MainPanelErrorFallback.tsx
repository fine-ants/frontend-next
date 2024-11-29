import { ErrorFallbackContent } from "@/components/ErrorFallbackContent";
import designSystem from "@/styles/designSystem";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function MainPanelErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledMainPanelErrorFallback>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledMainPanelErrorFallback>
  );
}

const StyledMainPanelErrorFallback = styled.div`
  width: 960px;
  height: 1060px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
  color: ${designSystem.color.neutral.gray900};
`;
