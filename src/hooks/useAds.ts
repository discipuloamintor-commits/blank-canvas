import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Advertisement } from '@/lib/supabase';

type AdPosition = 'header' | 'sidebar' | 'article-top' | 'article-middle' | 'article-bottom';
type AdType = 'adsense' | 'banner';

interface CreateAdData {
  name: string;
  type?: AdType;
  position?: AdPosition;
  adsense_code?: string;
  banner_image?: string;
  banner_link?: string;
  is_active?: boolean;
  priority?: number;
  start_date?: string;
  end_date?: string;
}

interface UpdateAdData extends Partial<CreateAdData> {
  id: string;
}

export function useAds() {
  const queryClient = useQueryClient();

  const adsQuery = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      return data as Advertisement[];
    },
  });

  const createAdMutation = useMutation({
    mutationFn: async (adData: CreateAdData) => {
      const { data, error } = await supabase
        .from('advertisements')
        .insert({
          name: adData.name,
          type: adData.type || 'banner',
          position: adData.position || 'sidebar',
          adsense_code: adData.adsense_code,
          banner_image: adData.banner_image,
          banner_link: adData.banner_link,
          is_active: adData.is_active ?? true,
          priority: adData.priority || 0,
          start_date: adData.start_date,
          end_date: adData.end_date,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });

  const updateAdMutation = useMutation({
    mutationFn: async ({ id, ...adData }: UpdateAdData) => {
      const { data, error } = await supabase
        .from('advertisements')
        .update(adData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });

  const deleteAdMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('advertisements').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });

  const trackClick = async (id: string) => {
    try {
      // Get current count and increment
      const { data } = await supabase
        .from('advertisements')
        .select('clicks_count')
        .eq('id', id)
        .single();
      
      if (data) {
        await supabase
          .from('advertisements')
          .update({ clicks_count: (data.clicks_count || 0) + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error tracking ad click:', error);
    }
  };

  const trackImpression = async (id: string) => {
    try {
      const { data } = await supabase
        .from('advertisements')
        .select('impressions_count')
        .eq('id', id)
        .single();
      
      if (data) {
        await supabase
          .from('advertisements')
          .update({ impressions_count: (data.impressions_count || 0) + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error tracking ad impression:', error);
    }
  };

  const getAdByPosition = (position: string): Advertisement | undefined => {
    const now = new Date();
    const activeAds = (adsQuery.data || []).filter(ad => {
      if (!ad.is_active) return false;
      if (ad.position !== position) return false;
      if (ad.start_date && new Date(ad.start_date) > now) return false;
      if (ad.end_date && new Date(ad.end_date) < now) return false;
      return true;
    });
    // Return highest priority ad
    return activeAds.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
  };

  return {
    ads: adsQuery.data || [],
    isLoading: adsQuery.isLoading,
    error: adsQuery.error,
    createAd: createAdMutation.mutateAsync,
    updateAd: updateAdMutation.mutateAsync,
    deleteAd: deleteAdMutation.mutateAsync,
    trackClick,
    trackImpression,
    getAdByPosition,
    isCreating: createAdMutation.isPending,
    isUpdating: updateAdMutation.isPending,
    isDeleting: deleteAdMutation.isPending,
  };
}

export function useAdsByPosition(position: AdPosition) {
  return useQuery({
    queryKey: ['advertisements', 'position', position],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (error) throw error;
      
      // Filter by date on client side
      const now = new Date();
      return (data as Advertisement[]).filter(ad => {
        if (ad.start_date && new Date(ad.start_date) > now) return false;
        if (ad.end_date && new Date(ad.end_date) < now) return false;
        return true;
      });
    },
  });
}
