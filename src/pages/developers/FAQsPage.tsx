import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long does order fulfillment take?", a: "Typically 1–2 minutes. Poll GET /api/orders/{id} every 2–5 seconds until status is Completed or Failed. Do not stop polling until you reach a terminal state." },
  { q: "What do I do if I get a 429?", a: "Read the Retry-After header and wait that many seconds before retrying. Retry with the exact same referenceId to avoid a double charge." },
  { q: "What happens if my order fails?", a: "Failed orders are refunded automatically to your wallet. You will not be charged for a failed order." },
  { q: "What is referenceId and why does it matter?", a: "It is your unique identifier for each order. Always send a unique referenceId per order. If you retry a timed-out or failed request, use the same referenceId — the backend will return the existing order instead of creating a duplicate. Never reuse a referenceId for a different order." },
  { q: "My catalog is empty — what do I do?", a: "Contact Steller to have products activated for your account. The catalog only shows products enabled for your partner account." },
  { q: "How do I get production credentials?", a: "Complete staging sign-off (place at least one successful test order end-to-end), then contact Steller. Production credentials are issued after sign-off." },
  { q: "Where do I find my API key?", a: "Your API key is provided by Steller when your partner account is set up. If you need a new key, contact Steller." },
];

const FAQsPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="FAQs" description="Common questions about integrating with Steller." />

      <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="w-full">
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
