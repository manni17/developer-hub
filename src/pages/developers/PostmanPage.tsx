import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import CTAButton from "@/components/docs/CTAButton";
import { Link } from "react-router-dom";

const PostmanPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Postman" description="Download collection and environment; test without writing code." />

      <DocSection title="What you get">
        <p>Steller provides a ready-to-use Postman collection and staging environment:</p>
        <ul>
          <li><strong>Collection</strong> — catalog, orders, wallet, webhook endpoints</li>
          <li><strong>Environment</strong> — pre-configured <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">base_url</code> and <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">api_key</code> variables</li>
        </ul>
      </DocSection>

      <DocSection title="Download or Run in Postman">
        <div className="flex flex-wrap gap-3">
          <CTAButton href="#">Download collection</CTAButton>
          <CTAButton href="#" variant="secondary">Download environment</CTAButton>
        </div>
      </DocSection>

      <DocSection title="Setup">
        <ol>
          <li>Import the collection and environment into Postman</li>
          <li>Set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">base_url</code> to your base URL (provided by Steller at onboarding)</li>
          <li>Set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">api_key</code> to your API key</li>
          <li>Run requests — see <Link to="/developers/environments" className="doc-link">Environments</Link> for staging vs production</li>
        </ol>
      </DocSection>

      <DocSection title="What's in the collection">
        <DocTable
          headers={["Request", "Description"]}
          rows={[
            ["Get Catalog", "Retrieve partner-specific brand and SKU list"],
            ["Create Order", "Place a new gift card order"],
            ["Poll Order Status", "Check order status by ID"],
            ["Get Wallet", "View current wallet balance"],
            ["Get Transactions", "List wallet transaction history"],
            ["Get Webhook Config", "View current webhook settings"],
            ["Update Webhook", "Set webhook URL and secret"],
          ]}
        />
      </DocSection>
    </DocsLayout>
  );
};

export default PostmanPage;
