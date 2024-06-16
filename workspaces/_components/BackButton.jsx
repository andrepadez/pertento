import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from 'helpers/cn';

export const BackButton = ({ label, href, className }) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center text-lg text-gray-600 dark:text-gray-300 underline',
        className,
      )}
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      {label}
    </Link>
  );
};
