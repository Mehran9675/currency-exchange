import { ReactNode } from "react";
import Header from "./header";

const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
