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
          Steller sends webhook notifications when orders complete or fail.
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
          <p className="text-sm text-muted-foreground mt-2">
            Use the exact request field name <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code>.
            The alias <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">secret</code> is not accepted.
          </p>
        </div>
      </DocSection>

      <DocSection title="Events">
        <DocTable
          headers={["Event", "When"]}
          rows={[
            ["order.completed", "Gift card fulfilled successfully"],
            ["order.failed", "Order fulfillment failed; wallet refunded"],
          ]}
        />
      </DocSection>

      <DocSection title="Signature">
        <p>
          Every webhook request includes an <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">X-Steller-Signature</code> header.
          This is a Base64-encoded HMAC-SHA256 of the raw request body using your <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code>.
          Always verify the signature before processing.
        </p>
      </DocSection>

      <DocSection title="Verification (Node.js)">
        <CodeBlock language="javascript" code={`const crypto = require('crypto');

function verifyWebhook(body, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');

  // timingSafeEqual requires buffers of equal length
  const sigBuf = Buffer.from(signature, 'base64');
  const expBuf = Buffer.from(expected, 'base64');
  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(
    sigBuf,
    expBuf
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
    ).digest()
    received = base64.b64decode(signature)
    if len(received) != len(expected):
        return False
    return hmac.compare_digest(received, expected)`} />
      </DocSection>

      <DocSection title="Retry policy">
        <ul>
          <li>Up to <strong>5 retries</strong> with exponential back-off for failed webhook deliveries</li>
          <li>If you miss a webhook, poll <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code></li>
          <li>For catch-up, you can list recent events via <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/webhook/events?limit=50</code></li>
        </ul>
      </DocSection>

      <DocSection title="Delivery troubleshooting">
        <ul>
          <li><strong>Step 1: Confirm Steller event generation</strong> — Check <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/webhook/events</code>. If your order event is present there, Steller created the event.</li>
          <li><strong>Step 2: Confirm external delivery</strong> — Verify your endpoint logs show an incoming HTTP POST and a 2xx response. Event presence alone does not prove your receiver got it.</li>
          <li><strong>If events exist but no callback reached your server</strong> — verify your webhook URL is publicly reachable, TLS is valid, your firewall/CDN allows Steller source traffic, and your handler returns 2xx quickly.</li>
          <li><strong>If callback arrived but verification failed</strong> — use the raw request body for HMAC validation and the exact <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code> value configured in Steller.</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
};

export default WebhooksPage;
