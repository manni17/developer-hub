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
          <li><strong>Staging:</strong> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">{siteConfig.apiBaseUrlStaging}</code> — use this for integration testing and signup flows.</li>
          <li><strong>Production:</strong> URL provided by Steller at go-live.</li>
        </ul>
      </DocSection>

      <DocSection title="First call">
        <h3 className="text-base font-medium mb-2 text-foreground">Get your orderable catalog</h3>
        <CodeBlock
          language="bash"
          code={`curl -X GET "${siteConfig.apiBaseUrlStaging}/api/partner/catalog/orderable" \\
  -H "x-api-key: YOUR_API_KEY"`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Returns only products activated for your account. Use the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> and <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code>/<code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">maxFaceValue</code> from the response when placing orders.
        </p>
        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Check wallet</h3>
        <CodeBlock
          language="bash"
          code={`curl -X GET "${siteConfig.apiBaseUrlStaging}/api/wallet/me" \\
  -H "x-api-key: YOUR_API_KEY"`}
        />
      </DocSection>

      <DocSection title="Important rules">
        <ul>
          <li><strong>Always send a unique <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">referenceId</code></strong> on <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code> (idempotency). If you retry after a timeout, use the <strong>same</strong> referenceId — no double debit.</li>
          <li><strong>Poll <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code></strong> every 2–5 seconds until status is <strong>Completed</strong> or <strong>Failed</strong>. Do not stop polling early.</li>
          <li><strong>Use only SKUs from your catalog</strong> — call <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/partner/catalog/orderable</code> first.</li>
          <li><strong>faceValue = card denomination</strong> — for fixed cards, use the denomination confirmed by Steller (e.g. 1 for a $1 card). Note: <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">partnerPriceMin/Max</code> from the catalog is what you pay, not the faceValue you send.</li>
          <li><strong>Prepaid wallet</strong> — insufficient balance causes order creation to fail. Failed orders are refunded automatically.</li>
        </ul>
      </DocSection>

      <DocSection title="Next steps">
        <ol>
          <li><Link to="/developers/api-reference" className="doc-link">API reference</Link> — full endpoint documentation with request/response examples</li>
          <li><Link to="/developers/postman" className="doc-link">Postman</Link> — test without writing code</li>
          <li><Link to="/developers/partner-dashboard" className="doc-link">Partner dashboard</Link> — browse catalog and place orders via UI</li>
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
