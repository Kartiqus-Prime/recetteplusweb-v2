
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, Tag, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/firestore';

const Cart = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading, updateQuantity, removeFromCart } = useCart();
  const { data: products = [] } = useProducts();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantityHandler = (cartItemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartItemId);
      return;
    }
    updateQuantity({ cartItemId, quantity: newQuantity });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'recette10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  // Calculer les prix en combinant les données du panier et des produits
  const cartWithProducts = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    return {
      ...cartItem,
      product: product || null
    };
  }).filter(item => item.product);

  const subtotal = cartWithProducts.reduce((sum, item) => 
    sum + (item.product!.price * item.quantity), 0
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-center text-gray-600 mb-4">
              Veuillez vous connecter pour accéder à votre panier.
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  if (cartWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
                <p className="text-gray-600 mb-6">Découvrez nos recettes et ajoutez des ingrédients à votre panier</p>
                <Button 
                  onClick={() => navigate('/recettes')} 
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Voir les recettes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Items du panier */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Articles ({cartWithProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartWithProducts.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.product!.image} 
                      alt={item.product!.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product!.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.product!.category}
                      </Badge>
                      <p className="text-orange-500 font-semibold">
                        {formatPrice(item.product!.price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantityHandler(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantityHandler(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Résumé de commande */}
          <div>
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
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      className="px-3"
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600">Code promo appliqué !</p>
                  )}
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Passer commande
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/produits')}
                >
                  Continuer mes achats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
