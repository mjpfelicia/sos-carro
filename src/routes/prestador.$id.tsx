import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Shield, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { providers, sampleReviews } from "@/data/mock";

export const Route = createFileRoute("/prestador/$id")({
  loader: ({ params }) => {
    const provider = providers.find((p) => p.id === params.id);
    if (!provider) throw notFound();
    return { provider };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.provider.name ?? "Prestador"} — SOS Carros` },
      { name: "description", content: loaderData?.provider.bio ?? "Perfil do prestador" },
      { property: "og:title", content: `${loaderData?.provider.name ?? "Prestador"} — SOS Carros` },
      { property: "og:description", content: loaderData?.provider.bio ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Prestador não encontrado</h1>
        <Button asChild className="mt-4"><Link to="/buscar">Voltar à busca</Link></Button>
      </div>
    </div>
  ),
  component: Prestador,
});

function Prestador() {
  const { provider: p } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/buscar"><ArrowLeft className="h-4 w-4" /> Voltar</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <Card className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img src={p.avatar} alt={p.name} className="h-24 w-24 rounded-2xl bg-secondary" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{p.name}</h1>
                        <p className="text-muted-foreground">{p.category}</p>
                      </div>
                      {p.available ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success">Disponível</Badge>
                      ) : (
                        <Badge variant="outline">Ocupado</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-bold">{p.rating}</span>
                        <span className="text-muted-foreground">({p.reviewsCount} avaliações)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {p.city} · {p.distanceKm} km
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" /> Responde em {p.responseTime}
                      </div>
                    </div>

                    {p.badge && (
                      <Badge variant="secondary" className="mt-3 bg-accent/20 text-foreground">
                        ⭐ {p.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* Sobre */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">Sobre</h2>
                <p className="text-muted-foreground leading-relaxed">{p.bio}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-success">
                  <Shield className="h-4 w-4" />
                  Prestador verificado pela SOS Carros
                </div>
              </Card>

              {/* Serviços e preços */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Serviços oferecidos</h2>
                <div className="space-y-3">
                  {[
                    { name: "Diagnóstico básico", price: p.priceFrom },
                    { name: "Reparo padrão", price: p.priceFrom * 2 },
                    { name: "Atendimento emergencial", price: p.priceFrom * 3 },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <span>{s.name}</span>
                      <span className="font-semibold">A partir de R$ {s.price}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Avaliações */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Avaliações</h2>
                <div className="space-y-4">
                  {sampleReviews.map((r) => (
                    <div key={r.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{r.author}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar de ação */}
            <div className="space-y-4">
              <Card className="p-6 sticky top-24">
                <p className="text-sm text-muted-foreground mb-1">Atendimento a partir de</p>
                <p className="text-3xl font-bold text-primary mb-4">R$ {p.priceFrom}</p>

                <Button variant="sos" size="lg" className="w-full mb-3">
                  Solicitar serviço
                </Button>
                <Button variant="outline" size="lg" className="w-full mb-3">
                  <MessageCircle className="h-4 w-4" /> Chat
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                  <Phone className="h-4 w-4" /> Ligar
                </Button>

                <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                  <p>✓ Pagamento seguro pelo app</p>
                  <p>✓ Suporte 24h em caso de problema</p>
                  <p>✓ Garantia de serviço</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
