import { ReactElement } from "react";
import { FooterAbout } from "./footer-about";
import { HeaderAbout } from "./header-about";

export default function LayoutAbout({ children }: { children: ReactElement }) {
  return (
    <>
      <HeaderAbout />
      <main>{children}</main>
      <FooterAbout />
    </>
  );
}
