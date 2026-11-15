import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is the order call?", a: "POST /api/orders with the x-api-key header only. The body is sku, faceValue, quantity, and referenceId. You generate referenceId. The create call returns the order id and does not return the card." },
  { q: "How long does order fulfillment take?", a: "The create call returns in seconds with HTTP 202. Poll GET /api/orders/{id} every 5 seconds or slower. Completed means the card is in the response. Failed means Steller confirmed the failure and the wallet is refunded. Cancelled means Steller closed the order. If an order stays Processing for a long time, contact Steller with the order id and referenceId. A long wait is not a failure and is not a refund." },
  { q: "What do I do if I get a 429?", a: "You hit a rate limit: orders (1 per second, burst 2) or all calls (100 per minute per API key, polling included). Read Retry-After, wait, and send the same body again. A 429 is not a 409." },
  { q: "What happens if my order fails?", a: "Status Failed means Steller confirmed the failure and the wallet is refunded. A timeout while status is still Processing does not refund." },
  { q: "What is referenceId and why does it matter?", a: "You generate it. Use a new unique id for each new purchase (a UUID is recommended). If the call times out, send the same referenceId with the same sku, face value, and quantity. The API returns the original order with HTTP 200 and does not charge twice. The same referenceId with a different sku, face value, or quantity returns HTTP 409." },
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
