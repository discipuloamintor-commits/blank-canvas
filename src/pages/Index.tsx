import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";
import { CategoryGrid } from "@/components/CategoryGrid";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { usePublicPosts } from "@/hooks/usePublicPosts";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const POSTS_PER_PAGE = 9;

export default function Index() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [page, setPage] = useState(1);

  const { recentPosts: posts, isLoading } = usePublicPosts();
  const { categories } = useCategories();

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1) || [];

  return (
    <BlogLayout>
      <SEOHead
        title="Imersão Completa - Tecnologia, IA e Desenvolvimento"
        description="Blog sobre tecnologia, inteligência artificial, desenvolvimento web e as últimas tendências do mundo tech. Artigos, tutoriais e insights para desenvolvedores."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Explorando o futuro da tecnologia
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Imersão{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Completa
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seu portal para o mundo da tecnologia, inteligência artificial e desenvolvimento.
              Artigos profundos, tutoriais práticos e as últimas novidades do universo tech.
            </p>
          </div>
        </div>
      </section>

      {/* Search Results Indicator */}
      {searchQuery && (
        <section className="container py-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Resultados para: <span className="font-semibold text-foreground">"{searchQuery}"</span>
            </p>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = "/"}>
              Limpar busca
            </Button>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {!searchQuery && featuredPost && (
        <section className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Destaque</h2>
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
          <ArticleCard post={featuredPost as any} featured />
        </section>
      )}

      {/* Categories Grid */}
      {!searchQuery && categories && categories.length > 0 && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-6">Categorias</h2>
          <CategoryGrid categories={categories} />
        </section>
      )}

      {/* Recent Posts */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">
          {searchQuery ? "Resultados" : "Artigos Recentes"}
        </h2>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <ArticleCard key={post.id} post={post as any} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={recentPosts.length < POSTS_PER_PAGE - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Próximo
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "Nenhum artigo encontrado para sua busca." : "Nenhum artigo publicado ainda."}
            </p>
          </div>
        )}
      </section>

      {/* About Section */}
      {!searchQuery && <AboutSection />}

      {/* Stats Section */}
      {!searchQuery && <StatsSection />}

      {/* Newsletter CTA */}
      {!searchQuery && <NewsletterCTA />}
    </BlogLayout>
  );
}
