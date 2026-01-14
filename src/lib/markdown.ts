// Markdown validation and statistics utilities

export interface ContentValidation {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export interface ContentStats {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  headingCount: number;
  linkCount: number;
  imageCount: number;
  readingTime: number;
}

// Validate markdown/HTML content for SEO best practices
export function validateMarkdownContent(content: string): ContentValidation {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!content || content.trim().length === 0) {
    errors.push('Conteúdo está vazio');
    return { isValid: false, warnings, errors };
  }

  // Check for H1 (should have exactly one or none if title is separate)
  const h1Matches = content.match(/<h1[^>]*>|^# /gm);
  if (h1Matches && h1Matches.length > 1) {
    warnings.push(`Múltiplos H1 encontrados (${h1Matches.length}). Recomenda-se apenas um H1 por página.`);
  }

  // Check for H2 (should have at least one for structure)
  const h2Matches = content.match(/<h2[^>]*>|^## /gm);
  if (!h2Matches || h2Matches.length === 0) {
    warnings.push('Nenhum H2 encontrado. Considere adicionar subtítulos para melhor estrutura.');
  }

  // Check for very long paragraphs (over 300 words)
  const paragraphs = content.split(/<\/p>|\n\n/);
  paragraphs.forEach((p, index) => {
    const words = p.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0);
    if (words.length > 300) {
      warnings.push(`Parágrafo ${index + 1} é muito longo (${words.length} palavras). Considere dividir.`);
    }
  });

  // Check for images without alt text
  const imagesWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/g);
  if (imagesWithoutAlt && imagesWithoutAlt.length > 0) {
    errors.push(`${imagesWithoutAlt.length} imagem(ns) sem texto alternativo (alt).`);
  }

  // Check minimum content length
  const textOnly = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (textOnly.length < 300) {
    warnings.push('Conteúdo curto. Para melhor SEO, considere expandir para pelo menos 300 palavras.');
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

// Get content statistics
export function getContentStats(content: string): ContentStats {
  if (!content) {
    return {
      wordCount: 0,
      characterCount: 0,
      paragraphCount: 0,
      headingCount: 0,
      linkCount: 0,
      imageCount: 0,
      readingTime: 0,
    };
  }

  const textOnly = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = textOnly.split(' ').filter(word => word.length > 0);

  const headingMatches = content.match(/<h[1-6][^>]*>|^#{1,6} /gm);
  const linkMatches = content.match(/<a[^>]*href/g);
  const imageMatches = content.match(/<img[^>]*>/g);
  const paragraphMatches = content.match(/<p[^>]*>/g);

  const wordCount = words.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    wordCount,
    characterCount: textOnly.length,
    paragraphCount: paragraphMatches?.length || 0,
    headingCount: headingMatches?.length || 0,
    linkCount: linkMatches?.length || 0,
    imageCount: imageMatches?.length || 0,
    readingTime,
  };
}
