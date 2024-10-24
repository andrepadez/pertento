import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, useTheme } from 'shadcn/ThemeProvider';
import { ErrorDialogs } from 'components/ErrorDialogs';
import { useClient } from 'hooks/useClient';
import { useAuth } from 'hooks/useAuth';
import { AppRoutes } from './MainRouter';
import './index.css';

export const App = () => {
  const { apiError, setApiError } = useClient();
  const { theme } = useTheme();
  const { isLoading, user } = useAuth();
  const { pathname } = window.location;

  if (isLoading) return null;

  // return (
  //   <div className="flex flex-col items-center justify-center bg-black min-h-dvh">
  //     <div className="flex max-w-[720px] flex-col gap-5 bg-white p-10 text-center">
  //       <h1>Dashboard under maintenance</h1>
  //       <img src="/pertento_light.png" alt="Pertento" className="mx-auto w-[30%]" />
  //       <p>We are currently performing maintenance on our dashboard.</p>
  //       <div className="flex flex-col ml-32 text-lg text-left text-green-700">
  //         <strong className="">Your experiments are still running;</strong>
  //         <strong>Your websites are behaving as they should;</strong>
  //         <strong>Data is being collected as per normal</strong>
  //         <strong>No action needed</strong>
  //       </div>

  //       <strong>We promise to be brief, and we apologize for the inconvenience.</strong>
  //       <strong className="text-lg">Thank you for your patience.</strong>
  //     </div>
  //   </div>
  // );

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <AppRoutes />
      </Router>
      <ErrorDialogs apiError={apiError} setApiError={setApiError} />
    </ThemeProvider>
  );
};

export default App;
