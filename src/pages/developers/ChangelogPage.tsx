import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";

const entries = [
  {
    date: "2026-10-25",
    summary:
      "Partner contract aligned to the tested staging API: API key only, referenceId required, create 202, identical retry 200, changed body 409, order limit 1/sec burst 2 (429). The Postman collection runs that path. Polling remains how you know an order is finished.",
  },
  {
    date: "2026-09-26",
    summary:
      "Docs: Getting started now uses catalog-driven first order (no hard-coded SKU); documents response envelope (data.*), 202 vs 200 idempotency, and price.min vs faceValue. API reference examples aligned with live orderable catalog shape. Rate limits corrected for POST /api/orders.",
  },
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
    summary: "Docs: Initial developer documentation site launch.",
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
            <time className="text-sm font-mono text-muted-foreground font-medium">{entry.date}</time>
            <p className="text-muted-foreground mt-1">{entry.summary}</p>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default ChangelogPage;
