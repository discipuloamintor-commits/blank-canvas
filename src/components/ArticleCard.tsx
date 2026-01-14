import { Link } from "react-router-dom";
import { Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { PostWithRelations } from "@/lib/supabase";

interface ArticleCardProps {
  post: PostWithRelations;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const formattedDate = post.published_at
    ? format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })
    : format(new Date(post.created_at), "d 'de' MMMM, yyyy", { locale: ptBR });

  return (
    <Card className={`group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 ${featured ? 'md:flex' : ''}`}>
      {/* Image */}
      <Link
        to={`/artigo/${post.slug}`}
        className={`block overflow-hidden ${featured ? 'md:w-1/2' : 'aspect-video'}`}
      >
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </Link>

      <div className={featured ? 'md:w-1/2 flex flex-col' : ''}>
        <CardHeader className="space-y-2">
          {/* Category Badge */}
          {post.category && (
            <Link to={`/categoria/${post.category.slug}`}>
              <Badge
                variant="secondary"
                style={{
                  backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                  color: post.category.color || undefined,
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {post.category.name}
              </Badge>
            </Link>
          )}

          {/* Title */}
          <Link to={`/artigo/${post.slug}`}>
            <h3 className={`font-bold leading-tight group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
              {post.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="flex-1">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.reading_time} min
              </span>
            )}
          </div>
          {post.views_count !== null && post.views_count > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views_count.toLocaleString()}
            </span>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
