import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import PortfolioHoldingAddDialogD from "./desktop/PortfolioHoldingAddDialogD";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddDialog(props: Props) {
  const { isDesktop } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <PortfolioHoldingAddDialogD {...props} />}
      {/* {isMobile && <PortfolioHoldingAddDialogM {...props} />} */}
    </>
  );
}
