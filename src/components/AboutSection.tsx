import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Conteúdo Atualizado",
      description: "Artigos sobre as últimas tendências em IA e tecnologia.",
    },
    {
      icon: BookOpen,
      title: "Tutoriais Práticos",
      description: "Guias passo a passo para você implementar na prática.",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Junte-se a milhares de profissionais interessados em IA.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Mergulhe no Universo da{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              O Imersão Completa é seu portal para explorar o fascinante mundo da IA. 
              Aqui você encontra tutoriais, análises aprofundadas e insights práticos 
              para aplicar em seus projetos.
            </p>
            <Button asChild size="lg">
              <Link to="/sobre">
                Conheça nossa história
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
