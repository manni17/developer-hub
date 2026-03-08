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
      <PageHeader title="Partner dashboard" description="Web app for catalog, orders, wallet, and webhook config." />

      <DocSection title="What is the Partner dashboard?">
        <p>
          The Partner dashboard is a web application where you can browse the catalog, place ad-hoc orders,
          view order history, check your wallet balance, and configure webhook settings — all without writing code.
        </p>
      </DocSection>

      <DocSection title="When to use dashboard vs API">
        <DocTable
          headers={["Use case", "Recommended"]}
          rows={[
            ["Automated order flow", "API"],
            ["Ad-hoc order, balance check, webhook config", "Dashboard or API"],
            ["View order history in browser", "Dashboard"],
          ]}
        />
      </DocSection>

      <DocSection title="How to log in">
        <ul>
          <li>Navigate to the dashboard URL provided by Steller</li>
          <li>Enter your email and password</li>
          <li>Use "Forgot password?" if you need to reset</li>
        </ul>
        <p className="mt-2 text-sm">Note: Your dashboard password is separate from your API key. Do not send your password via the API.</p>
      </DocSection>

      <DocSection title="What you can do after login">
        <ul>
          <li><strong>Catalog</strong> — browse available brands and SKUs</li>
          <li><strong>Place order</strong> — create ad-hoc gift card orders</li>
          <li><strong>Order report</strong> — view and search order history</li>
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
