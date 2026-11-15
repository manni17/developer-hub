import { useState } from "react";
import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import DocTable from "@/components/docs/DocTable";
import CodeBlock from "@/components/docs/CodeBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  const [baseUrl, setBaseUrl] = useState(siteConfig.apiBaseUrlStaging);
  const [apiKey, setApiKey] = useState("");

  const effectiveBase = baseUrl.trim() || siteConfig.apiBaseUrlStaging;
  const effectiveKey = apiKey.trim() || "YOUR_API_KEY";

  const walletCurl = `curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/wallet/me"`;
  const catalogCurl = `curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/orderable" | jq .`;

  /** Catalog-driven path: only SKUs returned here can be ordered (avoids hard-coded SKU failures). */
  const ttvScript = `set -e
CATALOG=$(curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/orderable")
SKU=$(echo "$CATALOG" | jq -r '.data.brands[0].products[0].sku // empty')
FACE=$(echo "$CATALOG" | jq -r '.data.brands[0].products[0].minFaceValue // empty')
if [ -z "$SKU" ] || [ "$SKU" = "null" ]; then
  echo "No activated products in orderable catalog. Contact Steller to activate SKUs and fund your wallet."
  exit 1
fi
REF="partner-test-$(date +%s)"
ORDER=$(curl -sS -w "\\nHTTP:%{http_code}" -X POST "${effectiveBase}/api/orders" \\
  -H "x-api-key: ${effectiveKey}" \\
  -H "Content-Type: application/json" \\
  -d "{\\"sku\\":\\"$SKU\\",\\"faceValue\\":$FACE,\\"quantity\\":1,\\"referenceId\\":\\"$REF\\"}")
BODY=$(echo "$ORDER" | sed '/^HTTP:/d')
CODE=$(echo "$ORDER" | grep '^HTTP:' | cut -d: -f2)
echo "$BODY" | jq .
if [ "$CODE" != "202" ]; then echo "Expected HTTP 202; got $CODE"; exit 1; fi
ORDER_ID=$(echo "$BODY" | jq -r '.data.id')
echo "Success: order accepted (202). Poll: GET /api/orders/$ORDER_ID"`;

  const pollCurl = `ORDER_ID="PASTE_ID_FROM_CREATE_RESPONSE"
curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/orders/$ORDER_ID" | jq .`;

  const manualOrderCurl = `curl -sS -X POST "${effectiveBase}/api/orders" \\
  -H "x-api-key: ${effectiveKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "1823257",
    "faceValue": 2,
    "quantity": 1,
    "referenceId": "partner-test-UNIQUE"
  }'`;

  return (
    <DocsLayout>
      <PageHeader title="Getting started" description="Credentials, base URL, and your first API call." />

      <DocSection title="Prerequisites">
        <ul>
          <li>An <strong>API key</strong> issued by Steller with your account. Orders do not use a dashboard token.</li>
          <li>Staging base URL: <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">{siteConfig.apiBaseUrlStaging}</code></li>
          <li>A <strong>funded wallet</strong> and at least one <strong>activated SKU</strong> on your partner account</li>
        </ul>
      </DocSection>

      <DocSection title="The order call">
        <p>
          The order call is <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code> with the header{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">x-api-key</code> only. The body is sku, faceValue, quantity, and referenceId.
          The create call returns the order id. It does not return the card. A different path, a request id, a product list, or a dashboard token is not this call.
        </p>
        <DocTable
          headers={["Name on some requirements pages", "The order call"]}
          rows={[
            ["POST /api/Order", "POST /api/orders"],
            ["Dashboard token or JWT", "Header x-api-key"],
            ["requestId", "referenceId, a UUID you generate"],
            ["Products list", "One sku, one faceValue, one quantity"],
            ["Cards in the create response", "Cards on GET /api/orders/{orderId} when status is Completed"],
            ["GET /api/brand/getCatalog", "GET /api/partner/catalog/orderable"],
          ]}
        />
        <p>
          The first order is quantity 1, sku <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">1823257</code>, face value 2, and a referenceId you generate.
          Confirm that sku on the orderable catalog before you send it.
        </p>
      </DocSection>

      <DocSection title="What the response means">
        <DocTable
          headers={["Result", "What you do"]}
          rows={[
            ["HTTP 202", "The order is queued. Poll the order id. The wallet is debited for the sale total."],
            ["HTTP 200", "The same order. No second debit. Keep polling that order."],
            ["HTTP 409", "That referenceId belongs to a different purchase. Use a new UUID."],
            ["HTTP 429", "Wait for Retry-After, then send the same body. A 429 is not a 409."],
            ["Still Processing after about 10 minutes", "Contact Steller with the order id and referenceId. That wait is not a refund."],
          ]}
        />
      </DocSection>

      <DocSection title="Base URL">
        <ul>
          <li><strong>Staging:</strong> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">{siteConfig.apiBaseUrlStaging}</code></li>
          <li><strong>Production:</strong> URL provided by Steller at go-live.</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-2">
          API keys are environment-scoped. Always use the base URL Steller paired with your key.
        </p>
      </DocSection>

      <DocSection title="Response envelope">
        <p className="text-sm text-muted-foreground">
          Most JSON responses wrap the payload in <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data</code> with{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">statusCode</code> at the top level (for example{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.brands</code> for orderable catalog,{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.id</code> on create order). Examples below use{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">jq</code> paths that include <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">.data</code>.
        </p>
      </DocSection>

      <DocSection title="Under 60 seconds: first value path">
        <p className="text-sm text-muted-foreground mb-4">
          Goal: <strong>first usable value</strong> — wallet balance visible, orderable catalog non-empty, and{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code> returns <strong>202 Accepted</strong>.
          Gift cards arrive when status is <strong>Completed</strong> (poll step 4); that step is outside the 60-second bar.
        </p>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4 mb-6">
          <h3 className="text-base font-medium text-foreground">Try now — fill in your credentials</h3>
          <p className="text-sm text-muted-foreground">
            Paste your base URL and API key below. Curl examples update automatically. Keys stay in this browser tab only.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="gs-base-url">Base URL</Label>
              <Input
                id="gs-base-url"
                type="url"
                autoComplete="off"
                placeholder={siteConfig.apiBaseUrlStaging}
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gs-api-key">API key</Label>
              <Input
                id="gs-api-key"
                type="password"
                autoComplete="off"
                placeholder="YOUR_API_KEY"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h3 className="text-base font-medium mb-2 text-foreground">1. Wallet (optional check)</h3>
        <CodeBlock language="bash" code={walletCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">2. Orderable catalog</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Read <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.brands[].products[].sku</code> and{" "}
          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code> — only these SKUs will accept orders.
        </p>
        <CodeBlock language="bash" code={catalogCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">3. Place the first order</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Quantity 1, sku 1823257, face value 2, and a new referenceId. Expect HTTP 202.
        </p>
        <CodeBlock language="bash" code={manualOrderCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Optional: first activated product</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Use this only when no sku was named for your account. It needs <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">jq</code> and orders the first activated product.
        </p>
        <CodeBlock language="bash" code={ttvScript} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">4. Poll until Completed or Failed</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Use <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">data.id</code> from the create response. Poll every 2–5 seconds. If status is still Processing after about 10 minutes, contact Steller with the order id and referenceId. That wait is not a refund.
        </p>
        <CodeBlock language="bash" code={pollCurl} />
      </DocSection>

      <DocSection title="First call (reference)">
        <h3 className="text-base font-medium mb-2 text-foreground">Browse full catalog (not all rows are orderable)</h3>
        <CodeBlock
          language="bash"
          code={`curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/browse"`}
        />
      </DocSection>

      <DocSection title="Important rules">
        <ul>
          <li>
            <strong>Idempotency:</strong> a new referenceId returns <strong>202</strong>. The same body again returns <strong>200</strong> and the same order. The same referenceId with a different sku, face value, or quantity returns <strong>409</strong>.
          </li>
          <li>
            <strong>Rate limit:</strong> 1 order per second, burst 2. A faster call returns <strong>429</strong>. Wait, then retry the same body.
          </li>
          <li>
            <strong>Poll</strong> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code> until{" "}
            <strong>Completed</strong> or <strong>Failed</strong>.
          </li>
          <li>
            <strong>Only orderable SKUs</strong> — from <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/partner/catalog/orderable</code>, not the full browse catalog.
          </li>
          <li>
            <strong>faceValue</strong> comes from <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code> /{" "}
            <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">maxFaceValue</code>.{" "}
            <strong>price.min</strong> / <strong>price.max</strong> in the catalog is your wallet debit (partner price), not the{" "}
            <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> you send.
          </li>
          <li>
            <strong>Prepaid wallet</strong> — insufficient balance fails at create; failed orders are refunded when status is Failed.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Next steps">
        <ol>
          <li><Link to="/developers/api-reference" className="doc-link">API reference</Link></li>
          <li><Link to="/developers/postman" className="doc-link">Postman</Link></li>
          <li><Link to="/developers/partner-dashboard" className="doc-link">Partner dashboard</Link></li>
          <li><Link to="/developers/webhooks" className="doc-link">Webhooks</Link></li>
        </ol>
      </DocSection>

      <DocSection title="Need an API key?">
        <p>Steller creates the account, activates products, funds the wallet, and sends the API key in private. The <Link to="/developers/postman" className="doc-link">Postman collection</Link> runs the first order after you paste that key.</p>
      </DocSection>
    </DocsLayout>
  );
};

export default GettingStarted;
