import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import { Link } from "react-router-dom";

const RateLimits = () => {
  return (
    <DocsLayout>
      <PageHeader title="Rate limits" description="Default limits and how to request higher." />

      <DocSection title="Partner API (x-api-key)">
        <DocTable
          headers={["Endpoint", "Limit", "Window"]}
          rows={[
            ["POST /api/orders", "1 sustained, burst 2", "per partner, per second, no queue"],
            ["Any partner route", "100 requests", "per API key per minute"],
          ]}
        />
        <p>
          A third order post in the same second returns HTTP 429 with Retry-After. Wait, then send the same body. Order calls do not use a dashboard login.
        </p>
      </DocSection>

      <DocSection title="Vendor limits">
        <p>
          Steller's upstream vendor has internal rate limits. Avoid bursting — space orders evenly when sending in bulk.
        </p>
      </DocSection>

      <DocSection title="Need higher limits?">
        <p>Contact Steller to discuss increased limits. <Link to="/developers/support" className="doc-link">Support →</Link></p>
      </DocSection>
    </DocsLayout>
  );
};

export default RateLimits;
