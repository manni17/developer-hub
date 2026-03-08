import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CTAButton from "@/components/docs/CTAButton";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const SupportPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Support" description="How to get help with your Steller integration." />

      <DocSection title="How to get help">
        <p>
          Contact Steller for assistance with integration, production credentials, API key rotation,
          or any technical questions.
        </p>
      </DocSection>

      <DocSection title="What to send">
        <ul>
          <li><strong>correlationId</strong> — from error responses</li>
          <li><strong>orderId</strong> — if related to a specific order</li>
          <li><strong>Timestamp</strong> — when the issue occurred</li>
          <li><strong>Request payload</strong> — redact your API key</li>
        </ul>
      </DocSection>

      <DocSection title="Status">
        <p>
          Check the current status of Steller services:{" "}
          <Link to="/developers/status" className="doc-link">Status page →</Link>
        </p>
      </DocSection>

      <DocSection title="Contact">
        <CTAButton href={`mailto:${siteConfig.supportEmail}`}>Contact support</CTAButton>
      </DocSection>
    </DocsLayout>
  );
};

export default SupportPage;
