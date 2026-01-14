import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";
import type { PostWithRelations } from "@/lib/supabase";

interface RelatedArticlesProps {
  posts: PostWithRelations[];
  isLoading?: boolean;
  title?: string;
}

export function RelatedArticles({
  posts,
  isLoading = false,
  title = "Artigos Relacionados",
}: RelatedArticlesProps) {
  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : posts.slice(0, 3).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
      </div>
    </section>
  );
}
