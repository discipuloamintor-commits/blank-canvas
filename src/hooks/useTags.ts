import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tag } from '@/lib/supabase';
import { generateSlug } from '@/lib/supabase';

interface CreateTagData {
  name: string;
  slug?: string;
}

interface UpdateTagData extends Partial<CreateTagData> {
  id: string;
}

export function useTags() {
  const queryClient = useQueryClient();

  const tagsQuery = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Tag[];
    },
  });

  const getTagBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Tag;
  };

  const createTagMutation = useMutation({
    mutationFn: async (tagData: CreateTagData) => {
      const slug = tagData.slug || generateSlug(tagData.name);

      const { data, error } = await supabase
        .from('tags')
        .insert({
          name: tagData.name,
          slug,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: async ({ id, ...tagData }: UpdateTagData) => {
      const updateData: any = { ...tagData };
      
      if (tagData.name && !tagData.slug) {
        updateData.slug = generateSlug(tagData.name);
      }

      const { data, error } = await supabase
        .from('tags')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tags').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  return {
    tags: tagsQuery.data || [],
    isLoading: tagsQuery.isLoading,
    error: tagsQuery.error,
    getTagBySlug,
    createTag: createTagMutation.mutateAsync,
    updateTag: updateTagMutation.mutateAsync,
    deleteTag: deleteTagMutation.mutateAsync,
    isCreating: createTagMutation.isPending,
    isUpdating: updateTagMutation.isPending,
    isDeleting: deleteTagMutation.isPending,
  };
}

export function usePostTags(postId: string) {
  return useQuery({
    queryKey: ['post-tags', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_tags')
        .select('tag_id, tags(*)')
        .eq('post_id', postId);

      if (error) throw error;
      return data.map(pt => (pt as any).tags) as Tag[];
    },
    enabled: !!postId,
  });
}
