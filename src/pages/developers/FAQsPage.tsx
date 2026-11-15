import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is the order call?", a: "POST /api/orders with the x-api-key header only. The body is sku, faceValue, quantity, and referenceId. You generate referenceId. The create call returns the order id and does not return the card. A different path, a request id, a product list, or a dashboard token is not this call." },
  { q: "How long does order fulfillment take?", a: "The create call returns in seconds with HTTP 202. Poll GET /api/orders/{id} every 2–5 seconds. Completed means the card is in the response. Failed means the supplier confirmed failure and the wallet is refunded. Still Processing after about 10 minutes is not a failure and is not a refund. Contact Steller with the order id and referenceId." },
  { q: "What do I do if I get a 429?", a: "You sent orders faster than 1 per second after a burst of 2. Read Retry-After, wait, and send the same body again. A 429 is not a 409." },
  { q: "What happens if my order fails?", a: "Status Failed means the supplier confirmed the failure and the wallet is refunded. A timeout while status is still Processing does not refund." },
  { q: "What is referenceId and why does it matter?", a: "You generate it. Use a new UUID for each new purchase. If the call times out, send the same UUID with the same sku, face value, and quantity. The API returns the original order with HTTP 200 and does not charge twice. The same UUID with a different sku, face value, or quantity returns HTTP 409." },
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
