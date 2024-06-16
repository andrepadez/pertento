import { Progress } from 'shadcn/progress';

export const CircularProgress = ({ progress = 50 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border-[0.8rem] rounded-full border-primary h-96 w-96">
      <h3 className="text-4xl">
        {progress || '00.00'}
        <span className="text-xl">%</span>
      </h3>
      <div className="w-full px-16">
        <Progress value={progress || 0} />
      </div>
    </div>
  );
};
