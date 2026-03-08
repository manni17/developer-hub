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
  "status": "error",
  "message": "Descriptive error message",
  "errorCode": "ERROR_CODE",
  "statusCode": 400,
  "errors": [],
  "correlationId": "abc-123-def-456"
}`} />
      </DocSection>

      <DocSection title="HTTP and error codes">
        <DocTable
          headers={["HTTP", "errorCode", "Meaning", "What to do"]}
          rows={[
            ["400", "VALIDATION_ERROR", "Invalid request body or params", "Check request against API reference"],
            ["401", "UNAUTHORIZED", "Missing or invalid API key", "Verify x-api-key header"],
            ["403", "FORBIDDEN", "Not authorized for this resource", "Check API key permissions"],
            ["404", "NOT_FOUND", "Resource does not exist", "Verify ID or endpoint path"],
            ["429", "RATE_LIMITED", "Too many requests", "Wait for Retry-After, then retry"],
            ["500", "INTERNAL_ERROR", "Server error", "Retry with back-off; contact support if persistent"],
          ]}
        />
      </DocSection>

      <DocSection title="Order creation errors">
        <DocTable
          headers={["HTTP", "Typical cause"]}
          rows={[
            ["400", "Invalid SKU, face value, or missing referenceId"],
            ["401", "Missing or invalid API key"],
            ["403", "Insufficient wallet balance or key not authorized"],
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
