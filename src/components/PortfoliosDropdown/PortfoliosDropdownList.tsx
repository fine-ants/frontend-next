import { DropdownItemProps } from "@/hooks/useDropdown";

import { ComponentType } from "react";

type Props = {
  DropdownItem: ComponentType<DropdownItemProps>;
};

export default function PortfoliosDropdownList({}: Props) {
  // const { data: portfolioList } = usePortfolioListQuery();

  // const portfolioDropdownItems = portfolioList.map(
  //   (portfolio: PortfolioItem) => ({
  //     name: portfolio.name,
  //     path: Routes.PORTFOLIO(portfolio.id),
  //   })
  // );

  return (
    <>
      {/* {portfolioDropdownItems?.map((item) => (
        <Link key={item.name} to={item.path}>
          <DropdownItem sx={portfolioDropdownItemSx}>{item.name}</DropdownItem>
        </Link>
      ))}

      {portfolioDropdownItems && <Divider />} */}
    </>
  );
}

// const portfolioDropdownItemSx = {
//   font: designSystem.font.body2,
//   color: designSystem.color.neutral.gray900,
// };
