import fineantsLogo from "@/assets/icons/logo/ic_fineants_white.svg";
import { IconButton } from "@/components/Buttons/IconButton";
import Routes from "@/constants/Routes";
import { MAIN_HEADER_HEIGHT_M } from "@/constants/styleConstants";

import { useBoolean } from "@fineants/demolition";
import Link from "next/link";
import styled from "styled-components";

export default function HeaderTopM() {
  // const { user } = useContext(UserContext);

  const { setTrue: onOpenSearchPanel } = useBoolean();

  return (
    <StyledHeaderTopM>
      <HeaderLeft>{/* {user && <UserDrawer />} */}</HeaderLeft>

      <HeaderCenter>
        <Link
          // to={user ? Routes.DASHBOARD : Routes.LANDING}
          href={Routes.LANDING}
          style={{ padding: "4px 8px" }}>
          <LogoImage src={fineantsLogo.src} alt="FineAnts" />
        </Link>
      </HeaderCenter>

      <HeaderRight>
        <IconButton
          icon="search"
          iconColor="custom"
          customColor={{ color: "gray400", hoverColor: "gray50" }}
          size="h40"
          onClick={onOpenSearchPanel}
        />
        {/* <StockSearchPanel
          isPanelOpen={isSearchPanelOpen}
          onOpenPanel={onOpenSearchPanel}
          onClosePanel={onCloseSearchPanel}
        /> */}

        {/* {user ? <NotificationControl user={user} /> : null} */}
      </HeaderRight>
    </StyledHeaderTopM>
  );
}

const StyledHeaderTopM = styled.header`
  height: ${MAIN_HEADER_HEIGHT_M}px;
  padding-inline: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  width: 33%;
`;

const HeaderCenter = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderRight = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;
