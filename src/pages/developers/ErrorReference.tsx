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
            ["400", "(varies)", "Invalid request", "Wrong sku (use SKU from catalog), faceValue out of range, insufficient wallet balance, or referenceId already used for a different order."],
            ["401", "API_KEY_MISSING", "API key not provided", "Include X-Api-Key (or x-api-key) header on every request."],
            ["403", "API_KEY_INVALID", "API key invalid or revoked", "Check the key and contact Steller if the issue persists."],
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
            ["400", "Invalid sku (use catalog), faceValue out of range, insufficient balance, or referenceId conflict"],
            ["401", "Missing API key header"],
            ["403", "API key invalid or inactive"],
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
