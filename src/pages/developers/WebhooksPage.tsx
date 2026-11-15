import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import DocTable from "@/components/docs/DocTable";
import MethodBadge from "@/components/docs/MethodBadge";

const WebhooksPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Webhooks" description="Payload, endpoints, signature verification, and retry policy." />

      <DocSection title="Overview">
        <p>
          Steller sends a webhook notification when an order completes or fails.
          A webhook is required before go-live: set your webhook URL and secret via the API or the partner dashboard.
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
          <p>Update webhook URL and secret. Auth: x-api-key or JWT. Use an https:// URL.</p>
          <CodeBlock language="json" code={`{
  "webhookUrl": "https://example.com/webhooks/steller",
  "webhookSecret": "<your-webhook-secret>"
}`} />
          <p className="text-sm text-muted-foreground mt-2">
            Use the exact request field name <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code>.
            The alias <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">secret</code> is not accepted.
          </p>
        </div>
      </DocSection>

      <DocSection title="Payload">
        <p>
          Steller sends an HTTP POST with a JSON body. The body has no event field: branch on{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">status</code>, which is{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">Completed</code> or{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">Failed</code>.
        </p>
        <CodeBlock language="json" code={`{
  "requestId": "3f6c2b0e-8a41-4d1e-9b7a-5c2f0a1d7e11",
  "status": "Completed",
  "orderId": 123456789,
  "partnerId": 12,
  "total": 2.0,
  "currency": "USD",
  "createdAt": "2026-11-13T15:04:05Z",
  "updatedAt": "2026-11-13T15:04:07Z",
  "requestedCount": 1,
  "deliveredCount": 1,
  "refundedAmount": 0
}`} />
        <DocTable
          headers={["Field", "Type", "Description"]}
          rows={[
            ["requestId", "string", "Equals your referenceId when the referenceId you sent was a UUID (written in lowercase). For any other referenceId it is a different, derived id. Use a UUID as referenceId so you can match on it."],
            ["status", "string", "Completed or Failed."],
            ["orderId", "integer", "A number, not the UUID returned as id by POST /api/orders. It can be 0. Do not use it to look up an order; match on requestId and call GET /api/orders/:id."],
            ["partnerId", "integer", "Your partner id."],
            ["total", "number", "Face value × quantity."],
            ["currency", "string", "Currency code."],
            ["createdAt, updatedAt", "string", "ISO 8601 timestamps."],
            ["requestedCount, deliveredCount, refundedAmount", "number", "Cards ordered, cards delivered, and the amount refunded to your wallet."],
          ]}
        />
        <p className="text-sm text-muted-foreground mt-2">
          The webhook does not contain card data. When status is Completed, call <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code> to read the cards. The values above are examples.
        </p>
      </DocSection>

      <DocSection title="Event list">
        <p>
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/webhook/events?limit=50</code> returns your most recent completed or failed orders (limit 1 to 200). The event names appear only here, in <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">eventType</code>. Steller does not replay webhooks.
        </p>
        <CodeBlock language="json" code={`// Response (envelope abbreviated)
{
  "status": true,
  "statusCode": 200,
  "data": [
    {
      "orderId": "9d2f6a41-5b0e-4c8a-8e61-2f7d3c9a1b04",
      "eventType": "order.completed",
      "status": "Completed",
      "total": 2.0,
      "occurredAt": "2026-11-13T15:04:07Z"
    }
  ]
}`} />
        <DocTable
          headers={["eventType", "When"]}
          rows={[
            ["order.completed", "Gift card fulfilled successfully"],
            ["order.failed", "Order fulfillment failed; wallet refunded"],
          ]}
        />
        <p className="text-sm text-muted-foreground mt-2">
          In this list <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">orderId</code> is the same UUID that POST /api/orders returns as <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">id</code>.
        </p>
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
        <CodeBlock language="python" code={`import base64
import hmac
import hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        body,
        hashlib.sha256
    ).digest()
    try:
        received = base64.b64decode(signature)
    except Exception:
        return False
    if len(received) != len(expected):
        return False
    return hmac.compare_digest(received, expected)`} />
      </DocSection>

      <DocSection title="Retry policy">
        <ul>
          <li>Steller attempts delivery once and retries up to five more times if your server does not accept it.</li>
          <li>The webhook tells you an order finished. <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code> returns the order and, when Completed, the cards. If a webhook does not arrive, poll that order.</li>
          <li>For catch-up, you can list recent events via <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/webhook/events?limit=50</code></li>
        </ul>
      </DocSection>

      <DocSection title="Delivery troubleshooting">
        <ul>
          <li><strong>Step 1: Confirm Steller event generation</strong> — Check <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/webhook/events</code>. If your order event is present there, Steller created the event.</li>
          <li><strong>Step 2: Confirm external delivery</strong> — Verify your endpoint logs show an incoming HTTP POST and a 2xx response. Event presence alone does not prove your receiver got it.</li>
          <li><strong>If events exist but no callback reached your server</strong> — verify your webhook URL is publicly reachable, TLS is valid, your firewall or CDN is not blocking requests to it (ask Steller if you need source address details), and your handler returns 2xx quickly.</li>
          <li><strong>If callback arrived but verification failed</strong> — use the raw request body for HMAC validation and the exact <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">webhookSecret</code> value configured in Steller.</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
};

export default WebhooksPage;