
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Package, ChefHat, User } from 'lucide-react';
import { useMainCart } from '@/hooks/useSupabaseCart';
import { formatPrice } from '@/lib/firestore';

const MainCartView = () => {
  const { cart, cartItems, isLoading, removeCartItem } = useMainCart();

  const getCartTypeIcon = (type: string) => {
    switch (type) {
      case 'recipe':
        return <ChefHat className="h-4 w-4" />;
      case 'personal':
        return <User className="h-4 w-4" />;
      case 'preconfigured':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getCartTypeLabel = (type: string) => {
    switch (type) {
      case 'recipe':
        return 'Recette';
      case 'personal':
        return 'Personnel';
      case 'preconfigured':
        return 'Préconfigurés';
      default:
        return 'Panier';
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.cart_total_price || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
            <p className="text-gray-600 mb-6">Ajoutez des produits depuis vos paniers recette ou personnalisés</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Panier Principal ({cartItems.length} panier{cartItems.length > 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                  {getCartTypeIcon(item.cart_reference_type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.cart_name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getCartTypeLabel(item.cart_reference_type)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {item.items_count} article{(item.items_count || 0) > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-orange-500 font-semibold mt-1">
                    {formatPrice(item.cart_total_price || 0)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCartItem(item.id)}
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
          <CardTitle>Résumé de commande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Passer commande
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainCartView;
