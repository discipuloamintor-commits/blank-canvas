import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Post, Profile, Tag } from '@/lib/supabase';

// Helper to enrich posts with author profiles
async function enrichPostsWithAuthors(posts: any[]): Promise<Post[]> {
  const authorIds = [...new Set(posts.map(p => p.author_id).filter(Boolean))];
  
  if (authorIds.length === 0) {
    return posts as Post[];
  }

  const { data: authors } = await supabase
    .from('profiles')
    .select('*')
    .in('id', authorIds);

  const authorsMap = new Map((authors || []).map(a => [a.id, a]));

  return posts.map(post => ({
    ...post,
    author: post.author_id ? authorsMap.get(post.author_id) || null : null,
  })) as Post[];
}

export function usePublicPosts() {
  const featuredPostsQuery = useQuery({
    queryKey: ['public-posts', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return enrichPostsWithAuthors(data || []);
    },
  });

  const recentPostsQuery = useQuery({
    queryKey: ['public-posts', 'recent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      return enrichPostsWithAuthors(data || []);
    },
  });

  const popularPostsQuery = useQuery({
    queryKey: ['public-posts', 'popular'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .order('views_count', { ascending: false })
        .limit(5);

      if (error) throw error;
      return enrichPostsWithAuthors(data || []);
    },
  });

  return {
    featuredPosts: featuredPostsQuery.data || [],
    recentPosts: recentPostsQuery.data || [],
    popularPosts: popularPostsQuery.data || [],
    isLoading: featuredPostsQuery.isLoading || recentPostsQuery.isLoading,
    error: featuredPostsQuery.error || recentPostsQuery.error,
  };
}

export function usePostsByCategory(categorySlug: string) {
  return useQuery({
    queryKey: ['public-posts', 'category', categorySlug],
    queryFn: async () => {
      // First get category by slug
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (categoryError) throw categoryError;

      // Then get posts for that category
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .eq('category_id', category.id)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return enrichPostsWithAuthors(data || []);
    },
    enabled: !!categorySlug,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ['public-posts', 'slug', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      if (!data) return null;

      // Get author
      let author: Profile | null = null;
      if (data.author_id) {
        const { data: authorData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.author_id)
          .single();
        author = authorData as Profile | null;
      }

      // Fetch tags for this post
      let tags: Tag[] = [];
      const { data: postTags } = await supabase
        .from('post_tags')
        .select('tag_id')
        .eq('post_id', data.id);

      if (postTags && postTags.length > 0) {
        const tagIds = postTags.map(pt => pt.tag_id);
        const { data: tagsData } = await supabase
          .from('tags')
          .select('*')
          .in('id', tagIds);
        tags = (tagsData || []) as Tag[];
      }

      // Increment view count (fire and forget)
      supabase
        .from('posts')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id)
        .then(() => {});

      return {
        ...data,
        author,
        tags,
      } as Post;
    },
    enabled: !!slug,
  });
}

export function useRelatedPosts(postId: string, categoryId: string | null) {
  return useQuery({
    queryKey: ['public-posts', 'related', postId, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .neq('id', postId)
        .limit(4);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('published_at', { ascending: false });

      if (error) throw error;
      return enrichPostsWithAuthors(data || []);
    },
    enabled: !!postId,
  });
}
