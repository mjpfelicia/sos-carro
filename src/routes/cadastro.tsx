import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wrench, Car, Briefcase } from "lucide-react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro — SOS Carros" },
      { name: "description", content: "Crie sua conta como cliente ou prestador de serviços automotivos." },
    ],
  }),
  component: Cadastro,
});

function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary/20 py-12 px-4">
        <Card className="w-full max-w-xl p-8">
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-sm text-muted-foreground">Escolha como você quer usar a SOS Carros</p>
          </div>

          <Tabs defaultValue="cliente" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="cliente"><Car className="h-4 w-4 mr-2" />Sou cliente</TabsTrigger>
              <TabsTrigger value="prestador"><Briefcase className="h-4 w-4 mr-2" />Sou prestador</TabsTrigger>
            </TabsList>

            <TabsContent value="cliente">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input id="nome" placeholder="João Silva" />
                  </div>
                  <div>
                    <Label htmlFor="tel">Telefone</Label>
                    <Input id="tel" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email-c">E-mail</Label>
                  <Input id="email-c" type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="senha-c">Senha</Label>
                  <Input id="senha-c" type="password" placeholder="Mínimo 8 caracteres" />
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit">
                  Criar conta de cliente
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="prestador">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="empresa">Razão social / Nome</Label>
                    <Input id="empresa" placeholder="Auto Mecânica Silva" />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ / CPF</Label>
                    <Input id="cnpj" placeholder="00.000.000/0001-00" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email-p">E-mail comercial</Label>
                    <Input id="email-p" type="email" placeholder="contato@empresa.com" />
                  </div>
                  <div>
                    <Label htmlFor="tel-p">Telefone</Label>
                    <Input id="tel-p" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="esp">Especialidade principal</Label>
                  <Input id="esp" placeholder="Ex: Mecânica geral, Guincho, Elétrica..." />
                </div>
                <div>
                  <Label htmlFor="cep">Área de cobertura (CEP)</Label>
                  <Input id="cep" placeholder="00000-000" />
                </div>
                <div>
                  <Label htmlFor="senha-p">Senha</Label>
                  <Input id="senha-p" type="password" placeholder="Mínimo 8 caracteres" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Após o cadastro, você precisará enviar documentos para validação (até 48h).
                </p>
                <Button variant="hero" size="lg" className="w-full" type="submit">
                  Criar conta de prestador
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem conta? <Link to="/entrar" className="text-primary font-medium hover:underline">Entrar</Link>
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
