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
        <CodeBlock language="http" code={`GET /api/brand/getCatalog HTTP/1.1
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
          Use a unique <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">referenceId</code> per order. 
          Sending the same referenceId returns the existing order — no double debit.
        </p>
        <CodeBlock language="json" code={`{
  "sku": "1823256",
  "faceValue": 1,
  "quantity": 1,
  "referenceId": "partner-order-001"
}`} />
        <p className="mt-2 text-muted-foreground text-sm">
          SKU value comes from <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/brand/getCatalog</code> — use the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> field from each product.
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
          <CodeBlock language="json" code={`// Response (abbreviated)
{
  "brands": [
    {
      "name": "Free Fire",
      "currencyCode": "USD",
      "countryCode": "US",
      "products": [
        {
          "id": 1823256,
          "name": "Free Fire 100 +10 Diamonds",
          "sku": "1823256",
          "minFaceValue": 1.0,
          "maxFaceValue": 1.0,
          "partnerPriceMin": 0.945,
          "partnerPriceMax": 0.945
        }
      ]
    }
  ],
  "count": 1,
  "totalProducts": 5
}`} />
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
          <p>Legacy catalog endpoint. Returns your partner-specific catalog. Prefer <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/partner/catalog/orderable</code> for ordering.</p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Transactional</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="POST" />
            <code className="font-mono text-sm">/api/orders</code>
          </p>
          <p>Create a new gift card order. Returns 202 with order ID. Wallet is debited at creation; refunded on failure.</p>
          <DocTable
            headers={["Field", "Type", "Required", "Description"]}
            rows={[
              ["sku", "string", "Yes", "Product SKU from catalog (e.g. from /api/partner/catalog/orderable)."],
              ["faceValue", "number", "Yes", "Face value per card; must be within product minFaceValue/maxFaceValue."],
              ["quantity", "number", "Yes", "Number of cards to order."],
              ["referenceId", "string", "Yes", "Your unique order reference (max 100 chars). For retries, use the same referenceId."],
            ]}
          />
          <CodeBlock language="json" code={`// Request
{
  "sku": "1823256",
  "faceValue": 1,
  "quantity": 1,
  "referenceId": "partner-order-001"
}

// Response (202 Accepted)
{
  "id": "024372fe-ab37-4190-8c37-9cf668b528a8",
  "status": "Processing",
  "total": 1.0,
  "saleTotal": 1.2,
  "createdAt": "2026-03-24T05:38:59Z",
  "cards": []
}`} />
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
        <p>Redis-based distributed rate limiting per endpoint, per second. See <Link to="/developers/rate-limits" className="doc-link">Rate limits</Link>.</p>
        <DocTable
          headers={["Scenario", "Action"]}
          rows={[
            ["429 Too Many Requests", "Wait for Retry-After header, then retry"],
            ["5xx Server Error", "Retry with exponential back-off"],
            ["Order creation retry", "Use the same referenceId to avoid double debit"],
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
