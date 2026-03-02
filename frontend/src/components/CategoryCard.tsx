import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      className="group relative overflow-hidden rounded-[2rem] p-8 glass border border-white/60 hover:border-white shadow-soft hover:shadow-elevated hover:-translate-y-3 transition-all duration-500 flex flex-col h-full bg-white/40 backdrop-blur-xl"
    >
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 group-hover:scale-150 transition-all duration-700 z-0" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-[50px] group-hover:bg-accent/30 group-hover:scale-150 transition-all duration-700 z-0" />

      {/* Floating Sparkle icon on hover */}
      <Sparkles className="absolute top-6 right-6 w-5 h-5 text-accent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 z-10" />

      {/* Icon Area */}
      <div className="relative z-10 w-20 h-20 rounded-3xl gradient-ocean flex items-center justify-center mb-6 shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
        <span className="text-4xl filter drop-shadow-md">{category.icon}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-base text-muted-foreground/90 mb-8 flex-grow leading-relaxed font-medium">
          {category.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-primary/10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary">
            <span className="text-xs font-bold uppercase tracking-wider">{category.count} Products</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary text-foreground group-hover:text-white group-hover:shadow-md transition-all duration-300">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
