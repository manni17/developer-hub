export const siteConfig = {
  name: "Steller",
  signupUrl: "mailto:mmikashfi@gmail.com?subject=Steller%20API%20access%20request",
  dashboardUrl: "https://dashboard.steler.org",
  /** Base URL shown in the examples. Steller confirms the right base URL for each environment when it issues your key. */
  apiBaseUrlStaging: "https://api-v2.steler.org",
  statusUrl: "#",
  marketingSiteUrl: "#",
  supportEmail: "mmikashfi@gmail.com",
};

export type NavGroup = {
  label: string;
  items: { title: string; path: string; description: string }[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Core",
    items: [
      { title: "Getting started", path: "/developers/getting-started", description: "Credentials, base URL, first API call, next steps." },
      { title: "API reference", path: "/developers/api-reference", description: "Auth, endpoints (catalog, orders, wallet, webhooks), idempotency, errors." },
      { title: "Postman", path: "/developers/postman", description: "Download collection and environment; setup and test." },
      { title: "Partner dashboard", path: "/developers/partner-dashboard", description: "Web app to review catalog, orders, wallet, and webhook settings." },
      { title: "Webhooks", path: "/developers/webhooks", description: "Events, endpoints, signature verification, retry policy." },
      { title: "Going to production", path: "/developers/going-to-production", description: "Checklist: staging sign-off → prod credentials → go-live." },
      { title: "Environments", path: "/developers/environments", description: "Staging vs production: what's different." },
    ],
  },
  {
    label: "Reference",
    items: [
      { title: "Error reference", path: "/developers/error-reference", description: "HTTP and errorCode table; what to do." },
      { title: "Rate limits", path: "/developers/rate-limits", description: "Default limits and how to request higher." },
      { title: "Glossary", path: "/developers/glossary", description: "Terms: face value, SKU, referenceId, idempotency, etc." },
      { title: "FAQs", path: "/developers/faqs", description: "Common questions about integration." },
      { title: "Changelog", path: "/developers/changelog", description: "API and docs changes by date." },
    ],
  },
  {
    label: "Trust & support",
    items: [
      { title: "Security", path: "/developers/security", description: "API key storage, HTTPS, webhook secret." },
      { title: "Support", path: "/developers/support", description: "How to get help; what to send." },
      { title: "Status", path: "/developers/status", description: "How to check service health." },
    ],
  },
];
