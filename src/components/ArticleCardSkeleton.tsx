import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleCardSkeletonProps {
  featured?: boolean;
}

export function ArticleCardSkeleton({ featured = false }: ArticleCardSkeletonProps) {
  return (
    <Card className={`overflow-hidden border-border/50 ${featured ? 'md:flex' : ''}`}>
      {/* Image Skeleton */}
      <div className={`${featured ? 'md:w-1/2' : 'aspect-video'}`}>
        <Skeleton className="w-full h-full min-h-[200px]" />
      </div>

      <div className={featured ? 'md:w-1/2 flex flex-col' : ''}>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className={`h-6 ${featured ? 'w-3/4' : 'w-full'}`} />
          {featured && <Skeleton className="h-6 w-1/2" />}
        </CardHeader>

        <CardContent className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-12" />
        </CardFooter>
      </div>
    </Card>
  );
}
