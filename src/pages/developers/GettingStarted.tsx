import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import CTAButton from "@/components/docs/CTAButton";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  return (
    <DocsLayout>
      <PageHeader title="Getting started" description="Credentials, base URL, and your first API call." />

      <DocSection title="Prerequisites">
        <ul>
          <li>An <strong>API key</strong> from Steller</li>
          <li>The <strong>base URL</strong> for your environment (staging or production)</li>
        </ul>
        <p>
          <a href={siteConfig.signupUrl} className="doc-link">Get your API key →</a>
        </p>
      </DocSection>

      <DocSection title="Base URL">
        <ul>
          <li><strong>Staging:</strong> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">http://YOUR_STAGING_HOST:6091</code></li>
          <li><strong>Production:</strong> URL provided by Steller at go-live</li>
        </ul>
      </DocSection>

      <DocSection title="First call">
        <h3 className="text-base font-medium mb-2 text-foreground">Get your catalog</h3>
        <CodeBlock
          language="bash"
          code={`curl -X GET "YOUR_BASE_URL/api/brand/getCatalog" \\
  -H "x-api-key: YOUR_API_KEY"`}
        />
        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Check wallet</h3>
        <CodeBlock
          language="bash"
          code={`curl -X GET "YOUR_BASE_URL/api/wallet/me" \\
  -H "x-api-key: YOUR_API_KEY"`}
        />
      </DocSection>

      <DocSection title="Next steps">
        <ol>
          <li><Link to="/developers/api-reference" className="doc-link">API reference</Link> — full endpoint documentation</li>
          <li><Link to="/developers/postman" className="doc-link">Postman</Link> — test without writing code</li>
          <li><Link to="/developers/partner-dashboard" className="doc-link">Partner dashboard</Link> — browse catalog and place orders</li>
          <li><Link to="/developers/webhooks" className="doc-link">Webhooks</Link> — get notified on order completion</li>
        </ol>
      </DocSection>

      <DocSection title="Need an API key?">
        <p>Contact Steller to sign up or request access.</p>
        <CTAButton href={siteConfig.signupUrl}>Get started</CTAButton>
      </DocSection>
    </DocsLayout>
  );
};

export default GettingStarted;
