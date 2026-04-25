import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — SOS Carros" },
      { name: "description", content: "Acesse sua conta SOS Carros." },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary/20 py-12 px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" placeholder="••••••••" />
            </div>
            <Button variant="hero" size="lg" className="w-full" type="submit">
              Entrar
            </Button>

            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">Esqueci minha senha</a>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">ou continue com</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">Google</Button>
              <Button variant="outline" type="button">Apple</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Não tem conta? <Link to="/cadastro" className="text-primary font-medium hover:underline">Cadastre-se</Link>
            </p>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
