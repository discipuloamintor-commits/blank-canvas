import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdSlot } from "./AdSlot";
import { usePublicPosts } from "@/hooks/usePublicPosts";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useState } from "react";

export function Sidebar() {
  const [email, setEmail] = useState("");
  const { popularPosts, isLoading } = usePublicPosts();
  const { subscribe, isSubscribing } = useNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await subscribe({ email: email.trim() });
      setEmail("");
    }
  };

  return (
    <aside className="space-y-6">
      {/* Popular Posts */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Mais Populares
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-16 w-16 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))
          ) : (
            popularPosts?.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                to={`/artigo/${post.slug}`}
                className="flex gap-3 group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  {post.views_count !== null && (
                    <span className="text-xs text-muted-foreground">
                      {post.views_count.toLocaleString()} visualizações
                    </span>
                  )}
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-lg">📬 Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Receba os melhores conteúdos sobre IA diretamente no seu email.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isSubscribing}>
              {isSubscribing ? "Inscrevendo..." : "Inscrever-se"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ad Slot */}
      <AdSlot position="sidebar" />
    </aside>
  );
}
