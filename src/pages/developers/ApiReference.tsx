import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import DocTable from "@/components/docs/DocTable";
import MethodBadge from "@/components/docs/MethodBadge";
import { Link } from "react-router-dom";

const ApiReference = () => {
  return (
    <DocsLayout>
      <PageHeader title="API reference" description="Auth, endpoints, idempotency, and error handling." />

      <DocSection title="Overview">
        <p>
          Steller provides a REST API for digital gift card operations. Partners use a prepaid wallet model — 
          funds are debited at order time. Orders are asynchronous: create an order, then poll for completion.
          Your catalog is partner-specific.
        </p>
      </DocSection>

      <DocSection title="Authentication">
        <p>Authenticate every request with your API key in the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">x-api-key</code> header.</p>
        <CodeBlock language="http" code={`GET /api/partner/catalog/orderable HTTP/1.1
Host: YOUR_BASE_URL
x-api-key: YOUR_API_KEY`} />
        <p>Store your API key securely. Do not commit it to version control or expose it client-side.</p>
        <DocTable
          headers={["HTTP", "errorCode", "Meaning"]}
          rows={[
            ["401", "API_KEY_MISSING", "API key not provided"],
            ["403", "API_KEY_INVALID", "API key invalid or revoked"],
          ]}
        />
      </DocSection>

      <DocSection title="Base URL">
        <p>All paths are relative to your base URL. Use staging for development; production URL provided at go-live.</p>
      </DocSection>

      <DocSection title="Response envelope">
        <p>
          Successful JSON responses typically include <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">status</code>,{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data</code>, and{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">statusCode</code>. Read fields from{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data</code> (for example{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.brands</code>,{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.id</code> on orders).
        </p>
      </DocSection>

      <DocSection title="Order lifecycle">
        <p>
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code> → poll <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code> → Completed or Failed.
        </p>
        <DocTable
          headers={["Status", "Description"]}
          rows={[
            ["Processing", "Order accepted, fulfillment in progress"],
            ["Completed", "Gift card delivered; PIN and card data available"],
            ["Failed", "Fulfillment failed; wallet refunded"],
          ]}
        />
      </DocSection>

      <DocSection title="Idempotency">
        <p>
          You generate <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">referenceId</code>. A new value returns <strong>202 Accepted</strong>. The same sku, face value, quantity, and referenceId again returns <strong>200 OK</strong> and the original order. The same referenceId with any of those three fields changed returns <strong>409 Conflict</strong>. Omitting it returns <strong>400</strong>.
        </p>
        <CodeBlock language="json" code={`{
  "sku": "1823257",
  "faceValue": 2,
  "quantity": 1,
  "referenceId": "partner-order-001"
}`} />
        <p className="mt-2 text-muted-foreground text-sm">
          The sandbox example is sku 1823257, face value 2, quantity 1. Send it when that sku is on your orderable catalog.
        </p>
        <p className="mt-2 text-muted-foreground text-sm">
          Get <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> and{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code> from{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/partner/catalog/orderable</code> — only activated products appear there.
        </p>
      </DocSection>

      <DocSection title="Endpoints">
        <h3 className="text-lg font-medium mb-3 text-foreground">Discovery</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/partner/catalog/orderable</code>
          </p>
          <p>Returns only products activated for your partner account — these are the products you can order. Use the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> from each product when placing orders.</p>
          <CodeBlock language="json" code={`// Response (abbreviated — shape from live API)
{
  "status": true,
  "statusCode": 200,
  "data": {
    "brands": [
      {
        "name": "Garena Free Fire Global",
        "currencyCode": "USD",
        "products": [
          {
            "sku": "1823257",
            "name": "Product name from catalog",
            "minFaceValue": 2.0,
            "maxFaceValue": 2.0
          }
        ]
      }
    ],
    "count": 1,
    "totalProducts": 1
  }
}`} />
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>Key fields:</strong>
          </p>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
            <li><strong>sku</strong> — use in <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code>.</li>
            <li><strong>minFaceValue / maxFaceValue</strong> — send as <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> for fixed cards (min = max).</li>
            <li><strong>price.min / price.max</strong> — partner price debited from wallet (<code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">saleTotal</code> on the order), not the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> field.</li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/partner/catalog/browse</code>
          </p>
          <p>Full catalog with partner pricing — includes all products (activated or not). Use for browsing and marketing; contact Steller to activate products for ordering.</p>
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/brand/getCatalog</code>
          </p>
          <p>
            Legacy catalog endpoint. Prefer <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/partner/catalog/orderable</code> for ordering.
            If you use this route, pass a high <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">limit</code> (e.g.{" "}
            <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">?limit=500</code>) — the default page can look empty.
          </p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Transactional</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="POST" />
            <code className="font-mono text-sm">/api/orders</code>
          </p>
          <p>Create a gift card order with the API key. HTTP 202 means queued, not finished. The wallet is debited for the sale total. Status Failed, after the supplier confirms failure, refunds that debit. A timeout while Processing does not.</p>
          <DocTable
            headers={["Field", "Type", "Required", "Description"]}
            rows={[
              ["sku", "string", "Yes", "Product SKU from /api/partner/catalog/orderable."],
              ["faceValue", "number", "Yes", "The fixed face value for that sku. Send minFaceValue when it equals maxFaceValue."],
              ["quantity", "number", "Yes", "At least 1, at most 2000. Use 1 for the first order."],
              ["referenceId", "string", "Yes", "You generate this. A new UUID for a new purchase. The same UUID when retrying that purchase."],
            ]}
          />
          <CodeBlock language="json" code={`// Request — sandbox example. Use it when 1823257 is on your orderable catalog.
{
  "sku": "1823257",
  "faceValue": 2,
  "quantity": 1,
  "referenceId": "partner-order-001"
}

// Response (202 Accepted) — read order id from data.id; wallet debited by data.saleTotal
{
  "status": true,
  "statusCode": 202,
  "data": {
    "id": "024372fe-ab37-4190-8c37-9cf668b528a8",
    "status": "Processing",
    "createdAt": "2026-03-24T05:38:59Z",
    "cards": [],
    "isReplay": false
  }
}`} />
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>total</strong> is the card denomination. <strong>saleTotal</strong> is your wallet debit (partner price). They will differ based on your pricing agreement.
          </p>
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/orders/:id</code>
          </p>
          <p>Poll order status. When Completed, the response includes card data (serial, cardNumber, PIN).</p>
          <CodeBlock language="json" code={`// Response (Completed)
{
  "id": "024372fe-ab37-4190-8c37-9cf668b528a8",
  "status": "Completed",
  "total": 1.0,
  "saleTotal": 1.2,
  "createdAt": "2026-03-24T05:38:59Z",
  "cards": [
    {
      "serial": "b759bb85-f375-4006-...",
      "pin": "744",
      "cardNumber": "1ff889b45def4cee...",
      "expiryDate": "2027-03-24T05:39:01Z"
    }
  ]
}`} />
          <p className="mt-2 text-muted-foreground text-sm">
            <strong>cardNumber</strong> is the redemption code (gift card code). <strong>pin</strong> is the PIN if the card requires one. Both are only visible when status is Completed.
          </p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Financials</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/wallet/me</code>
          </p>
          <p>Returns current partner wallet balance.</p>
          <CodeBlock language="json" code={`// Response
{
  "availableBalance": 998.80,
  "currency": "USD"
}`} />
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/wallet/transactions</code>
          </p>
          <p>Returns wallet transaction history (debits, credits, refunds). Supports pagination query params.</p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Webhooks</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/partner/webhook</code>
          </p>
          <p>Get current webhook configuration. See <Link to="/developers/webhooks" className="doc-link">Webhooks</Link> for details.</p>
        </div>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="PUT" />
            <code className="font-mono text-sm">/api/partner/webhook</code>
          </p>
          <p>Update webhook URL and secret.</p>
        </div>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/partner/webhook/events</code>
          </p>
          <p>List recent webhook-like order events for catch-up and replay workflows.</p>
        </div>
      </DocSection>

      <DocSection title="Error handling">
        <CodeBlock language="json" code={`{
  "status": false,
  "message": "Description of the error",
  "data": null,
  "errorCode": "ERROR_CODE_HERE",
  "statusCode": 401,
  "errors": { "correlationId": "abc-123-def-456" }
}`} />
        <p>See <Link to="/developers/error-reference" className="doc-link">Error reference</Link> for the full table.</p>
      </DocSection>

      <DocSection title="Rate limits & retries">
        <p>Order creation is 1 request per second, burst 2, then HTTP 429. See <Link to="/developers/rate-limits" className="doc-link">Rate limits</Link>.</p>
        <DocTable
          headers={["Scenario", "Action"]}
          rows={[
            ["429 Too Many Requests", "Wait for Retry-After header, then retry"],
            ["5xx Server Error", "Retry with exponential back-off"],
            ["Order creation retry", "Same referenceId and the same sku, face value, and quantity"],
            ["409 on create", "That referenceId already belongs to a different order. Use a new referenceId"],
          ]}
        />
      </DocSection>

      <DocSection title="Integration checklist">
        <ul>
          <li>✅ API key stored securely (not in client-side code)</li>
          <li>✅ Unique referenceId per order</li>
          <li>✅ Poll order status until terminal state</li>
          <li>✅ Handle 429 and 5xx with retries</li>
          <li>✅ Webhook signature verification implemented</li>
          <li>✅ Never log PINs or full card data</li>
          <li>✅ Tested end-to-end on staging</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
};

export default ApiReference;
