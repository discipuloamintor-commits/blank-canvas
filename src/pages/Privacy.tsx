import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <BlogLayout>
      <SEOHead
        title="Política de Privacidade - Imersão Completa"
        description="Conheça nossa política de privacidade e como tratamos seus dados pessoais."
        canonical="/privacidade"
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <h1>Política de Privacidade</h1>
          <p className="lead">
            Última atualização: Janeiro de 2025
          </p>

          <h2>1. Informações que Coletamos</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, como quando:
          </p>
          <ul>
            <li>Cria uma conta em nosso site</li>
            <li>Inscreve-se em nossa newsletter</li>
            <li>Envia um formulário de contato</li>
            <li>Comenta em nossos artigos</li>
          </ul>

          <h2>2. Como Usamos suas Informações</h2>
          <p>
            Utilizamos as informações coletadas para:
          </p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Enviar newsletters e comunicações que você solicitou</li>
            <li>Responder a suas perguntas e solicitações</li>
            <li>Analisar tendências e uso do site para melhorar a experiência</li>
          </ul>

          <h2>3. Cookies e Tecnologias Similares</h2>
          <p>
            Utilizamos cookies e tecnologias similares para:
          </p>
          <ul>
            <li>Manter você conectado ao site</li>
            <li>Lembrar suas preferências</li>
            <li>Analisar o tráfego do site através de ferramentas como Google Analytics</li>
            <li>Exibir anúncios relevantes</li>
          </ul>

          <h2>4. Compartilhamento de Informações</h2>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar informações com:
          </p>
          <ul>
            <li>Provedores de serviços que nos auxiliam na operação do site</li>
            <li>Parceiros de publicidade (dados anônimos)</li>
            <li>Quando exigido por lei ou para proteger nossos direitos</li>
          </ul>

          <h2>5. Segurança</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para
            proteger suas informações pessoais contra acesso não autorizado,
            alteração, divulgação ou destruição.
          </p>

          <h2>6. Seus Direitos</h2>
          <p>
            Você tem o direito de:
          </p>
          <ul>
            <li>Acessar os dados pessoais que temos sobre você</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Cancelar sua inscrição na newsletter a qualquer momento</li>
          </ul>

          <h2>7. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta política de privacidade, entre em
            contato conosco através do email: privacidade@imersaocompleta.com
          </p>

          <h2>8. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos você
            sobre mudanças significativas publicando a nova política nesta página
            e atualizando a data de "última atualização".
          </p>
        </div>
      </div>
    </BlogLayout>
  );
}
