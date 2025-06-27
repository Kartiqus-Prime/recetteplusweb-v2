
import { useQuery } from '@tanstack/react-query';
import { videoService } from '@/lib/firestore';

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: videoService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: ['video', id],
    queryFn: () => videoService.getById(id),
    enabled: !!id,
  });
};
