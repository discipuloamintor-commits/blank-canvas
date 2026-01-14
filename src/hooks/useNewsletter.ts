import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { NewsletterSubscriber } from '@/lib/supabase';

interface SubscribeData {
  email: string;
  name?: string;
  source?: string;
}

export function useNewsletter() {
  const queryClient = useQueryClient();

  const subscribersQuery = useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (subscribeData: SubscribeData) => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: subscribeData.email,
          name: subscribeData.name,
          source: subscribeData.source || 'website',
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('Este email já está inscrito na newsletter.');
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });

  const unsubscribeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: false,
          unsubscribed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });

  const deleteSubscriberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });

  const exportToCSV = () => {
    const subscribers = subscribersQuery.data || [];
    const headers = ['Email', 'Nome', 'Data de Inscrição', 'Ativo', 'Fonte'];
    
    const csvContent = [
      headers.join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.name || '',
        new Date(sub.subscribed_at).toLocaleDateString('pt-BR'),
        sub.is_active ? 'Sim' : 'Não',
        sub.source,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return {
    subscribers: subscribersQuery.data || [],
    activeSubscribers: subscribersQuery.data?.filter(s => s.is_active) || [],
    isLoading: subscribersQuery.isLoading,
    error: subscribersQuery.error,
    subscribe: subscribeMutation.mutateAsync,
    unsubscribe: unsubscribeMutation.mutateAsync,
    deleteSubscriber: deleteSubscriberMutation.mutateAsync,
    exportToCSV,
    isSubscribing: subscribeMutation.isPending,
  };
}
