import Routes from "@/constants/Routes";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header/Header";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  // TODO : Layout을 제외해야 하는 페이지가 더 늘어난다면 개선하기
  if (pathname === Routes.SIGNIN || pathname === Routes.SIGNUP) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
