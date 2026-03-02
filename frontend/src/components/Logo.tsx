import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <img src="/logo.jpg" alt="Aqualia Waters Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
    </Link>
  );
};

export default Logo;
