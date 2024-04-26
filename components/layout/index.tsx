import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: 70 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
