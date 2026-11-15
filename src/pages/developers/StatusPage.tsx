import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import CTAButton from "@/components/docs/CTAButton";
import { siteConfig } from "@/config/site";

const StatusPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Status" description="How to check the health of Steller services." />

      <div className="rounded-lg border p-6 bg-card space-y-4">
        <p className="font-semibold text-foreground">Live status is not published yet.</p>
        <p className="text-muted-foreground">
          This page does not show real-time data. If you see errors or delays, or want to ask about an incident,
          contact support and include the correlationId from the error response.
        </p>
        <CTAButton href={`mailto:${siteConfig.supportEmail}?subject=Steller%20service%20status`}>Contact support</CTAButton>
      </div>
    </DocsLayout>
  );
};

export default StatusPage;