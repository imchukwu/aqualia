import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    count: number;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl p-6 bg-card shadow-soft hover:shadow-elevated transition-all duration-300 card-hover"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      
      {/* Icon */}
      <div className="relative w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl">{category.icon}</span>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {category.count} products
          </span>
          <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Shop Now
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
