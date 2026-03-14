import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import { Link } from "react-router-dom";

const GoingToProduction = () => {
  return (
    <DocsLayout>
      <PageHeader title="Going to production" description="Checklist: staging sign-off → prod credentials → go-live." />

      <DocSection title="Checklist">
        <ol>
          <li>Complete staging sign-off — place at least one successful end-to-end test order on staging (catalog → place order → poll to Completed → verify serial and PIN received)</li>
          <li>Contact Steller to request production credentials</li>
          <li>Get your production base URL and API key from Steller</li>
          <li>Update your integration config — replace staging base URL and API key with production values</li>
          <li>Place one small test order on production to confirm everything works</li>
          <li>Contact <Link to="/developers/support" className="doc-link">support</Link> if anything is unclear — include your <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">correlationId</code>, <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">orderId</code>, and timestamp</li>
        </ol>
      </DocSection>

      <DocSection title="What changes from staging">
        <DocTable
          headers={["Aspect", "Change"]}
          rows={[
            ["Base URL", "New production URL"],
            ["API key", "New production key"],
            ["Vendor", "Live fulfillment (real gift cards)"],
            ["Wallet", "Real funds"],
            ["Catalog", "Production catalog (may differ from staging)"],
          ]}
        />
        <p>See <Link to="/developers/environments" className="doc-link">Environments</Link> for the full comparison.</p>
      </DocSection>

      <DocSection title="Need help?">
        <p>
          Contact Steller for production credentials and go-live assistance.{" "}
          <Link to="/developers/support" className="doc-link">Support →</Link>
        </p>
      </DocSection>
    </DocsLayout>
  );
};

export default GoingToProduction;
