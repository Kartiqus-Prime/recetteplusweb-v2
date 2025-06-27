
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, Play, Loader2 } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { useSupabaseVideos } from '@/hooks/useSupabaseVideos';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: videos = [], isLoading, error } = useSupabaseVideos();

  const categories = [...new Set(videos.map(video => video.category))];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to convert duration string to seconds
  const parseDurationToSeconds = (duration: string): number => {
    if (!duration) return 0;
    const parts = duration.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des vidéos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des vidéos</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Vidéos Tutoriels
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Apprenez avec nos chefs experts grâce à plus de {videos.length} tutoriels vidéo exclusifs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Rechercher une vidéo ou technique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto h-12">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in">
          <Badge 
            variant={selectedCategory === 'all' ? 'default' : 'outline'} 
            className="cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 px-4 py-2 text-sm font-semibold"
            onClick={() => setSelectedCategory('all')}
          >
            Toutes ({videos.length})
          </Badge>
          {categories.slice(0, 6).map((category) => {
            const count = videos.filter(v => v.category === category).length;
            return (
              <Badge 
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 px-4 py-2 text-sm font-semibold"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Badge>
            );
          })}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-orange-600">{filteredVideos.length}</span> vidéo{filteredVideos.length > 1 ? 's' : ''} trouvée{filteredVideos.length > 1 ? 's' : ''}
            </p>
            {searchTerm && (
              <Badge variant="secondary" className="px-3 py-1">
                Recherche: "{searchTerm}"
              </Badge>
            )}
          </div>
          <Select defaultValue="popular">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Plus populaires</SelectItem>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="views">Plus vues</SelectItem>
              <SelectItem value="duration-asc">Plus courtes</SelectItem>
              <SelectItem value="duration-desc">Plus longues</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group">
                <VideoCard 
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail || 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400'}
                  duration={parseDurationToSeconds(video.duration || '0:00')}
                  views={video.views || 0}
                  category={video.category}
                  chef="Chef Recette+"
                  description={video.description || ''}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune vidéo trouvée</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `Aucune vidéo ne correspond à "${searchTerm}"`
                : "Aucune vidéo disponible dans cette catégorie"
              }
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredVideos.length > 0 && filteredVideos.length >= 12 && (
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
              <Play className="h-5 w-5 mr-2" />
              Charger plus de vidéos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
