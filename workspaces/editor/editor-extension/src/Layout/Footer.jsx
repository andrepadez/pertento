import { useLocation } from 'react-router-dom';
import manifest from '@/shared/manifest.json';

export const Footer = () => {
  const location = useLocation();
  return (
    <div className="text-primary-foreground flex justify-between bg-[#101828] px-10 py-2">
      <div>{`${location.pathname}${location.search}`}</div>
      <div>v{manifest.version}</div>
    </div>
  );
};
