import type { FunctionComponent, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>{children}</main>
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
