import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long does order fulfillment take?", a: "Most orders complete within seconds to a few minutes. Poll the order status endpoint or listen for webhooks." },
  { q: "What do I do if I get a 429 error?", a: "Wait for the duration specified in the Retry-After header, then retry. For order creation, use the same referenceId to avoid double debits." },
  { q: "How do I get production credentials?", a: "Contact Steller when you've completed staging testing. We'll provide your production base URL and API key." },
  { q: "Where do I get my API key?", a: "Your API key is provided by Steller during onboarding. Contact support if you need a new one or rotation." },
  { q: "Why is my catalog empty?", a: "Your catalog is partner-specific. If it's empty, your account may not be fully provisioned. Contact Steller." },
  { q: "What happens if an order fails? Do I get a refund?", a: "Yes. If an order fails, the wallet debit is automatically reversed." },
  { q: "What happens if I send the same referenceId twice?", a: "The API returns the existing order for that referenceId. No new order is created and no additional funds are debited." },
];

const FAQsPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="FAQs" description="Common questions about integrating with Steller." />

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-foreground">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </DocsLayout>
  );
};

export default FAQsPage;
