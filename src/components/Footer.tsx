import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>
                SOS<span className="text-primary">Carros</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Conectando motoristas a prestadores de serviços automotivos de confiança, quando e
              onde você precisar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/buscar" className="hover:text-foreground transition-smooth">
                  Buscar serviços
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="hover:text-foreground transition-smooth">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link to="/seja-prestador" className="hover:text-foreground transition-smooth">
                  Seja prestador
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-smooth">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-smooth">
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-smooth">
                  Privacidade (LGPD)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} SOS Carros. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
