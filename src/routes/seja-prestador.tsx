import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, DollarSign, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/seja-prestador")({
  head: () => ({
    meta: [
      { title: "Seja prestador — SOS Carros" },
      { name: "description", content: "Cadastre-se como prestador de serviços automotivos e receba solicitações na sua região. Sem mensalidade." },
      { property: "og:title", content: "Seja prestador — SOS Carros" },
      { property: "og:description", content: "Cadastre-se como prestador e receba solicitações na sua região." },
    ],
  }),
  component: SejaPrestador,
});

function SejaPrestador() {
  const benefits = [
    { icon: Users, title: "Mais clientes", desc: "Receba solicitações qualificadas direto no seu painel." },
    { icon: DollarSign, title: "Sem mensalidade", desc: "Pague apenas uma pequena taxa por serviço concluído." },
    { icon: TrendingUp, title: "Cresça sua reputação", desc: "Avaliações de clientes ajudam você a se destacar." },
    { icon: CheckCircle2, title: "Pagamento garantido", desc: "Receba pelo app, com repasse automático." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transforme sua oficina em um <span className="bg-gradient-primary bg-clip-text text-transparent">negócio digital</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Cadastre-se gratuitamente, receba solicitações de clientes da sua região
              e gerencie tudo num só lugar.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/cadastro">Quero me cadastrar agora</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <b.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-secondary/40 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Como começar</h2>
            <div className="space-y-6">
              {[
                { n: "1", title: "Cadastre seu perfil", desc: "Preencha seus dados, especialidades e área de cobertura." },
                { n: "2", title: "Envie seus documentos", desc: "CNPJ/MEI, certificados e fotos da oficina para verificação." },
                { n: "3", title: "Aguarde a aprovação", desc: "Nossa equipe analisa seu cadastro em até 48h." },
                { n: "4", title: "Comece a atender", desc: "Receba solicitações e cresça com a SOS Carros." },
              ].map((step) => (
                <div key={step.n} className="flex gap-5 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-elegant">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="sos" size="xl" asChild>
                <Link to="/cadastro">Começar cadastro</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
