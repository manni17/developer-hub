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
      </DocSection>

      <DocSection title="HTTP and error codes">
        <DocTable
          headers={["HTTP", "errorCode", "Meaning", "What to do"]}
          rows={[
            ["400", "REFERENCE_ID_REQUIRED", "referenceId was omitted", "Send a new UUID on a new purchase."],
            ["400", "(varies)", "Invalid request", "Unknown sku, face value is not the fixed denomination, or the balance is too low. Nothing was debited."],
            ["401", "API_KEY_MISSING", "API key not provided", "Send the x-api-key header on every request."],
            ["403", "API_KEY_REQUIRED", "A dashboard token was sent", "Order calls use the API key only."],
            ["403", "API_KEY_INVALID", "API key invalid or revoked", "Ask Steller, in private, to reissue the key."],
            ["409", "IDEMPOTENCY_CONFLICT", "referenceId was reused with a different sku, face value, or quantity", "Keep this referenceId for the original order. Use a new one for a different purchase."],
            ["404", "NOT_FOUND", "Resource does not exist", "Verify ID or endpoint path"],
            ["429", "(varies)", "Rate limit exceeded", "Read Retry-After header. Retry with same referenceId."],
            ["500", "(varies)", "Unexpected server error", "Note the correlationId from the response and include it when contacting support."],
          ]}
        />
      </DocSection>

      <DocSection title="Order creation errors">
        <DocTable
          headers={["HTTP", "Typical cause"]}
          rows={[
            ["202", "Accepted and queued. Poll until Completed or Failed."],
            ["200", "The same referenceId and the same order. No second debit."],
            ["400", "Missing referenceId, unknown sku, wrong face value, or insufficient balance. No order was created."],
            ["409", "Same referenceId, different order. No second debit."],
            ["429", "Order rate limit. Wait for Retry-After, then send the same body."],
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
