import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogLayout } from "@/components/layout/BlogLayout";
import { SEOHead } from "@/components/SEOHead";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { usePostsByCategory } from "@/hooks/usePublicPosts";
import { useCategories } from "@/hooks/useCategories";
import { ArrowLeft } from "lucide-react";

const POSTS_PER_PAGE = 12;

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);

  const { categories } = useCategories();
  const category = categories?.find((c) => c.slug === slug);

  const { data: posts, isLoading } = usePostsByCategory(slug || "");

  if (!category && !isLoading) {
    return (
      <BlogLayout>
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Categoria não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            A categoria que você procura não existe.
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

  return (
    <BlogLayout>
      <SEOHead
        title={`${category?.name || "Categoria"} - Imersão Completa`}
        description={category?.description || `Artigos sobre ${category?.name || "tecnologia"}`}
        canonical={`/categoria/${slug}`}
      />

      <div className="container py-8">
        {/* Header */}
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category?.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            {category?.icon && (
              <span className="text-4xl">{category.icon}</span>
            )}
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ color: category?.color || undefined }}
              >
                {category?.name}
              </h1>
              {category?.description && (
                <p className="text-muted-foreground mt-2">{category.description}</p>
              )}
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Posts Grid */}
          <div>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ArticleCardSkeleton key={i} />
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {posts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
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
                    disabled={posts.length < POSTS_PER_PAGE}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Próximo
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum artigo nesta categoria ainda.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </BlogLayout>
  );
}
