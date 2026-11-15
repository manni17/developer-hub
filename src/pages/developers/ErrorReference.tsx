import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import DocTable from "@/components/docs/DocTable";
import { Link } from "react-router-dom";

const ErrorReference = () => {
  return (
    <DocsLayout>
      <PageHeader title="Error reference" description="HTTP and errorCode table; what to do." />

      <DocSection title="Standard error shape">
        <CodeBlock language="json" code={`{
  "status": false,
  "message": "Description of the error",
  "data": null,
  "errorCode": "ERROR_CODE_HERE",
  "statusCode": 401,
  "errors": { "correlationId": "abc-123-def-456" }
}`} />
        <p className="text-sm text-muted-foreground mt-2">
          Some errors, such as the 400 and 404 rows below, have no errorCode. Read the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">message</code> field for those.
        </p>
      </DocSection>

      <DocSection title="HTTP and error codes">
        <DocTable
          headers={["HTTP", "errorCode", "Meaning", "What to do"]}
          rows={[
            ["400", "REFERENCE_ID_REQUIRED", "referenceId was omitted", "Send a new UUID on a new purchase."],
            ["400", "(none)", "Invalid order request", "Read the message. Causes: unknown or not activated sku, quantity below 1 or above 2000, face value is not the fixed denomination, variable-value sku (not yet supported), SKU currency not supported, price changed, or balance too low (“Insufficient funds.”). An internal error while creating an order also returns 400 with the message “Internal Error”. In every case nothing was debited and no order was created."],
            ["401", "API_KEY_MISSING", "API key not provided", "Send the x-api-key header on every request."],
            ["403", "API_KEY_REQUIRED", "A dashboard token was sent", "Order calls use the API key only."],
            ["403", "API_KEY_INVALID", "API key invalid or revoked", "Ask Steller, in private, to reissue the key."],
            ["403", "PARTNER_SUSPENDED", "Partner account is suspended", "Contact Steller."],
            ["404", "(none) or NOT_FOUND", "Order not found (message “Order not found.”) or the path does not exist", "Check the order id (the id from the create response) and the endpoint path."],
            ["409", "IDEMPOTENCY_CONFLICT", "referenceId was reused with a different sku, face value, or quantity", "Keep this referenceId for the original order. Use a new one for a different purchase."],
            ["429", "RATE_LIMIT_EXCEEDED", "Order rate limit (1 per second, burst 2) or 100 requests per minute per API key", "Read the Retry-After header (whole seconds), wait, then retry with the same body and referenceId."],
            ["500", "INTERNAL_SERVER_ERROR", "Unexpected server error", "Note the correlationId from the response and include it when contacting support."],
            ["503", "CACHE_UNAVAILABLE", "Order placement is paused for a short time. Retry-After: 60", "No order was created and nothing was debited. Wait 60 seconds, then retry with the same referenceId."],
            ["503", "MONEY_STOP_ACTIVE", "Money operations are paused by Steller. Retry-After: 300", "No order was created and nothing was debited. Wait 300 seconds, then retry with the same referenceId. Read-only calls still work."],
            ["503", "CIRCUIT_BREAKER_OPEN", "Ordering is temporarily unavailable. Retry-After: 3600", "No order was created and nothing was debited. Wait one hour, then retry with the same referenceId."],
          ]}
        />
      </DocSection>

      <DocSection title="Order creation results">
        <DocTable
          headers={["HTTP", "Result"]}
          rows={[
            ["202", "Accepted and queued. Poll until Completed, Failed or Cancelled."],
            ["200", "The same referenceId and the same order. No second debit."],
            ["400", "Missing referenceId, unknown sku, wrong face value, or insufficient balance. No order was created."],
            ["409", "Same referenceId, different order. No second debit."],
            ["429", "Rate limit. Wait for Retry-After, then send the same body."],
            ["503", "Ordering is paused. No order was created. Wait for Retry-After, then retry with the same referenceId."],
          ]}
        />
      </DocSection>

      <DocSection title="Support">
        <p>
          When contacting support, include: <strong>correlationId</strong>, <strong>orderId</strong>, 
          <strong> timestamp</strong>, and the request payload (redact your API key).
        </p>
        <p><Link to="/developers/support" className="doc-link">Contact support →</Link></p>
      </DocSection>
    </DocsLayout>
  );
};

export default ErrorReference;