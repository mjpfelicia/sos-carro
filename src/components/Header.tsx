import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Wrench, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-elegant">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>
            SOS<span className="text-primary">Carros</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/buscar"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            activeProps={{ className: "text-foreground" }}
          >
            Buscar serviços
          </Link>
          <Link
            to="/seja-prestador"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            activeProps={{ className: "text-foreground" }}
          >
            Seja prestador
          </Link>
          <Link
            to="/como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            activeProps={{ className: "text-foreground" }}
          >
            Como funciona
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/entrar">Entrar</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/cadastro">Cadastrar</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col p-4 gap-3">
            <Link to="/buscar" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
              Buscar serviços
            </Link>
            <Link
              to="/seja-prestador"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium"
            >
              Seja prestador
            </Link>
            <Link
              to="/como-funciona"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium"
            >
              Como funciona
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/entrar">Entrar</Link>
              </Button>
              <Button variant="hero" className="flex-1" asChild>
                <Link to="/cadastro">Cadastrar</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
