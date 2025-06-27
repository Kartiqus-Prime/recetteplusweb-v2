
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Package, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useCustomCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';

interface PreconfiguredCart {
  id: string;
  name: string;
  description: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
  estimatedServings: number;
  category: string;
}

// Données d'exemple pour les paniers préconfigurés
const preconfiguredCarts: PreconfiguredCart[] = [
  {
    id: '1',
    name: 'Panier Famille 4 personnes',
    description: 'Tout le nécessaire pour une semaine de repas équilibrés pour 4 personnes',
    items: [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 },
      { productId: '3', quantity: 1 },
    ],
    totalPrice: 45.90,
    estimatedServings: 12,
    category: 'Famille'
  },
  // ... autres paniers
];

const PreconfiguredCarts = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCustomCart();
  const { data: products } = useProducts();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Famille', 'Solo', 'Végétarien', 'Express'];

  const filteredCarts = selectedCategory === 'Tous' 
    ? preconfiguredCarts 
    : preconfiguredCarts.filter(cart => cart.category === selectedCategory);

  const handleAddCartToCustomCart = async (cart: PreconfiguredCart) => {
    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des produits au panier",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const item of cart.items) {
        addToCart({ productId: item.productId, quantity: item.quantity });
      }
      
      toast({
        title: "Panier ajouté",
        description: `Le panier "${cart.name}" a été ajouté à votre panier personnalisé`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le panier",
        variant: "destructive"
      });
    }
  };

  const getProductName = (productId: string) => {
    const product = products?.find(p => p.id === productId);
    return product?.name || 'Produit inconnu';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Package className="h-10 w-10 mr-3 text-orange-500" />
            Paniers Préconfigurés
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos sélections de produits soigneusement choisies pour différents besoins et occasions
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grille des paniers */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCarts.map((cart) => (
            <Card key={cart.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{cart.name}</CardTitle>
                    <Badge variant="outline" className="mb-2">
                      {cart.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-500">
                      {cart.totalPrice.toFixed(2)} €
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{cart.description}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-4">
                  {/* Informations du panier */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{cart.estimatedServings} portions</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      <span>{cart.items.length} produits</span>
                    </div>
                  </div>

                  {/* Liste des produits */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Contenu du panier :</h4>
                    <div className="space-y-1">
                      {cart.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="text-sm text-gray-600 flex justify-between">
                          <span>{getProductName(item.productId)}</span>
                          <span>×{item.quantity}</span>
                        </div>
                      ))}
                      {cart.items.length > 3 && (
                        <div className="text-sm text-gray-500">
                          ... et {cart.items.length - 3} autres produits
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4 mt-auto">
                    <Button 
                      onClick={() => handleAddCartToCustomCart(cart)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={!currentUser}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Voir le détail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCarts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Aucun panier trouvé
            </h3>
            <p className="text-gray-500">
              Aucun panier ne correspond à cette catégorie pour le moment.
            </p>
          </div>
        )}

        {!currentUser && (
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Connectez-vous pour ajouter des paniers à votre panier personnalisé
                </p>
                <Button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Se connecter
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreconfiguredCarts;
