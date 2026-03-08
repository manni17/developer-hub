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
            ["Base URL", "Provided at onboarding", "Provided at go-live"],
            ["API key", "Staging key", "Production key"],
            ["Vendor", "Sandbox / mock fulfillment", "Live vendor (real gift cards)"],
            ["Wallet", "Test funds", "Real funds"],
            ["Catalog", "May include test brands", "Production brands only"],
            ["Dashboard", "Staging dashboard URL", "Production dashboard URL"],
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
