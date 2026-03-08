import { ReactNode } from "react";

interface DocSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

const DocSection = ({ id, title, children }: DocSectionProps) => {
  const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section id={sectionId} className="mb-10 scroll-mt-20">
      <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
      <div className="doc-prose">{children}</div>
    </section>
  );
};

export default DocSection;
