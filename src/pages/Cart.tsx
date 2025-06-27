
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChefHat, User, Package } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import MainCartView from '@/components/cart/MainCartView';
import RecipeCartsView from '@/components/cart/RecipeCartsView';
import PersonalCartView from '@/components/cart/PersonalCartView';

const Cart = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('main');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-center text-gray-600 mb-4">
              Veuillez vous connecter pour accéder à vos paniers.
            </p>
            <Button 
              onClick={() => navigate('/login')} 
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Paniers</h1>
          <p className="text-gray-600">
            Gérez tous vos paniers : principal, recettes et personnalisé
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="main" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Principal</span>
            </TabsTrigger>
            <TabsTrigger value="recipe" className="flex items-center space-x-2">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Recettes</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personnel</span>
            </TabsTrigger>
            <TabsTrigger value="preconfigured" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Préconfigurés</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-6">
            <MainCartView />
          </TabsContent>

          <TabsContent value="recipe" className="space-y-6">
            <RecipeCartsView />
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <PersonalCartView />
          </TabsContent>

          <TabsContent value="preconfigured" className="space-y-6">
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Paniers préconfigurés</h3>
                  <p className="text-gray-600 mb-6">Découvrez nos sélections de produits pré-organisées</p>
                  <Button 
                    onClick={() => navigate('/preconfigured-carts')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Voir les paniers préconfigurés
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Cart;
