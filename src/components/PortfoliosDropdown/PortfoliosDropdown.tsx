import Routes from "@/constants/Routes";
import { useDropdown } from "@/hooks/useDropdown";
import designSystem from "@/styles/designSystem";
import { useBoolean } from "@fineants/demolition";
import Link from "next/link";
import { MouseEvent } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export function PortfoliosDropdown() {
  // const router = useRouter();

  // const { user } = useContext(UserContext);

  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const { setTrue: portfolioDialogOpen } = useBoolean();

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  const onPortfolioAddClick = () => {
    // if (!user) {
    //   router.push(Routes.SIGNIN);
    //   return;
    // }

    portfolioDialogOpen();
  };

  return (
    <>
      <DropdownButton onClick={onDropdownButtonClick} $isOpen={true}>
        <span>Portfolios</span>
        <Icon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color={isOpen ? "white" : "gray400"}
        />
      </DropdownButton>
      <DropdownMenu sx={dropdownMenuSx}>
        {/* {user && (
          <AsyncBoundary
            SuspenseFallback={<PortfoliosDropdownListSkeleton />}
            ErrorFallback={PortfoliosDropdownListErrorFallback}>
            <PortfoliosDropdownList DropdownItem={DropdownItem} />
          </AsyncBoundary>
        )} */}
        {/* <Link href={user ? Routes.PORTFOLIOS : Routes.SIGNIN}>  */}
        <Link href={Routes.SIGNIN}>
          <DropdownItem sx={fixedDropdownItemSx}>
            포트폴리오로 이동
          </DropdownItem>
        </Link>
        <DropdownItem sx={fixedDropdownItemSx} onClick={onPortfolioAddClick}>
          포트폴리오 추가
        </DropdownItem>
      </DropdownMenu>

      {/* {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={portfolioDialogClose}
        />
      )} */}
    </>
  );
}

const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  ${designSystem.font.title4};
  color: ${({ $isOpen }) =>
    $isOpen
      ? designSystem.color.neutral.white
      : designSystem.color.neutral.gray400};
  letter-spacing: -0.02em;
  cursor: pointer;

  &:hover {
    color: ${designSystem.color.neutral.white};

    > .icon {
      background-color: ${designSystem.color.neutral.white};
    }
  }
`;

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "240px",
    "maxHeight": "265px",
    "padding": "8px",
    "overflowY": "scroll",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",

      ".MuiMenuItem-root": {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        overflowX: "hidden",
        textOverflow: "ellipsis",
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const fixedDropdownItemSx = {
  // {designSystem.font.body2}
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};
