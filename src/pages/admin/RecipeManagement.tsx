import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Star, Clock, Users, ChefHat, Video } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RecipeForm from '@/components/admin/RecipeForm';
import { useSupabaseRecipes, useCreateSupabaseRecipe, useUpdateSupabaseRecipe, useDeleteSupabaseRecipe, Recipe } from '@/hooks/useSupabaseRecipes';

const RecipeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  
  const { data: recipes = [], isLoading: recipesLoading, refetch } = useSupabaseRecipes();
  const createRecipeMutation = useCreateSupabaseRecipe();
  const updateRecipeMutation = useUpdateSupabaseRecipe();
  const deleteRecipeMutation = useDeleteSupabaseRecipe();

  const filteredRecipes = recipes?.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe as any).profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreate = async (data: Omit<Recipe, 'id' | 'created_at'>) => {
    try {
      await createRecipeMutation.mutateAsync(data);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleUpdate = async (data: Omit<Recipe, 'id' | 'created_at'>) => {
    if (!editingRecipe) return;
    
    try {
      await updateRecipeMutation.mutateAsync({
        id: editingRecipe.id,
        ...data
      });
      setEditingRecipe(null);
      refetch();
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la recette "${title}" ?`)) {
      try {
        await deleteRecipeMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const isLoading = recipesLoading;
  const isMutating = createRecipeMutation.isPending || updateRecipeMutation.isPending || deleteRecipeMutation.isPending;

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
            <ChefHat className="h-8 w-8 mr-3 text-orange-500" />
            Gestion des recettes
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez toutes les recettes de votre plateforme ({recipes.length} recettes)
          </p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une recette
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recipes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recettes ({filteredRecipes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recette</TableHead>
                <TableHead>Créateur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Difficulté</TableHead>
                <TableHead>Temps</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Vidéo</TableHead>
                <TableHead>Créée le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => {
                const creator = (recipe as any).profiles;
                return (
                  <TableRow key={recipe.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {recipe.image && (
                          <img 
                            src={recipe.image} 
                            alt={recipe.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{recipe.title}</p>
                          <p className="text-sm text-gray-500">{recipe.servings} portions</p>
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
                      <Badge variant="outline">{recipe.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          recipe.difficulty === 'Facile' ? 'default' :
                          recipe.difficulty === 'Moyen' ? 'secondary' : 'destructive'
                        }
                      >
                        {recipe.difficulty || 'Non définie'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{recipe.cook_time} min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{recipe.rating || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {recipe.video_id ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Video className="h-4 w-4" />
                          <span className="text-sm">Oui</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Non</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {format(new Date(recipe.created_at), 'dd/MM/yyyy', { locale: fr })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingRecipe(recipe)}
                          disabled={isMutating}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(recipe.id, recipe.title)}
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
            <DialogTitle>Ajouter une recette</DialogTitle>
          </DialogHeader>
          <RecipeForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isLoading={createRecipeMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={!!editingRecipe} onOpenChange={() => setEditingRecipe(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la recette</DialogTitle>
          </DialogHeader>
          {editingRecipe && (
            <RecipeForm
              recipe={editingRecipe as any}
              onSubmit={handleUpdate}
              onCancel={() => setEditingRecipe(null)}
              isLoading={updateRecipeMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeManagement;
