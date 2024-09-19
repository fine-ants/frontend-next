import { IOS_HOME_INDICATOR_HEIGHT } from "@/constants/styleConstants";
import useDevice from "@/hooks/useDevice";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import designSystem from "@/styles/designSystem";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

type NavBarProps = {
  children: ReactNode;
};

type NavItemProps = {
  item?: { name: string; to: string };
  children?: ReactNode;
};

export function NavBar({ children }: NavBarProps) {
  const { isDesktop, isMobile } = useResponsiveLayout();
  const { isPWADevice, isIOSDevice } = useDevice();

  const isIOSPWA = isIOSDevice && isPWADevice;

  return (
    <>
      {isDesktop && (
        <StyledNavBarD>
          <ul>{children}</ul>
        </StyledNavBarD>
      )}
      {isMobile && (
        <StyledNavBarM $isIOSPWA={isIOSPWA}>
          <ul>{children}</ul>
        </StyledNavBarM>
      )}
    </>
  );
}

function NavItem({ item, children }: NavItemProps) {
  if (item && children) {
    throw new Error("Only provide either an item or children to NavItem.");
  }

  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && (
        <StyledNavItemD>
          {item ? (
            <StyledNavItemContentD href={item.to}>
              {item.name}
            </StyledNavItemContentD>
          ) : (
            children
          )}
        </StyledNavItemD>
      )}

      {isMobile && (
        <StyledNavItemM>
          {item ? (
            <StyledNavItemContentM href={item.to}>
              {item.name}
            </StyledNavItemContentM>
          ) : (
            children
          )}
        </StyledNavItemM>
      )}
    </>
  );
}

NavBar.NavItem = NavItem;

// Desktop
const StyledNavBarD = styled.nav`
  > ul {
    display: flex;
    gap: 40px;
    background-color: ${designSystem.color.neutral.gray900};
    ${designSystem.font.title4};
  }
`;

const StyledNavItemD = styled.li`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${designSystem.font.title4};
  color: ${designSystem.color.neutral.gray400};
  cursor: pointer;

  :hover {
    color: ${designSystem.color.neutral.white};
  }
`;

const StyledNavItemContentD = styled(Link)`
  ${designSystem.font.title4};
`;

// Mobile
const StyledNavBarM = styled.nav<{ $isIOSPWA: boolean }>`
  width: 100%;
  height: ${({ $isIOSPWA }) =>
    $isIOSPWA ? `calc(${IOS_HOME_INDICATOR_HEIGHT}px + 64px)` : "64px"};
  position: fixed;
  bottom: 0px;
  z-index: 10;
  padding-bottom: ${({ $isIOSPWA }) =>
    $isIOSPWA ? `${IOS_HOME_INDICATOR_HEIGHT}px` : "0px"};
  background-color: ${designSystem.color.neutral.white};

  > ul {
    height: 100%;
    display: flex;
    background-color: ${designSystem.color.neutral.white};
    border-top: 1px solid ${designSystem.color.neutral.gray100};
  }
`;

const StyledNavItemM = styled.li`
  padding: 12px 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNavItemContentM = styled(Link)`
  ${designSystem.font.title7};
`;
