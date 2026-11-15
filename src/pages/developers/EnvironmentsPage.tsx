import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import { Link } from "react-router-dom";

const EnvironmentsPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Environments" description="Staging vs production: what's different." />

      <DocSection title="Summary">
        <DocTable
          headers={["Aspect", "Staging", "Production"]}
          rows={[
            ["Purpose", "Development and testing", "Live operations"],
            ["Base URL", "The base URL Steller gave you with your key", "Provided at go-live"],
            ["API key", "Staging key", "Production key"],
            ["Fulfilment", "Steller tells you how orders are fulfilled in staging", "Live (real gift cards)"],
            ["Wallet", "Steller tells you how staging is funded", "Real funds"],
            ["Catalog", "May differ from production", "Production catalog"],
          ]}
        />
      </DocSection>

      <DocSection title="When to use which">
        <p>
          Use <strong>staging</strong> for all development and testing. Move to <strong>production</strong> only after 
          completing the <Link to="/developers/going-to-production" className="doc-link">go-live checklist</Link>.
        </p>
      </DocSection>

      <DocSection title="Same in both">
        <ul>
          <li>API contract and endpoints</li>
          <li>Order lifecycle flow</li>
          <li>Webhook events and signature format</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
};

export default EnvironmentsPage;
