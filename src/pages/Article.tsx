import { } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, Eye, ArrowLeft, User } from "lucide-react";
import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { HtmlContent } from "@/components/HtmlContent";
import { Sidebar } from "@/components/Sidebar";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { FloatingShareButton } from "@/components/FloatingShareButton";
import { AdSlot } from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostBySlug, useRelatedPosts } from "@/hooks/usePublicPosts";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = usePostBySlug(slug || "");
  const { data: relatedPosts, isLoading: relatedLoading } = useRelatedPosts(
    post?.id || "",
    post?.category?.id || null
  );

  if (isLoading) {
    return (
      <BlogLayout>
        <div className="container py-8">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </BlogLayout>
    );
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const formattedDate = post.published_at
    ? format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })
    : format(new Date(post.created_at), "d 'de' MMMM, yyyy", { locale: ptBR });

  const articleUrl = `${window.location.origin}/artigo/${post.slug}`;

  return (
    <BlogLayout>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        canonical={`/artigo/${post.slug}`}
        ogImage={post.featured_image || undefined}
        ogType="article"
        keywords={post.meta_keywords || undefined}
      />

      <FloatingShareButton title={post.title} url={articleUrl} />

      <article className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          {post.category && (
            <>
              <Link
                to={`/categoria/${post.category.slug}`}
                className="hover:text-primary transition-colors"
              >
                {post.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <header className="space-y-4">
              {post.category && (
                <Link to={`/categoria/${post.category.slug}`}>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                      color: post.category.color || undefined,
                    }}
                  >
                    {post.category.name}
                  </Badge>
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author.full_name || "Autor"}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {post.reading_time && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.reading_time} min de leitura
                  </span>
                )}
                {post.views_count !== null && post.views_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.views_count.toLocaleString()} visualizações
                  </span>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <figure className="rounded-xl overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </figure>
            )}

            {/* Ad Slot */}
            <AdSlot position="article-top" />

            {/* Content */}
            <HtmlContent content={post.content || ""} />

            {/* Ad Slot */}
            <AdSlot position="article-bottom" />

            {/* Share Buttons */}
            <div className="border-t border-b border-border py-6">
              <h3 className="text-lg font-semibold mb-4">Compartilhe este artigo</h3>
              <SocialShareButtons title={post.title} url={articleUrl} />
            </div>

            {/* Related Articles */}
            {relatedPosts && relatedPosts.length > 0 && (
              <RelatedArticles
                posts={relatedPosts as any}
                isLoading={relatedLoading}
              />
            )}
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </article>
    </BlogLayout>
  );
}
