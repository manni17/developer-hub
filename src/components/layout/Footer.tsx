import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="border-t py-6 px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <Link to="/developers/support" className="hover:text-foreground transition-colors">Support</Link>
        <Link to="/developers/status" className="hover:text-foreground transition-colors">Status</Link>
        {siteConfig.marketingSiteUrl !== "#" && (
          <a href={siteConfig.marketingSiteUrl} className="hover:text-foreground transition-colors">
            {siteConfig.name}
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;
