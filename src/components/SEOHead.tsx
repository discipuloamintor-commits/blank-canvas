import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function SEOHead({
  title,
  description = "Explore o universo da inteligência artificial com tutoriais, análises e insights práticos.",
  keywords = "inteligência artificial, IA, machine learning, tutoriais, tecnologia",
  image = "/og-image.jpg",
  url,
  canonical,
  ogImage,
  ogType,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOHeadProps) {
  const siteTitle = "Imersão Completa";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const canonicalUrl = canonical || url || window.location.href;
  const finalImage = ogImage || image;
  const finalType = ogType || type;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={finalType} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
