import { CircularProgress } from 'components/CircularProgress';

export const WorkingScreen = ({ refreshProgress }) => {
  return (
    <div className="flex flex-col items-center w-full gap-10">
      <h2>Synchronizing...</h2>
      <CircularProgress progress={refreshProgress} />
      <p className="text-lg">
        this may take a few minutes, please don't leave this page or refresh your browser
      </p>
    </div>
  );
};
