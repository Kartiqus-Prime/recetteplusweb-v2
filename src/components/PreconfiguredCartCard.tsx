
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package } from 'lucide-react';
import { formatPrice } from '@/lib/firestore';
import { PreconfiguredCart } from '@/lib/cart-types';

interface PreconfiguredCartCardProps extends PreconfiguredCart {
  onAddToCart: (cartId: string) => void;
  isAdding?: boolean;
}

const PreconfiguredCartCard: React.FC<PreconfiguredCartCardProps> = ({
  id,
  name,
  description,
  image,
  totalPrice,
  category,
  items,
  onAddToCart,
  isAdding = false
}) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-orange-500 text-white">
            {items.length} produits
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            {category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-orange-500 transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {items.length} articles
            </span>
          </div>
          <span className="text-lg font-bold text-orange-500">
            {formatPrice(totalPrice)}
          </span>
        </div>
        
        <Button 
          onClick={() => onAddToCart(id)}
          disabled={isAdding}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isAdding ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreconfiguredCartCard;
