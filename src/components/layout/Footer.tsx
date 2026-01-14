import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { subscribe, isSubscribing } = useNewsletter();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await subscribe({ email: email.trim() });
      setEmail("");
    }
  };

  const footerLinks = [
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
    { href: "/ferramentas", label: "Ferramentas" },
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos" },
  ];

  const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Imersão Completa
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Explore o universo da inteligência artificial com tutoriais, análises e insights práticos.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Links Úteis</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-sm font-semibold">Receba Novidades</h4>
            <p className="text-sm text-muted-foreground">
              Assine nossa newsletter e receba os melhores conteúdos sobre IA.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="max-w-xs"
              />
              <Button type="submit" disabled={isSubscribing}>
                {isSubscribing ? "..." : "Assinar"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Imersão Completa. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href="mailto:contato@imersaocompleta.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
