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
