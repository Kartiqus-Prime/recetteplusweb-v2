
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, Package, Tag } from 'lucide-react';
import { useMainCart } from '@/hooks/useSupabaseCart';
import { formatPrice } from '@/lib/firestore';

const MainCartView = () => {
  const { cart, cartItems, isLoading, updateCartItem, removeCartItem } = useMainCart();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeCartItem(itemId);
      return;
    }
    updateCartItem({ itemId, quantity: newQuantity });
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.cart_type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

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
            Panier Principal ({cartItems.length} articles)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedItems).map(([cartType, items]) => (
            <div key={cartType} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {cartType === 'recipe' ? 'Recettes' : 
                   cartType === 'personal' ? 'Personnel' : 'Préconfigurés'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {items.length} article{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                    <img 
                      src={item.products?.image || '/placeholder.svg'} 
                      alt={item.products?.name || ''}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.products?.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.products?.category}
                        </Badge>
                        {item.source_cart_name && (
                          <Badge variant="secondary" className="text-xs">
                            <Package className="h-3 w-3 mr-1" />
                            {item.source_cart_name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-orange-500 font-semibold mt-1">
                        {formatPrice(item.unit_price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
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
              </div>

              {cartType !== Object.keys(groupedItems)[Object.keys(groupedItems).length - 1] && (
                <Separator />
              )}
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
