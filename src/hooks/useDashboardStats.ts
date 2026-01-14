import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  totalSubscribers: number;
  activeSubscribers: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      // Fetch all stats in parallel
      const [
        postsResult,
        categoriesResult,
        tagsResult,
        subscribersResult,
      ] = await Promise.all([
        supabase.from('posts').select('id, status, views_count'),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('tags').select('id', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('id, is_active'),
      ]);

      const posts = postsResult.data || [];
      const totalViews = posts.reduce((sum, post) => sum + (post.views_count || 0), 0);
      const publishedPosts = posts.filter(p => p.status === 'published').length;
      const draftPosts = posts.filter(p => p.status === 'draft').length;

      const subscribers = subscribersResult.data || [];
      const activeSubscribers = subscribers.filter(s => s.is_active).length;

      return {
        totalPosts: posts.length,
        publishedPosts,
        draftPosts,
        totalCategories: categoriesResult.count || 0,
        totalTags: tagsResult.count || 0,
        totalViews,
        totalSubscribers: subscribers.length,
        activeSubscribers,
      };
    },
  });
}
