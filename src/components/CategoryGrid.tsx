import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { 
  Brain, 
  Bot, 
  Code, 
  Newspaper, 
  Lightbulb, 
  Cpu, 
  MessageSquare,
  Layers 
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  bot: Bot,
  code: Code,
  newspaper: Newspaper,
  lightbulb: Lightbulb,
  cpu: Cpu,
  message: MessageSquare,
  layers: Layers,
};

export function CategoryGrid() {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Categorias</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Explore por Categoria</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category) => {
            const IconComponent = category.icon 
              ? iconMap[category.icon.toLowerCase()] || Brain
              : Brain;

            return (
              <Link key={category.id} to={`/categoria/${category.slug}`}>
                <Card 
                  className="group h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: category.color ? `${category.color}30` : undefined,
                  }}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div
                      className="h-14 w-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: category.color ? `${category.color}15` : 'hsl(var(--primary) / 0.1)',
                        color: category.color || 'hsl(var(--primary))',
                      }}
                    >
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
