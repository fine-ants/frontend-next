import BIImage from "@/assets/icons/logo/ic_fineants-header.svg";
import Button from "@/components/Buttons/Button";
import { TextButton } from "@/components/Buttons/TextButton";
import { NavBar } from "@/components/NavBar/NavBar";
import { PortfoliosDropdown } from "@/components/PortfoliosDropdown/PortfoliosDropdown";
import SearchBarD from "@/components/SearchBar/desktop/SearchBarD";
import Routes from "@/constants/Routes";
import { MAIN_HEADER_HEIGHT_D } from "@/constants/styleConstants";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function HeaderTopD() {
  const router = useRouter();

  // const { user } = useContext(UserContext);

  const navItems = [
    {
      name: "Watchlists",
      to: Routes.SIGNIN,
      // to: user ? Routes.WATCHLISTS : Routes.SIGNIN,
    },
    { name: "Indices", to: Routes.INDICES("KRX:KOSPI") },
  ];

  const moveToSignInPage = () => {
    router.push(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    router.push(Routes.SIGNUP);
  };

  return (
    <StyledHeaderTopD>
      <HeaderLeft>
        {/* <StyledBrandIdentityLink to={user ? Routes.DASHBOARD : Routes.LANDING}> */}
        <StyledBrandIdentityLink href={Routes.LANDING}>
          <img src={BIImage.src} alt="FineAnts" />
        </StyledBrandIdentityLink>
        <NavBar>
          <NavBar.NavItem>
            <PortfoliosDropdown />
          </NavBar.NavItem>
          {navItems.map((item) => (
            <NavBar.NavItem key={item.name} item={item} />
          ))}
        </NavBar>
      </HeaderLeft>
      <HeaderRight>
        <SearchBarD sx={{ width: "328px" }} />

        {/* {user ? (
          <UserControls user={user} />
        ) : (
          <ButtonWrapper>
            <TextButton size="h32" color="white" onClick={moveToSignInPage}>
              로그인
            </TextButton>
            <Button variant="primary" size="h32" onClick={moveToSignUpPage}>
              회원가입
            </Button>
          </ButtonWrapper>
        )} */}

        <ButtonWrapper>
          <TextButton size="h32" color="white" onClick={moveToSignInPage}>
            로그인
          </TextButton>
          <Button variant="primary" size="h32" onClick={moveToSignUpPage}>
            회원가입
          </Button>
        </ButtonWrapper>
      </HeaderRight>
    </StyledHeaderTopD>
  );
}

const StyledHeaderTopD = styled.header`
  height: ${MAIN_HEADER_HEIGHT_D}px;
  display: flex;
  gap: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  margin-left: auto;
`;

const StyledBrandIdentityLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 160px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  > img {
    width: 127px;
    height: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
