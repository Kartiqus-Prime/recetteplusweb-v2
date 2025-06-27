
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { usePersonalCart } from '@/hooks/useSupabaseCart';
import { formatPrice } from '@/lib/firestore';

const PersonalCartView = () => {
  const { personalCart, personalCartItems, isLoading } = usePersonalCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!personalCart || personalCartItems.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12">
          <div className="text-center">
            <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Panier personnel vide</h3>
            <p className="text-gray-600 mb-6">Ajoutez des produits à votre panier personnalisé</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Voir les produits
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const subtotal = personalCartItems.reduce((sum, item) => 
    sum + ((item.products?.price || 0) * item.quantity), 0
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Panier Personnel ({personalCartItems.length} articles)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalCartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img 
                src={item.products?.image || '/placeholder.svg'} 
                alt={item.products?.name || ''}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.products?.name}</h3>
                <Badge variant="outline" className="text-xs mt-1">
                  {item.products?.category}
                </Badge>
                <p className="text-orange-500 font-semibold mt-1">
                  {formatPrice(item.products?.price || 0)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Total estimé</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={personalCart?.is_added_to_main_cart}
          >
            {personalCart?.is_added_to_main_cart ? (
              'Ajouté au panier principal'
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter au panier principal
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalCartView;
