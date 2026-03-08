import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import { CheckCircle } from "lucide-react";

const StatusPage = () => {
  const services = [
    { name: "API", status: "Operational" },
    { name: "Partner Dashboard", status: "Operational" },
    { name: "Webhooks", status: "Operational" },
  ];

  return (
    <DocsLayout>
      <PageHeader title="Status" description="Current operational status of Steller services." />

      <div className="rounded-lg border p-6 bg-card">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="h-5 w-5 text-accent" />
          <span className="font-semibold text-foreground">All systems operational</span>
        </div>

        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc.name} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <span className="text-foreground">{svc.name}</span>
              <span className="text-sm text-accent font-medium">{svc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
};

export default StatusPage;
