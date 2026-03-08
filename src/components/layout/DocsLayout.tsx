import { useState, ReactNode } from "react";
import Header from "./Header";
import DocSidebar from "./DocSidebar";
import Footer from "./Footer";

interface DocsLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const DocsLayout = ({ children, fullWidth = false }: DocsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        {!fullWidth && (
          <DocSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <main className={`flex-1 px-4 py-8 lg:px-8 ${fullWidth ? "" : "max-w-[860px]"}`}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
