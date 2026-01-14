import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Post, PostStatus, Profile, Category, Tag } from '@/lib/supabase';
import { calculateReadingTime, generateSlug } from '@/lib/supabase';

interface PostFilters {
  status?: PostStatus;
  categoryId?: string;
  search?: string;
}

interface CreatePostData {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: string;
  status?: PostStatus;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  tag_ids?: string[];
}

interface UpdatePostData extends Partial<CreatePostData> {
  published_at?: string | null;
}

// Helper to enrich post with author profile
async function enrichPostWithAuthor(post: any): Promise<Post> {
  if (post.author_id) {
    const { data: author } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', post.author_id)
      .single();
    post.author = author as Profile | null;
  }
  return post as Post;
}

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

export function usePosts(filters?: PostFilters) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['posts', filters],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return enrichPostsWithAuthors(data || []);
    },
  });

  const getPost = async (idOrSlug: string) => {
    // Try by ID first
    let { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', idOrSlug)
      .maybeSingle();

    // If not found by ID, try by slug
    if (!data) {
      const result = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('slug', idOrSlug)
        .maybeSingle();
      
      data = result.data;
      error = result.error;
    }

    if (error) throw error;
    if (!data) return null;

    // Enrich with author
    const enrichedPost = await enrichPostWithAuthor(data);

    // Fetch tags for this post
    const { data: postTags } = await supabase
      .from('post_tags')
      .select('tag_id')
      .eq('post_id', data.id);

    if (postTags && postTags.length > 0) {
      const tagIds = postTags.map(pt => pt.tag_id);
      const { data: tags } = await supabase
        .from('tags')
        .select('*')
        .in('id', tagIds);
      enrichedPost.tags = (tags || []) as Tag[];
    } else {
      enrichedPost.tags = [];
    }

    return enrichedPost;
  };

  const createPostMutation = useMutation({
    mutationFn: async (postData: CreatePostData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Usuário não autenticado');

      const slug = postData.slug || generateSlug(postData.title);
      const readingTime = postData.content ? calculateReadingTime(postData.content) : 0;

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: postData.title,
          slug,
          excerpt: postData.excerpt,
          content: postData.content,
          featured_image: postData.featured_image,
          category_id: postData.category_id,
          author_id: userData.user.id,
          status: postData.status || 'draft',
          reading_time: readingTime,
          meta_title: postData.meta_title,
          meta_description: postData.meta_description,
          meta_keywords: postData.meta_keywords,
        })
        .select()
        .single();

      if (error) throw error;

      // Add tags if provided
      if (postData.tag_ids && postData.tag_ids.length > 0) {
        const tagInserts = postData.tag_ids.map(tagId => ({
          post_id: data.id,
          tag_id: tagId,
        }));
        await supabase.from('post_tags').insert(tagInserts);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, ...postData }: UpdatePostData & { id: string }) => {
      const updateData: Record<string, unknown> = { ...postData };
      delete updateData.tag_ids;
      
      if (postData.content) {
        updateData.reading_time = calculateReadingTime(postData.content);
      }

      if (postData.title && !postData.slug) {
        updateData.slug = generateSlug(postData.title);
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update tags if provided
      if (postData.tag_ids !== undefined) {
        // Remove existing tags
        await supabase.from('post_tags').delete().eq('post_id', id);
        
        // Add new tags
        if (postData.tag_ids.length > 0) {
          const tagInserts = postData.tag_ids.map(tagId => ({
            post_id: id,
            tag_id: tagId,
          }));
          await supabase.from('post_tags').insert(tagInserts);
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const publishPostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const unpublishPostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('posts')
        .update({
          status: 'draft',
          published_at: null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,
    getPost,
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
    publishPost: publishPostMutation.mutateAsync,
    unpublishPost: unpublishPostMutation.mutateAsync,
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
}
