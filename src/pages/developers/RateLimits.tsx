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
          A third order post in the same second returns HTTP 429 with errorCode <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">RATE_LIMIT_EXCEEDED</code> and a Retry-After header. The same code and header come back when you pass 100 requests per minute on one API key. Retry-After is in whole seconds, from 1 to 60. Wait, then send the same body. Order calls do not use a dashboard login.
        </p>
        <p>
          Every call made with your API key counts toward the 100 per minute, polling included. With several open orders, poll every 5 seconds or slower, or rely on your webhook.
        </p>
      </DocSection>

      <DocSection title="Fulfilment limits">
        <p>
          Steller manages the limits of its fulfilment network for you. Space orders evenly when sending in bulk.
        </p>
      </DocSection>

      <DocSection title="Need higher limits?">
        <p>Contact Steller to discuss increased limits. <Link to="/developers/support" className="doc-link">Support →</Link></p>
      </DocSection>
    </DocsLayout>
  );
};

export default RateLimits;
