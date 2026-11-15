import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import CTAButton from "@/components/docs/CTAButton";

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

      <DocSection title="Download">
        <div className="flex flex-wrap gap-3">
          <CTAButton href="/postman/steller-partner.postman_collection.json">Download collection</CTAButton>
          <CTAButton href="/postman/steller-staging.postman_environment.json" variant="secondary">Download environment</CTAButton>
        </div>
      </DocSection>

      <DocSection title="Setup">
        <ol>
          <li>Import the collection and the staging environment</li>
          <li>Set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">api_key</code> to the key Steller issued. Set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">base_url</code> to the base URL Steller gave you with your key (the environment file is pre-filled with <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">https://api-v2.steler.org</code>)</li>
          <li>The <strong>Orderable catalog</strong> request saves the first activated product as <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> and <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code>. To order a different product, deselect that request in the Collection Runner and set both variables yourself before Create.</li>
          <li>Run the folder <strong>60-second first order</strong> with the Collection Runner. Expect wallet 200, create 202, replay 200, mismatch 409, then Completed</li>
        </ol>
      </DocSection>

      <DocSection title="What's in the collection">
        <DocTable
          headers={["Request", "Description"]}
          rows={[
            ["Wallet", "Balance for this API key"],
            ["Orderable catalog", "Saves the first activated sku and face value"],
            ["Create order", "HTTP 202, quantity 1, a new referenceId"],
            ["Replay same order", "HTTP 200, same order, no second debit"],
            ["Mismatch same referenceId", "HTTP 409 after a 2 second wait"],
            ["Poll order", "Repeats until Completed, Failed or Cancelled (at most 30 polls)"],
            ["Wallet transactions", "Wallet history (folder Account reads)"],
            ["Webhook config", "Current webhook URL and whether a secret is set (folder Account reads)"],
          ]}
        />
      </DocSection>
    </DocsLayout>
  );
};

export default PostmanPage;
