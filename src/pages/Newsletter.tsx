import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { CheckCircle, Mail, Zap, Gift } from "lucide-react";

const benefits = [
  {
    icon: Mail,
    title: "Conteúdo Exclusivo",
    description: "Receba artigos e insights que não são publicados no blog",
  },
  {
    icon: Zap,
    title: "Primeiro a Saber",
    description: "Seja notificado antes de todo mundo sobre novos conteúdos",
  },
  {
    icon: Gift,
    title: "Recursos Gratuitos",
    description: "Acesso a templates, guias e materiais exclusivos",
  },
];

export default function Newsletter() {
  return (
    <BlogLayout>
      <SEOHead
        title="Newsletter - Imersão Completa"
        description="Inscreva-se na newsletter do Imersão Completa e receba as últimas novidades sobre tecnologia, IA e desenvolvimento."
        canonical="/newsletter"
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fique por Dentro de{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tudo
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Junte-se a milhares de profissionais e entusiastas que recebem
            nossas atualizações semanais sobre tecnologia, IA e desenvolvimento.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* What you'll receive */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">O que você vai receber</h2>
          <ul className="space-y-4">
            {[
              "Resumos semanais dos melhores artigos",
              "Tutoriais exclusivos não publicados no blog",
              "Curadoria de ferramentas e recursos úteis",
              "Insights sobre tendências de tecnologia",
              "Dicas práticas de desenvolvimento",
              "Oportunidades de networking e eventos",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <NewsletterCTA />
    </BlogLayout>
  );
}
