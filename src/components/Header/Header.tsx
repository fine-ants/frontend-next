import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import styled from "styled-components";
import HeaderTopD from "./desktop/HeaderTopD";
import HeaderTopM from "./mobile/HeaderTopM";

export default function Header() {
  const { isDesktop, isMobile } = useResponsiveLayout();
  // const location = useLocation();

  return (
    <StyledHeader>
      {isDesktop && <HeaderTopD />}
      {isMobile && <HeaderTopM />}

      {/* {(isDesktop || (isMobile && isPageDepthOne(location.pathname))) && (
        <TVTickerTapeWidget />
      )} */}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: ${designSystem.color.neutral.gray900};
  color: ${designSystem.color.neutral.white};
`;
