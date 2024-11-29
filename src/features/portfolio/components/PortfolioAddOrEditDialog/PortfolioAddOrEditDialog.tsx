import { PortfolioDetails } from "@/features/portfolio/api/types";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import PortfolioAddOrEditDialogD from "./desktop/PortfolioAddOrEditDialogD";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioAddOrEditDialog(props: Props) {
  const { isDesktop } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <PortfolioAddOrEditDialogD {...props} />}
      {/* {isMobile && <PortfolioAddOrEditDialogM {...props} />} */}
    </>
  );
}
