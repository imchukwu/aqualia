import { Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow duration-300">
          <Droplets className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-gradient leading-none">
          AQUALIA
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Table Water
        </span>
      </div>
    </Link>
  );
};

export default Logo;
