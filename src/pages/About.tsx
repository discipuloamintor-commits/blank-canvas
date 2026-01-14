import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { StatsSection } from "@/components/StatsSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";

export default function About() {
  return (
    <BlogLayout>
      <SEOHead
        title="Sobre - Imersão Completa"
        description="Conheça o Imersão Completa, seu portal de tecnologia, IA e desenvolvimento. Nossa missão é democratizar o conhecimento tech."
        canonical="/sobre"
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Sobre o{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imersão Completa
            </span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-xl text-muted-foreground">
              Bem-vindo ao Imersão Completa, seu portal definitivo para explorar o fascinante
              mundo da tecnologia, inteligência artificial e desenvolvimento de software.
            </p>

            <h2>Nossa Missão</h2>
            <p>
              Acreditamos que o conhecimento tecnológico deve ser acessível a todos.
              Nossa missão é democratizar a informação sobre tecnologia, IA e programação,
              oferecendo conteúdo de alta qualidade, tutoriais práticos e análises
              aprofundadas das últimas tendências do mercado.
            </p>

            <h2>O que Oferecemos</h2>
            <ul>
              <li>
                <strong>Artigos Técnicos:</strong> Conteúdo detalhado sobre linguagens de
                programação, frameworks e melhores práticas.
              </li>
              <li>
                <strong>Inteligência Artificial:</strong> Exploramos o mundo da IA, machine
                learning e suas aplicações práticas.
              </li>
              <li>
                <strong>Tutoriais Práticos:</strong> Guias passo a passo para você
                implementar soluções reais.
              </li>
              <li>
                <strong>Tendências Tech:</strong> Análises das novidades que estão
                moldando o futuro da tecnologia.
              </li>
            </ul>

            <h2>Nossa Equipe</h2>
            <p>
              Somos uma equipe de desenvolvedores, engenheiros e entusiastas de tecnologia
              apaixonados por compartilhar conhecimento. Com experiência em diversas áreas
              da tecnologia, nos dedicamos a criar conteúdo que realmente faz diferença
              na jornada de aprendizado dos nossos leitores.
            </p>

            <h2>Junte-se à Comunidade</h2>
            <p>
              Inscreva-se na nossa newsletter para receber as últimas atualizações,
              artigos exclusivos e recursos gratuitos diretamente no seu email.
              Faça parte da nossa comunidade de milhares de profissionais e
              entusiastas de tecnologia.
            </p>
          </div>
        </div>
      </div>

      <StatsSection />
      <NewsletterCTA />
    </BlogLayout>
  );
}
