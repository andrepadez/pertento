import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './Dashboard/DashboardLayout';
import { AuthLayout } from 'authentication/react/AuthLayout';
import * as Dash from './Dashboard/DashboardRoutes';
import * as Auth from 'authentication/react/AuthRoutes';
const { VITE_GOOGLE_AUTH_CLIENT_ID } = import.meta.env;

export const AppRoutes = () => {
  return (
    <>
      <DashboardLayout>
        <AuthLayout>
          <Routes>
            <Route exact path="/auth/signin" Component={Auth.SigninScreen} />
            <Route exact path="/auth/signout" Component={Auth.SignoutScreen} />
            <Route exact path="/auth/signup" Component={Auth.SignupScreen} />
            <Route exact path="/auth/verify" Component={Auth.VerifyScreen} />
            <Route exact path="/auth/accept-invitation" Component={Auth.AcceptInvitation} />
            <Route exact path="/auth/reset-password" Component={Auth.ResetPasswordScreen} />
            <Route exact path="/auth/forgot-password" Component={Auth.ForgotPasswordScreen} />

            <Route exact path="/" Component={Dash.HomeScreen} />
            <Route exact path="/experiments" Component={Dash.ExperimentsListScreen} />
            <Route exact path="/experiments/:id" Component={Dash.ExperimentDetailsScreen} />
            <Route exact path="/experiments-monitor" Component={Dash.ExperimentsMonitorScreen} />
            <Route exact path="/clients" Component={Dash.ClientsListScreen} />
            <Route exact path="/websites" Component={Dash.WebsitesScreen} />
            {!!VITE_GOOGLE_AUTH_CLIENT_ID && (
              <Route exact path="/google-analytics" Component={Dash.GoogleAnalyticsScreen} />
            )}
            <Route exact path="/organization" Component={Dash.OrganizationDetailsScreen} />
            <Route exact path="/account" Component={Dash.AccountScreen} />
            <Route path="*" Component={Dash.FourOhFour} />
          </Routes>
        </AuthLayout>
      </DashboardLayout>
    </>
  );
};
