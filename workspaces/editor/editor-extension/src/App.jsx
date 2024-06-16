import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { ExperimentList } from './Screens';
import { SigninPage, SignoutPage, PasskeysPage } from './Auth';
import { useAuth } from 'hooks/useAuth';

const App = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={ExperimentList} />
          <Route exact path="/auth/signin" Component={SigninPage} />
          <Route exact path="/auth/passkeys" Component={PasskeysPage} />
          <Route exact path="/auth/signout" Component={SignoutPage} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
