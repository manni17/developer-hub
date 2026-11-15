import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import CTAButton from "@/components/docs/CTAButton";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const PartnerDashboard = () => {
  return (
    <DocsLayout>
      <PageHeader title="Partner dashboard" description="Web app to review catalog, orders, wallet, and webhook settings." />

      <DocSection title="What is the Partner dashboard?">
        <p>
          The partner dashboard is a separate login for reviewing the account. An order from your system is POST /api/orders with the API key. The dashboard login is not that call.
        </p>
      </DocSection>

      <DocSection title="When to use dashboard vs API">
        <DocTable
          headers={["Use case", "Recommended"]}
          rows={[
            ["Automated order flow", "API"],
            ["Place orders", "API only (a dashboard login cannot place orders)"],
            ["Balance check, webhook config", "Dashboard or API"],
            ["View order history in browser", "Dashboard"],
          ]}
        />
      </DocSection>

      <DocSection title="How to log in">
        <ul>
          <li>Navigate to the dashboard URL provided by Steller</li>
          <li>Enter your email and password</li>
          <li>If you cannot sign in, contact Steller</li>
        </ul>
        <p className="mt-2 text-sm">Note: Your dashboard password is separate from your API key. Do not send your password via the API.</p>
      </DocSection>

      <DocSection title="What you can do after login">
        <ul>
          <li><strong>Catalog</strong> — browse available brands and SKUs</li>
          <li><strong>Orders</strong> — review and search orders placed with the API key</li>
          <li><strong>Wallet</strong> — check balance and transaction history</li>
          <li><strong>Webhook</strong> — configure webhook URL and secret</li>
        </ul>
      </DocSection>

      <DocSection title="Open dashboard">
        <CTAButton href={siteConfig.dashboardUrl}>Open partner dashboard</CTAButton>
      </DocSection>

      <DocSection title="Security">
        <p>
          Keep your dashboard password and API key secure. See <Link to="/developers/security" className="doc-link">Security</Link> for best practices.
        </p>
      </DocSection>
    </DocsLayout>
  );
};

export default PartnerDashboard;
