import { forwardRef, ReactNode } from "react";

interface DocSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

const DocSection = forwardRef<HTMLElement, DocSectionProps>(({ id, title, children }, ref) => {
  const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section ref={ref} id={sectionId} className="mb-10 scroll-mt-20">
      <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
      <div className="doc-prose">{children}</div>
    </section>
  );
});

DocSection.displayName = "DocSection";

export default DocSection;
