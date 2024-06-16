import { cn } from 'helpers/cn';

export const Responsiveness = () => {
  return (
    <div className="fixed p-2 bottom-2 right-2">
      <div className="flex flex-col items-center justify-center w-8 h-8 text-xs text-white bg-black rounded-full">
        <span className="sm:hidden">xs</span>
        <span className="hidden sm:inline md:hidden">sm</span>
        <span className="hidden md:inline lg:hidden">md</span>
        <span className="hidden lg:inline xl:hidden">lg</span>
        <span className="hidden xl:inline">xl</span>
      </div>
    </div>
  );
};
