import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";

export default function Terms() {
  return (
    <BlogLayout>
      <SEOHead
        title="Termos de Uso - Imersão Completa"
        description="Leia nossos termos de uso e condições para utilização do site Imersão Completa."
        canonical="/termos"
      />

      <div className="container py-16">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <h1>Termos de Uso</h1>
          <p className="lead">
            Última atualização: Janeiro de 2025
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o site Imersão Completa, você concorda em cumprir
            e estar sujeito a estes termos de uso. Se você não concordar com
            qualquer parte destes termos, não deve usar nosso site.
          </p>

          <h2>2. Uso do Site</h2>
          <p>
            Você concorda em usar o site apenas para fins legais e de maneira
            que não infrinja os direitos de terceiros ou restrinja o uso do
            site por outros.
          </p>
          <p>Você concorda em NÃO:</p>
          <ul>
            <li>Usar o site para qualquer finalidade ilegal</li>
            <li>Tentar obter acesso não autorizado a qualquer parte do site</li>
            <li>Interferir no funcionamento adequado do site</li>
            <li>Coletar informações de outros usuários sem consentimento</li>
          </ul>

          <h2>3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do site, incluindo textos, gráficos, logotipos,
            imagens e software, é propriedade do Imersão Completa ou de seus
            licenciadores e está protegido por leis de direitos autorais.
          </p>
          <p>
            Você pode ler, baixar e imprimir conteúdo para uso pessoal e não
            comercial, desde que mantenha todos os avisos de direitos autorais
            intactos.
          </p>

          <h2>4. Contas de Usuário</h2>
          <p>
            Se você criar uma conta em nosso site, é responsável por manter
            a confidencialidade de suas credenciais e por todas as atividades
            que ocorrem em sua conta.
          </p>
          <p>
            Você concorda em nos notificar imediatamente sobre qualquer uso
            não autorizado de sua conta.
          </p>

          <h2>5. Conteúdo do Usuário</h2>
          <p>
            Ao enviar comentários ou outros conteúdos para nosso site, você
            nos concede uma licença não exclusiva, royalty-free e mundial para
            usar, reproduzir e exibir esse conteúdo.
          </p>
          <p>
            Você é responsável por garantir que seu conteúdo não viole
            direitos de terceiros ou leis aplicáveis.
          </p>

          <h2>6. Links para Sites de Terceiros</h2>
          <p>
            Nosso site pode conter links para sites de terceiros. Não temos
            controle sobre o conteúdo desses sites e não somos responsáveis
            por eles. A inclusão de links não implica endosso.
          </p>

          <h2>7. Isenção de Garantias</h2>
          <p>
            O site é fornecido "como está" e "conforme disponível". Não
            garantimos que o site será ininterrupto, seguro ou livre de erros.
          </p>

          <h2>8. Limitação de Responsabilidade</h2>
          <p>
            Em nenhum caso seremos responsáveis por danos indiretos, incidentais,
            especiais ou consequenciais decorrentes do uso ou incapacidade de
            usar o site.
          </p>

          <h2>9. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento.
            Alterações entram em vigor imediatamente após a publicação no site.
            O uso continuado do site após alterações constitui aceitação dos
            novos termos.
          </p>

          <h2>10. Lei Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis do Brasil. Qualquer disputa
            será resolvida nos tribunais competentes do Brasil.
          </p>

          <h2>11. Contato</h2>
          <p>
            Para questões sobre estes termos, entre em contato:
            termos@imersaocompleta.com
          </p>
        </div>
      </div>
    </BlogLayout>
  );
}
