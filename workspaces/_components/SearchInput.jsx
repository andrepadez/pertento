import { cn } from 'helpers/cn';
import { Input } from 'shadcn/input';
import { CircleX, Search } from 'lucide-react';

export const SearchInput = ({ className, handleSearch, value = '', placeholder = 'search' }) => {
  return (
    <div className={cn('flex w-96', className)}>
      <Search className="absolute z-10 my-3 ml-2" size={18} />
      <Input
        className="w-full pl-10"
        value={value}
        onChange={(ev) => handleSearch(ev.target.value || '')}
        placeholder={placeholder}
      />

      <CircleX className="z-10 my-3 -ml-6 cursor-pointer" onClick={() => handleSearch('')} size={18} />
    </div>
  );
};
