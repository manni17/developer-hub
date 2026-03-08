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
          <li>✅ Complete staging sign-off — test all flows end-to-end</li>
          <li>✅ Get production base URL and API key from Steller</li>
          <li>✅ Update your configuration with production values</li>
          <li>✅ Place one test order in production</li>
          <li>✅ Contact <Link to="/developers/support" className="doc-link">support</Link> if you need help</li>
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
