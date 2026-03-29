import { useMemo, useState } from "react";
import DocsLayout from "@/components/layout/DocsLayout";
import PageHeader from "@/components/docs/PageHeader";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";
import CTAButton from "@/components/docs/CTAButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  const [baseUrl, setBaseUrl] = useState(siteConfig.apiBaseUrlStaging);
  const [apiKey, setApiKey] = useState("");

  const effectiveBase = baseUrl.trim() || siteConfig.apiBaseUrlStaging;
  const effectiveKey = apiKey.trim() || "YOUR_API_KEY";
  const exampleRef = useMemo(
    () => `partner-test-${Math.floor(Date.now() / 1000)}`,
    [],
  );

  const walletCurl = `curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/wallet/me"`;
  const catalogCurl = `curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/orderable"`;
  const orderCurl = `curl -sS -X POST "${effectiveBase}/api/orders" \\
  -H "x-api-key: ${effectiveKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "1823256",
    "faceValue": 1,
    "quantity": 1,
    "referenceId": "${exampleRef}"
  }'`;
  const pollCurl = `curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/orders/ORDER_ID_FROM_CREATE_RESPONSE"`;

  const jqHelper = `CATALOG=$(curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/orderable")
SKU=$(echo "$CATALOG" | jq -r '.data.brands[0].products[0].sku')
FACE=$(echo "$CATALOG" | jq -r '.data.brands[0].products[0].minFaceValue')
REF="partner-test-$(date +%s)"
curl -sS -X POST "${effectiveBase}/api/orders" \\
  -H "x-api-key: ${effectiveKey}" \\
  -H "Content-Type: application/json" \\
  -d "{\\"sku\\":\\"$SKU\\",\\"faceValue\\":$FACE,\\"quantity\\":1,\\"referenceId\\":\\"$REF\\"}"`;

  return (
    <DocsLayout>
      <PageHeader title="Getting started" description="Credentials, base URL, and your first API call." />

      <DocSection title="Prerequisites">
        <ul>
          <li>An <strong>API key</strong> from Steller</li>
          <li>The <strong>base URL</strong> for your environment (staging or production)</li>
        </ul>
        <p>
          <a href={siteConfig.signupUrl} className="doc-link">Get your API key →</a>
        </p>
      </DocSection>

      <DocSection title="Base URL">
        <ul>
          <li><strong>Staging:</strong> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">{siteConfig.apiBaseUrlStaging}</code> — use this for integration testing and signup flows.</li>
          <li><strong>Production:</strong> URL provided by Steller at go-live.</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-2">
          API keys are environment-scoped. A key label like <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">stlr_live_...</code> does not by itself confirm which host to use.
          Always use the base URL paired with that key by Steller.
        </p>
        <CodeBlock
          language="text"
          code={`Environment mapping (source of truth)
- Staging key + staging host -> ${siteConfig.apiBaseUrlStaging}
- Production key + production host -> URL provided by Steller at go-live`}
        />
      </DocSection>

      <DocSection title="Under 60 seconds: first value path">
        <p className="text-sm text-muted-foreground mb-4">
          Goal: prove your integration works with the minimum flow. The &lt; 60 second bar targets <strong>first usable value</strong>
          (wallet + catalog + order request accepted with <strong>202</strong>). Reaching <strong>Completed</strong> can take longer depending on load.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Requires a funded wallet and at least one activated SKU. If the catalog is empty or the order fails, contact Steller to finish account setup.
        </p>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4 mb-6">
          <h3 className="text-base font-medium text-foreground">Try now — fill in your credentials</h3>
          <p className="text-sm text-muted-foreground">
            Paste your base URL and API key below. The curl examples update automatically so you can copy without manual find-and-replace.
            Keys stay in this browser tab only (not sent to Steller servers from this page).
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

        <h3 className="text-base font-medium mb-2 text-foreground">1. Wallet</h3>
        <CodeBlock language="bash" code={walletCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">2. Orderable catalog</h3>
        <CodeBlock language="bash" code={catalogCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">3. Place first order (staging default)</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Default first-run example on staging: <strong>Free Fire 100 Diamonds</strong> — <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">1823256</code>, <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">1</code>.
          If unavailable for your account, pick a SKU and valid <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">faceValue</code> from your orderable catalog (<code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code> / <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">maxFaceValue</code>).
        </p>
        <CodeBlock language="bash" code={orderCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">4. Poll until Completed or Failed</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Replace <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">ORDER_ID_FROM_CREATE_RESPONSE</code> with the order <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">id</code> from the create response. Poll every 2–5 seconds.
        </p>
        <CodeBlock language="bash" code={pollCurl} />

        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Optional: jq one-paste helper</h3>
        <p className="text-sm text-muted-foreground mb-2">
          If <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">jq</code> is installed, this picks the first orderable SKU. On Windows or minimal images, use the steps above without <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">jq</code>.
        </p>
        <CodeBlock language="bash" code={jqHelper} />
      </DocSection>

      <DocSection title="First call (reference)">
        <h3 className="text-base font-medium mb-2 text-foreground">Get your orderable catalog</h3>
        <CodeBlock language="bash" code={catalogCurl} />
        <p className="text-sm text-muted-foreground mt-2">
          Returns only products activated for your account. Use the <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">sku</code> and <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">minFaceValue</code>/<code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">maxFaceValue</code> from the response when placing orders.
        </p>
        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Browse full catalog (not all rows are orderable)</h3>
        <CodeBlock
          language="bash"
          code={`curl -sS -H "x-api-key: ${effectiveKey}" "${effectiveBase}/api/partner/catalog/browse"`}
        />
        <h3 className="text-base font-medium mb-2 mt-6 text-foreground">Check wallet</h3>
        <CodeBlock language="bash" code={walletCurl} />
      </DocSection>

      <DocSection title="Important rules">
        <ul>
          <li><strong>Always send a unique <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">referenceId</code></strong> on <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">POST /api/orders</code> (idempotency). If you retry after a timeout, use the <strong>same</strong> referenceId — no double debit.</li>
          <li><strong>Poll <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">GET /api/orders/:id</code></strong> every 2–5 seconds until status is <strong>Completed</strong> or <strong>Failed</strong>. Do not stop polling early.</li>
          <li><strong>Use only SKUs from your catalog</strong> — call <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">/api/partner/catalog/orderable</code> first.</li>
          <li><strong>faceValue = card denomination</strong> — for fixed cards, use the denomination confirmed by Steller (e.g. 1 for a $1 card). Note: <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">partnerPriceMin/Max</code> from the catalog is what you pay, not the faceValue you send.</li>
          <li><strong>Prepaid wallet</strong> — insufficient balance causes order creation to fail. Failed orders are refunded automatically.</li>
        </ul>
      </DocSection>

      <DocSection title="Next steps">
        <ol>
          <li><Link to="/developers/api-reference" className="doc-link">API reference</Link> — full endpoint documentation with request/response examples</li>
          <li><Link to="/developers/postman" className="doc-link">Postman</Link> — test without writing code</li>
          <li><Link to="/developers/partner-dashboard" className="doc-link">Partner dashboard</Link> — browse catalog and place orders via UI</li>
          <li><Link to="/developers/webhooks" className="doc-link">Webhooks</Link> — get notified on order completion</li>
        </ol>
      </DocSection>

      <DocSection title="Need an API key?">
        <p>Contact Steller to sign up or request access.</p>
        <CTAButton href={siteConfig.signupUrl}>Get started</CTAButton>
      </DocSection>
    </DocsLayout>
  );
};

export default GettingStarted;
