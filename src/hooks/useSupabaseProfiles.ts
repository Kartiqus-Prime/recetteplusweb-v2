
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseProfile {
  id: string;
  email?: string;
  display_name?: string;
  photo_url?: string;
  role: 'user' | 'admin';
  preferences?: {
    dietaryRestrictions: string[];
    favoriteCategories: string[];
  };
  created_at: string;
  updated_at: string;
}

export const useSupabaseProfile = (userId?: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['supabase-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        return data as SupabaseProfile;
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur de connexion",
          description: "Impossible de récupérer le profil.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
    retry: 2
  });
};

export const useUpdateSupabaseProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, data }: { 
      userId: string; 
      data: Partial<SupabaseProfile>
    }) => {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: data.display_name,
          preferences: data.preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['supabase-profile', variables.userId] });
      toast({
        title: "Profil modifié",
        description: "Vos préférences ont été mises à jour avec succès."
      });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le profil.",
        variant: "destructive"
      });
    }
  });
};
