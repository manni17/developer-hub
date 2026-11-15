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

      <DocSection title="Download or Run in Postman">
        <div className="flex flex-wrap gap-3">
          <CTAButton href="/postman/steller-partner.postman_collection.json">Download collection</CTAButton>
          <CTAButton href="/postman/steller-staging.postman_environment.json" variant="secondary">Download environment</CTAButton>
        </div>
      </DocSection>

      <DocSection title="Setup">
        <ol>
          <li>Import the collection and the staging environment</li>
          <li>Set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">api_key</code> to the key Steller issued. For staging, leave <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">base_url</code> as <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">https://api-v2.steler.org</code></li>
          <li>If your first order was named, set <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> and <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> before Create. The sandbox example is sku 1823257, face value 2, quantity 1. Otherwise the folder uses the first activated product.</li>
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
            ["Poll order", "Repeats until Completed or Failed"],
          ]}
        />
      </DocSection>
    </DocsLayout>
  );
};

export default PostmanPage;
