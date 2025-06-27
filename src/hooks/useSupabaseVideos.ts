import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail: string | null;
  duration: string | null;
  views: number | null;
  likes: number | null;
  category: string;
  recipe_id: string | null;
  created_at: string;
  created_by: string;
  profiles?: {
    display_name: string | null;
    email: string | null;
  } | null;
  recipes?: {
    title: string;
  } | null;
}

export const useSupabaseVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      console.log('Fetching videos from Supabase...');
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          profiles(display_name, email),
          recipes(title)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }

      // Filtrer et nettoyer les données pour gérer les erreurs de jointure
      const cleanedData = data?.map(video => ({
        ...video,
        profiles: video.profiles && typeof video.profiles === 'object' && !('error' in video.profiles) 
          ? video.profiles 
          : null,
        recipes: video.recipes && typeof video.recipes === 'object' && !('error' in video.recipes)
          ? video.recipes
          : null
      })) || [];

      return cleanedData as Video[];
    },
  });
};

export const useCreateSupabaseVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (video: Omit<Video, 'id' | 'created_at' | 'views' | 'likes'>) => {
      const { data, error } = await supabase
        .from('videos')
        .insert([{
          ...video,
          views: 0,
          likes: 0
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
};

export const useUpdateSupabaseVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...video }: Partial<Video> & { id: string }) => {
      const { data, error } = await supabase
        .from('videos')
        .update(video)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
};

export const useDeleteSupabaseVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
};
