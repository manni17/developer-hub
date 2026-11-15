import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import { Link } from "react-router-dom";

const SecurityPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Security" description="Best practices for securing your Steller integration." />

      <DocSection title="API key">
        <ul>
          <li>Store your API key securely (environment variables, secrets manager)</li>
          <li>Use a separate API key for each environment. During key rotation two keys work briefly.</li>
          <li>Send only in the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">x-api-key</code> header, never in URLs or client-side code</li>
          <li>If a key may have been exposed, contact Steller to rotate it</li>
        </ul>
      </DocSection>

      <DocSection title="PIN and card data">
        <ul>
          <li>Never log PINs or full card numbers</li>
          <li>Store card data securely; delete when no longer needed</li>
        </ul>
      </DocSection>

      <DocSection title="HTTPS">
        <p>All traffic, including staging, must use HTTPS.</p>
      </DocSection>

      <DocSection title="Webhook secret">
        <p>
          Use a strong, random secret for webhook signature verification, and use an https:// webhook URL.
          See <Link to="/developers/webhooks" className="doc-link">Webhooks</Link> for verification code samples.
        </p>
      </DocSection>

      <DocSection title="IP allowlisting">
        <p>Optional: contact Steller to configure IP allowlisting for your API key.</p>
      </DocSection>
    </DocsLayout>
  );
};

export default SecurityPage;
