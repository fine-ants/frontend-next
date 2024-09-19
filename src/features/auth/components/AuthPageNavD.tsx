import fineAntsLogo from "@/assets/icons/logo/fineAnts.svg";
import Routes from "@/constants/Routes";
import Link from "next/link";
import styled from "styled-components";

export default function AuthPageNavD() {
  return (
    <StyledAuthPageNavD>
      <Link href={Routes.LANDING}>
        <img src={fineAntsLogo.src} alt="FineAnts 로고 이미지" />
      </Link>
    </StyledAuthPageNavD>
  );
}

const StyledAuthPageNavD = styled.header`
  width: 100%;
  padding: 28px 0 0 40px;
`;
