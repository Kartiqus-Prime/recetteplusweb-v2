import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Video, Users, Eye, Heart, Clock, ChefHat } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import VideoForm from '@/components/admin/VideoForm';
import { useSupabaseVideos, useCreateSupabaseVideo, useUpdateSupabaseVideo, useDeleteSupabaseVideo, Video as VideoType } from '@/hooks/useSupabaseVideos';

const VideoManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  
  const { data: videos = [], isLoading: videosLoading, refetch } = useSupabaseVideos();
  const createVideoMutation = useCreateSupabaseVideo();
  const updateVideoMutation = useUpdateSupabaseVideo();
  const deleteVideoMutation = useDeleteSupabaseVideo();

  const filteredVideos = videos?.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (video as any).profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreate = async (data: Omit<VideoType, 'id' | 'created_at' | 'views' | 'likes'>) => {
    try {
      await createVideoMutation.mutateAsync(data);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  const handleUpdate = async (data: Omit<VideoType, 'id' | 'created_at'>) => {
    if (!editingVideo) return;
    
    try {
      await updateVideoMutation.mutateAsync({
        id: editingVideo.id,
        ...data
      });
      setEditingVideo(null);
      refetch();
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la vidéo "${title}" ?`)) {
      try {
        await deleteVideoMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const isLoading = videosLoading;
  const isMutating = createVideoMutation.isPending || updateVideoMutation.isPending || deleteVideoMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Video className="h-8 w-8 mr-3 text-orange-500" />
            Gestion des vidéos
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez toutes les vidéos de votre plateforme ({videos.length} vidéos)
          </p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une vidéo
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une vidéo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Videos Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vidéos ({filteredVideos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vidéo</TableHead>
                <TableHead>Créateur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Recette liée</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Statistiques</TableHead>
                <TableHead>Créée le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => {
                const creator = (video as any).profiles;
                const linkedRecipe = (video as any).recipes;
                return (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {video.thumbnail && (
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {video.description || 'Pas de description'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">
                            {creator?.display_name || 'Utilisateur inconnu'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {creator?.email || 'Email non disponible'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{video.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {linkedRecipe ? (
                        <div className="flex items-center space-x-2">
                          <ChefHat className="h-4 w-4 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">{linkedRecipe.title}</p>
                            <Badge variant="secondary" className="text-xs">Liée</Badge>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Aucune recette</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {video.duration ? (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{video.duration}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Non définie</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{video.views || 0} vues</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{video.likes || 0} j'aime</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {format(new Date(video.created_at), 'dd/MM/yyyy', { locale: fr })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingVideo(video)}
                          disabled={isMutating}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(video.id, video.title)}
                          disabled={isMutating}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter une vidéo</DialogTitle>
          </DialogHeader>
          <VideoForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isLoading={createVideoMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={!!editingVideo} onOpenChange={() => setEditingVideo(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la vidéo</DialogTitle>
          </DialogHeader>
          {editingVideo && (
            <VideoForm
              video={editingVideo as any}
              onSubmit={handleUpdate}
              onCancel={() => setEditingVideo(null)}
              isLoading={updateVideoMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagement;
