import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
      <div className="flex items-center h-full px-4 lg:px-6">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden mr-3 p-1.5 rounded-md hover:bg-secondary transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/developers" className="flex items-center gap-2 mr-8">
          <div className="h-7 w-7 rounded-md bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-foreground">Steller</span>
          <span className="text-muted-foreground text-sm hidden sm:inline">Developers</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm flex-1">
          <Link to="/developers" className="text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link to="/developers/support" className="text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <a
            href={siteConfig.dashboardUrl}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Dashboard
          </a>
          <a
            href={siteConfig.signupUrl}
            className="text-sm px-4 py-1.5 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity font-medium"
          >
            Get API key
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
