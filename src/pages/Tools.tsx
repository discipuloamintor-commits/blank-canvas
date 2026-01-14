import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, Brain, Palette, Terminal, Database, Cloud } from "lucide-react";

const tools = [
  {
    category: "Desenvolvimento",
    icon: Code,
    items: [
      {
        name: "VS Code",
        description: "Editor de código gratuito e poderoso da Microsoft",
        url: "https://code.visualstudio.com",
        tags: ["Editor", "Gratuito"],
      },
      {
        name: "GitHub Copilot",
        description: "Assistente de programação com IA",
        url: "https://github.com/features/copilot",
        tags: ["IA", "Produtividade"],
      },
      {
        name: "Cursor",
        description: "IDE com IA integrada para desenvolvimento moderno",
        url: "https://cursor.com",
        tags: ["IA", "Editor"],
      },
    ],
  },
  {
    category: "Inteligência Artificial",
    icon: Brain,
    items: [
      {
        name: "ChatGPT",
        description: "Assistente de IA conversacional da OpenAI",
        url: "https://chat.openai.com",
        tags: ["Chat", "GPT-4"],
      },
      {
        name: "Claude",
        description: "Assistente de IA da Anthropic",
        url: "https://claude.ai",
        tags: ["Chat", "Claude 3"],
      },
      {
        name: "Midjourney",
        description: "Geração de imagens com IA",
        url: "https://midjourney.com",
        tags: ["Imagens", "Arte"],
      },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    items: [
      {
        name: "Figma",
        description: "Design colaborativo em tempo real",
        url: "https://figma.com",
        tags: ["UI/UX", "Colaborativo"],
      },
      {
        name: "Canva",
        description: "Criação de designs simplificada",
        url: "https://canva.com",
        tags: ["Gráficos", "Gratuito"],
      },
    ],
  },
  {
    category: "DevOps",
    icon: Terminal,
    items: [
      {
        name: "Docker",
        description: "Containerização de aplicações",
        url: "https://docker.com",
        tags: ["Containers", "DevOps"],
      },
      {
        name: "Vercel",
        description: "Deploy e hospedagem para frontend",
        url: "https://vercel.com",
        tags: ["Deploy", "Serverless"],
      },
    ],
  },
  {
    category: "Banco de Dados",
    icon: Database,
    items: [
      {
        name: "Supabase",
        description: "Backend como serviço com PostgreSQL",
        url: "https://supabase.com",
        tags: ["BaaS", "PostgreSQL"],
      },
      {
        name: "PlanetScale",
        description: "MySQL serverless escalável",
        url: "https://planetscale.com",
        tags: ["MySQL", "Serverless"],
      },
    ],
  },
  {
    category: "Cloud",
    icon: Cloud,
    items: [
      {
        name: "AWS",
        description: "Amazon Web Services - líder em cloud",
        url: "https://aws.amazon.com",
        tags: ["Cloud", "Enterprise"],
      },
      {
        name: "Cloudflare",
        description: "CDN, DNS e segurança",
        url: "https://cloudflare.com",
        tags: ["CDN", "Segurança"],
      },
    ],
  },
];

export default function Tools() {
  return (
    <BlogLayout>
      <SEOHead
        title="Ferramentas - Imersão Completa"
        description="Lista curada das melhores ferramentas para desenvolvedores, designers e profissionais de tecnologia."
        canonical="/ferramentas"
      />

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ferramentas Recomendadas</h1>
            <p className="text-xl text-muted-foreground">
              Uma seleção curada das melhores ferramentas para turbinar sua produtividade
            </p>
          </div>

          <div className="space-y-12">
            {tools.map((section) => (
              <section key={section.category}>
                <div className="flex items-center gap-3 mb-6">
                  <section.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">{section.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((tool) => (
                    <Card key={tool.name} className="group hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {tool.name}
                          <Button asChild variant="ghost" size="icon">
                            <a href={tool.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
