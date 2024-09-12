import { useMediaQuery } from "@mui/material";

export default function useResponsiveLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    defaultMatches: true,
  });
  // TODO: tablet 디자인 추가 시 주석 해제
  // const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)", { defaultMatches: false });
  const isMobile = useMediaQuery("(max-width: 1023px)", {
    defaultMatches: false,
  });

  return { isDesktop, isMobile };
}
