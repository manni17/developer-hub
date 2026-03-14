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
  "sku": "sku_abc123",
  "faceValue": 25,
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
            <code className="font-mono text-sm">/api/brand/getCatalog</code>
          </p>
          <p>Returns the partner-specific catalog of available brands and SKUs.</p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Transactional</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="POST" />
            <code className="font-mono text-sm">/api/orders</code>
          </p>
          <p>Create a new gift card order. Returns 202 with order ID.</p>
          <DocTable
            headers={["Field", "Type", "Required", "Description"]}
            rows={[
              ["sku", "string", "Yes", "SKU from catalog. Use the sku field from GET /api/brand/getCatalog."],
              ["faceValue", "number", "Yes", "Card value in catalog currency"],
              ["referenceId", "string", "Yes", "Your unique order reference"],
            ]}
          />
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/orders/:id</code>
          </p>
          <p>Poll order status. Returns order details including status and card data when completed.</p>
        </div>

        <h3 className="text-lg font-medium mb-3 mt-8 text-foreground">Financials</h3>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/wallet/me</code>
          </p>
          <p>Returns current wallet balance.</p>
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 mb-2">
            <MethodBadge method="GET" />
            <code className="font-mono text-sm">/api/wallet/transactions</code>
          </p>
          <p>Returns wallet transaction history. Supports pagination query params.</p>
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
        <p>Default: 100 requests per minute per API key. See <Link to="/developers/rate-limits" className="doc-link">Rate limits</Link>.</p>
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
