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
          headers={["Limit", "Value"]}
          rows={[["Requests per minute per API key", "100"]]}
        />
        <p>
          If you exceed the limit, you'll receive a <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">429 Too Many Requests</code> response 
          with a <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">Retry-After</code> header. For order retries, use the same <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">referenceId</code>.
        </p>
      </DocSection>

      <DocSection title="Auth endpoints">
        <p>Authentication endpoints (<code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/auth</code>) have a separate, lower limit in production.</p>
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
