import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Star, CheckCircle, TrendingUp, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard do prestador — SOS Carros" },
      { name: "description", content: "Painel do prestador: solicitações, ganhos e avaliações." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Ganhos do mês", value: "R$ 4.820", icon: DollarSign, color: "text-success" },
    { label: "Serviços concluídos", value: "37", icon: CheckCircle, color: "text-primary" },
    { label: "Avaliação média", value: "4.9", icon: Star, color: "text-accent" },
    { label: "Taxa de aceite", value: "92%", icon: TrendingUp, color: "text-success" },
  ];

  const requests = [
    { id: "s1", client: "João P.", service: "Pane elétrica", distance: "1.2 km", time: "agora", urgent: true },
    { id: "s2", client: "Maria S.", service: "Troca de pneu", distance: "3.5 km", time: "em 2h", urgent: false },
    { id: "s3", client: "Carlos M.", service: "Diagnóstico geral", distance: "0.8 km", time: "amanhã 9h", urgent: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Olá, Auto Mecânica Silva 👋</h1>
              <p className="text-muted-foreground">Aqui está o resumo da sua atividade</p>
            </div>
            <Badge className="bg-success text-success-foreground hover:bg-success">● Online — recebendo solicitações</Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <Card key={s.label} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Solicitações */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Solicitações pendentes</h2>
                  <Badge variant="secondary">{requests.length} novas</Badge>
                </div>

                <div className="space-y-3">
                  {requests.map((r) => (
                    <Card key={r.id} className="p-4 hover:shadow-card transition-smooth">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{r.client}</h3>
                            {r.urgent && (
                              <Badge className="bg-primary text-primary-foreground hover:bg-primary text-xs">URGENTE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{r.service}</p>
                          <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.distance}</span>
                            <span>· {r.time}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">Recusar</Button>
                          <Button variant="hero" size="sm" className="flex-1 sm:flex-initial">Aceitar</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Carteira</h3>
                <p className="text-sm text-muted-foreground">Saldo disponível</p>
                <p className="text-3xl font-bold text-primary mb-4">R$ 1.240,50</p>
                <Button variant="hero" className="w-full">Solicitar saque</Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-3">Atalhos</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/buscar"><MessageCircle className="h-4 w-4" />Mensagens</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="h-4 w-4" />Minhas avaliações
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <DollarSign className="h-4 w-4" />Histórico financeiro
                  </Button>
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
