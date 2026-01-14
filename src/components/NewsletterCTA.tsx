import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletter } from "@/hooks/useNewsletter";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const { subscribe, isSubscribing } = useNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await subscribe({ email: email.trim() });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Fique por Dentro das{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Novidades
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Receba os melhores artigos sobre inteligência artificial, tutoriais exclusivos 
            e insights práticos diretamente no seu email. Sem spam, prometemos!
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="lg" disabled={isSubscribing}>
              {isSubscribing ? (
                "Inscrevendo..."
              ) : (
                <>
                  Inscrever-se
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            Ao se inscrever, você concorda com nossa{" "}
            <a href="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
