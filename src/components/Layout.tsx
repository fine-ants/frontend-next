import Routes from "@/constants/Routes";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Header = dynamic(import("./Header/Header"), {
  ssr: false,
});

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // TODO : Layout을 제외해야 하는 페이지가 더 늘어난다면 개선하기
  if (pathname === Routes.SIGNIN || pathname === Routes.SIGNUP) {
    return children;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
