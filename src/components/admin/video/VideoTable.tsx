
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Play, Clock, Users, Heart } from 'lucide-react';
import { SupabaseVideo } from '@/hooks/useSupabaseVideos';

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: string;
  disabled: boolean;
  emailVerified: boolean;
}

interface VideoTableProps {
  videos: SupabaseVideo[];
  users: AdminUser[];
  onEdit: (video: SupabaseVideo) => void;
  onDelete: (id: string, title: string) => void;
  isLoading?: boolean;
}

const VideoTable: React.FC<VideoTableProps> = ({ 
  videos, 
  users, 
  onEdit, 
  onDelete, 
  isLoading 
}) => {
  const getUserName = (userId: string) => {
    const user = users.find(u => u.uid === userId);
    return user?.displayName || user?.email || 'Utilisateur inconnu';
  };

  if (videos.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Play className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            Aucune vidéo trouvée
          </h3>
          <p className="text-gray-500">
            Commencez par ajouter votre première vidéo.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Par {getUserName(video.created_by)}
                </p>
              </div>
              {video.thumbnail && (
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-16 h-16 rounded-lg object-cover ml-3"
                />
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{video.category}</Badge>
              {video.duration && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{video.views || 0} vues</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span>{video.likes || 0} likes</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {video.description}
            </p>
            
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(video)}
                disabled={isLoading}
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(video.id, video.title)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoTable;
