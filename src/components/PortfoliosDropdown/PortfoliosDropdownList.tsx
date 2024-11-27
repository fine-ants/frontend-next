import Routes from "@/constants/Routes";
import usePortfolioNameListQuery from "@/features/portfolio/api/queries/usePortfolioNameListQuery";
import { DropdownItemProps } from "@/hooks/useDropdown";
import designSystem, { parseFontString } from "@/styles/designSystem";
import { Divider } from "@mui/material";
import Link from "next/link";

import { ComponentType } from "react";

type Props = {
  DropdownItem: ComponentType<DropdownItemProps>;
};

export default function PortfoliosDropdownList({ DropdownItem }: Props) {
  const { data: portfolioList } = usePortfolioNameListQuery();

  return (
    <>
      {portfolioList?.map((item) => (
        <Link key={item.id} href={Routes.PORTFOLIO(item.id)}>
          <DropdownItem sx={portfolioDropdownItemSx}>{item.name}</DropdownItem>
        </Link>
      ))}

      {portfolioList && <Divider />}
    </>
  );
}

const portfolioDropdownItemSx = {
  ...parseFontString(designSystem.font.body2),
  color: designSystem.color.neutral.gray900,
};
