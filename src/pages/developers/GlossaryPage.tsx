import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";

const glossaryTerms = [
  { term: "API key", definition: "A unique token used to authenticate requests to the Steller API. Sent in the x-api-key header." },
  { term: "Base URL", definition: "The root URL for all API requests. Different for staging and production environments." },
  { term: "Card number (cardNumber)", definition: "The gift card redemption code returned in the order response when status is Completed. This is the code the end-user redeems." },
  { term: "Face value (faceValue)", definition: "The card denomination (e.g. $1, $25, $50). This is what you send in POST /api/orders. It may differ from the partner price (what your wallet is debited). For fixed cards, use the denomination confirmed by Steller." },
  { term: "Idempotency", definition: "The property that sending the same request multiple times produces the same result. Achieved via referenceId." },
  { term: "Partner-specific pricing", definition: "Pricing that may differ per partner based on contractual agreements." },
  { term: "Prepaid wallet", definition: "A pre-funded balance that is debited when orders are placed. Top up via Steller." },
  { term: "referenceId", definition: "A unique identifier you provide per order to enable idempotency and prevent double debits." },
  { term: "Sale total", definition: "The amount debited from the wallet for an order, which may differ from face value based on pricing." },
  { term: "SKU", definition: "Stock Keeping Unit — a unique identifier for a specific gift card product and denomination." },
  { term: "Staging vs production", definition: "Staging uses a sandbox vendor with test funds but real API flows — orders debit your wallet and go through fulfillment. Production uses live vendor and real money. Both require valid API keys and activated products." },
];

const GlossaryPage = () => {
  return (
    <DocsLayout>
      <PageHeader title="Glossary" description="Key terms used throughout the Steller developer documentation." />

      <dl className="space-y-4">
        {glossaryTerms.map((item) => (
          <div key={item.term} className="pb-4 border-b last:border-b-0">
            <dt className="font-semibold text-foreground">{item.term}</dt>
            <dd className="text-muted-foreground mt-1">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </DocsLayout>
  );
};

export default GlossaryPage;
