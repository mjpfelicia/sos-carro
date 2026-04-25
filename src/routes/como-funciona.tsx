import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como funciona — SOS Carros" },
      { name: "description", content: "Entenda como a SOS Carros conecta motoristas a prestadores de serviços automotivos verificados." },
      { property: "og:title", content: "Como funciona — SOS Carros" },
      { property: "og:description", content: "Entenda como conectamos motoristas a prestadores de serviços automotivos." },
    ],
  }),
  component: ComoFunciona,
});

function ComoFunciona() {
  const steps = [
    { n: "1", title: "Você relata o problema", desc: "Conte o que aconteceu, envie fotos do veículo e informe sua localização atual." },
    { n: "2", title: "Recebemos várias propostas", desc: "Prestadores próximos enviam orçamento, prazo de chegada e tempo estimado de execução." },
    { n: "3", title: "Você escolhe o melhor", desc: "Compare avaliações, preços e tempo. Aceite a proposta que fizer mais sentido." },
    { n: "4", title: "Acompanhe em tempo real", desc: "Veja o profissional a caminho, converse pelo chat e acompanhe cada etapa do serviço." },
    { n: "5", title: "Pague com segurança", desc: "Pague pelo próprio app via PIX ou cartão. O valor só é repassado quando você confirma o serviço." },
    { n: "6", title: "Avalie a experiência", desc: "Sua avaliação ajuda outros motoristas e fortalece os melhores profissionais da plataforma." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Como funciona</h1>
            <p className="text-lg text-white/80">
              Da pane à solução em poucos passos. Simples, rápido e seguro.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="space-y-5">
            {steps.map((s) => (
              <Card key={s.n} className="p-6 flex gap-5 items-start hover:shadow-card transition-smooth">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-elegant">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 text-center bg-gradient-primary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Pronto para começar?</h2>
            <p className="mb-6 opacity-90">Encontre o serviço que você precisa em segundos.</p>
            <Link
              to="/buscar"
              className="inline-block bg-background text-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-smooth"
            >
              Buscar agora
            </Link>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
