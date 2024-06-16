import { cn } from 'helpers/cn';

export const CheckMark = ({ className }) => {
  return (
    <div className={cn('w-8 h-8 rounded-full bg-[#10b981] inline-block', className)}>
      <svg
        className="w-4 h-4 m-auto mt-2 text-white"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
        </svg>
      </svg>
    </div>
  );
};
