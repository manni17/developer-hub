import { Link } from "react-router-dom";
import { ArrowRight, Code2, LayoutDashboard, Send } from "lucide-react";
import { navGroups, siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const DevelopersLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 lg:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Integrate with Steller
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              API, partner dashboard, and Postman — everything you need to launch digital gift cards.
            </p>
            <a
              href={siteConfig.signupUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Get API key
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Value props */}
        <section className="py-12 px-4 border-t">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "API",
                desc: "REST API for catalog, orders, and wallet. Auth with API key.",
                link: "/developers/api-reference",
              },
              {
                icon: LayoutDashboard,
                title: "Partner dashboard",
                desc: "Browse catalog, place orders, view wallet and webhook settings.",
                link: "/developers/partner-dashboard",
              },
              {
                icon: Send,
                title: "Postman",
                desc: "Download collection and environment; test without writing code.",
                link: "/developers/postman",
              },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group rounded-xl border p-6 hover:border-accent/40 hover:shadow-sm transition-all"
              >
                <card.icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Doc index */}
        <section className="py-12 px-4 border-t">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8">Documentation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {group.label}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="group flex items-start gap-2 py-1"
                        >
                          <span className="doc-link text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground mt-0.5 hidden sm:inline">— {item.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="py-12 px-4 border-t text-center">
          <p className="text-muted-foreground mb-4">Need an API key?</p>
          <a
            href={siteConfig.signupUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-medium text-sm hover:bg-secondary transition-colors"
          >
            Contact Steller
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DevelopersLanding;
