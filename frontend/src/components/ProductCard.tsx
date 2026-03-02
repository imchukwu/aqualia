import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/store/cartStore';
import { useCart } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group card-premium flex flex-col h-full relative cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.originalPrice && (
            <Badge className="bg-destructive text-destructive-foreground font-bold shadow-soft px-2 py-0.5 animate-fade-in-up">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {product.size && (
            <Badge variant="secondary" className="font-semibold shadow-soft backdrop-blur-md bg-secondary/80">
              {product.size}
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10 shadow-soft">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
          <Button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="w-full gradient-ocean text-primary-foreground shadow-elevated hover:shadow-glow transition-all btn-ripple font-bold"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 bg-white/50 backdrop-blur-sm">
        {/* Category */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 opacity-80">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 mt-auto">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground/30'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-extrabold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm font-medium text-muted-foreground/70 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
