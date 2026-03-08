import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import DocTable from "@/components/docs/DocTable";
import MethodBadge from "@/components/docs/MethodBadge";

const WebhooksPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Webhooks" description="Events, endpoints, signature verification, and retry policy." />

      <DocSection title="Overview">
        <p>
          Steller sends webhook notifications when orders complete or fail, and when your wallet balance is low.
          Configure your webhook URL and secret via the API or partner dashboard.
        </p>
      </DocSection>

      <DocSection title="Endpoints">
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/partner/webhook</code>
          </p>
          <p>Returns current webhook configuration (webhookUrl, hasSecret).</p>
        </div>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="PUT" />
            <code className="font-mono text-sm">/api/partner/webhook</code>
          </p>
          <p>Update webhook URL and secret. Auth: x-api-key or JWT.</p>
          <CodeBlock language="json" code={`{
  "webhookUrl": "https://your-server.com/webhooks/steller",
  "webhookSecret": "your-strong-secret"
}`} />
        </div>
      </DocSection>

      <DocSection title="Events">
        <DocTable
          headers={["Event", "When"]}
          rows={[
            ["order.completed", "Gift card fulfilled successfully"],
            ["order.failed", "Order fulfillment failed; wallet refunded"],
            ["low_balance", "Wallet balance below threshold"],
          ]}
        />
      </DocSection>

      <DocSection title="Signature">
        <p>
          Every webhook request includes an <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">X-Steller-Signature</code> header.
          This is an HMAC-SHA256 of the raw request body using your <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code>.
          Always verify the signature before processing.
        </p>
      </DocSection>

      <DocSection title="Verification (Node.js)">
        <CodeBlock language="javascript" code={`const crypto = require('crypto');

function verifyWebhook(body, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`} />
      </DocSection>

      <DocSection title="Verification (Python)">
        <CodeBlock language="python" code={`import hmac
import hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)`} />
      </DocSection>

      <DocSection title="Retry policy">
        <ul>
          <li>Up to <strong>5 retries</strong> over ~24 hours with exponential back-off</li>
          <li>If you miss a webhook, poll <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code></li>
          <li>No replay API is currently available</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
};

export default WebhooksPage;
