import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const CTAButton = ({ href, children, variant = "primary" }: CTAButtonProps) => {
  const base = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all";
  const styles = variant === "primary"
    ? `${base} bg-accent text-accent-foreground hover:opacity-90 shadow-sm`
    : `${base} border border-border text-foreground hover:bg-secondary`;

  return (
    <a href={href} className={styles}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
};

export default CTAButton;
