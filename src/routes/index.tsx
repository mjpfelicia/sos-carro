import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, Zap, Truck, Disc, Hammer, Square, Key, Sparkles, Search, Shield, Star, Clock, MapPin, ArrowRight, Quote } from "lucide-react";
import heroImage from "@/assets/hero-sos.jpg";
import { categories, providers, testimonials } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Truck, Disc, Hammer, Square, Key, Sparkles,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOS Carros — Socorro automotivo na palma da mão" },
      { name: "description", content: "Encontre mecânicos, guincho, elétrica e mais perto de você. Serviço automotivo rápido, avaliado e de confiança." },
      { property: "og:title", content: "SOS Carros — Socorro automotivo na palma da mão" },
      { property: "og:description", content: "Encontre mecânicos, guincho, elétrica e mais perto de você." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero text-white">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Mecânico ajudando motorista na estrada ao entardecer"
              className="h-full w-full object-cover opacity-30"
              width={1920}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/95 dark:via-background/70" style={{ background: "linear-gradient(90deg, oklch(0.13 0.03 260 / 0.95) 0%, oklch(0.13 0.03 260 / 0.65) 60%, transparent 100%)" }} />
          </div>

          <div className="relative container mx-auto px-4 py-24 md:py-36">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Atendimento 24h em todo o Brasil
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Pane no carro?<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">Socorro em minutos.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                Conectamos você ao prestador de serviço automotivo mais próximo:
                mecânica, guincho, elétrica, pneus e muito mais.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="sos" size="xl" asChild>
                  <Link to="/buscar">
                    <Search className="h-5 w-5" />
                    Buscar serviço agora
                  </Link>
                </Button>
                <Button variant="outlineLight" size="xl" asChild>
                  <Link to="/seja-prestador">Sou prestador</Link>
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="h-4 w-4 text-accent" />
                  Prestadores verificados
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Star className="h-4 w-4 text-accent" />
                  +5.000 avaliações
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="h-4 w-4 text-accent" />
                  Resposta em até 5 min
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Encontre o serviço que precisa</h2>
            <p className="text-muted-foreground text-lg">Profissionais qualificados em todas as áreas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link
                  key={cat.id}
                  to="/buscar"
                  search={{ categoria: cat.id }}
                  className="group"
                >
                  <Card className="p-6 text-center hover:shadow-elegant transition-smooth hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-primary/30">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-elegant group-hover:scale-110 transition-smooth">
                      {Icon && <Icon className="h-7 w-7 text-primary-foreground" />}
                    </div>
                    <h3 className="font-semibold mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-secondary/40 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Como funciona</h2>
              <p className="text-muted-foreground text-lg">Rápido, simples e seguro</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { n: "1", title: "Descreva o problema", desc: "Conte o que aconteceu, envie fotos e informe sua localização." },
                { n: "2", title: "Receba propostas", desc: "Prestadores próximos respondem com preço e tempo de chegada." },
                { n: "3", title: "Acompanhe em tempo real", desc: "Veja o status do atendimento e pague com segurança pelo app." },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold shadow-elegant">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prestadores destaque */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Prestadores em destaque</h2>
              <p className="text-muted-foreground">Os mais bem avaliados perto de você</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/buscar">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.slice(0, 3).map((p) => (
              <Link key={p.id} to="/prestador/$id" params={{ id: p.id }}>
                <Card className="p-6 hover:shadow-elegant transition-smooth hover:-translate-y-1 cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={p.avatar} alt={p.name} className="h-14 w-14 rounded-full bg-secondary" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.category}</p>
                    </div>
                    {p.badge && (
                      <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold">{p.rating}</span>
                      <span className="text-muted-foreground">({p.reviewsCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.distanceKm} km
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-secondary/40 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">O que dizem nossos clientes</h2>
              <p className="text-muted-foreground text-lg">Histórias reais de quem já usou o SOS Carros</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 h-full border-2 hover:border-primary/30 transition-smooth">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic flex-1">
                    <Quote className="h-4 w-4 inline mr-1 text-primary/40" />
                    {testimonial.comment}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-10 w-10 rounded-full bg-secondary"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA prestador */}
        <section className="container mx-auto px-4 pb-20">
          <Card className="bg-gradient-hero text-white p-10 md:p-16 overflow-hidden relative border-0">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Você é prestador de serviço automotivo?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Cadastre-se gratuitamente e comece a receber solicitações de clientes
                na sua região. Sem mensalidade, você só paga quando faturar.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/seja-prestador">
                  Quero me cadastrar <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-primary opacity-20 blur-3xl" />
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
