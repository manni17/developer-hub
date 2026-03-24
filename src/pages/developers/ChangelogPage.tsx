import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";

const entries = [
  {
    date: "2026-03-24",
    summary: "API: Order response now includes cardNumber (gift card redemption code) alongside serial, pin, and expiryDate. New partner catalog endpoints: GET /api/partner/catalog/orderable (activated products only) and GET /api/partner/catalog/browse (full catalog with partner pricing). Docs: Updated API reference with response examples for all endpoints; added Important rules section to Getting started.",
  },
  {
    date: "2026-03-01",
    summary: "Docs: Added webhook verification code samples (Node.js, Python). API: No changes.",
  },
  {
    date: "2026-02-25",
    summary: "Docs: Initial developer documentation site launch. API: v1 stable release.",
  },
  {
    date: "2026-02-15",
    summary: "API: Added low_balance webhook event. Docs: Updated webhooks page.",
  },
  {
    date: "2026-02-01",
    summary: "API: Postman collection and environment published. Docs: Added Postman page.",
  },
];

const ChangelogPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Changelog" description="API and documentation changes by date." />

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.date} className="pb-6 border-b last:border-b-0">
            <time className="text-sm font-mono text-accent font-medium">{entry.date}</time>
            <p className="text-muted-foreground mt-1">{entry.summary}</p>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default ChangelogPage;
