interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8 pb-6 border-b">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && <p className="text-muted-foreground text-lg">{description}</p>}
    </div>
  );
};

export default PageHeader;
