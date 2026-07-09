import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, Redirect } from 'wouter';

import Dashboard from './pages/dashboard';
import UsersList from './pages/users/index';
import CreateUser from './pages/users/create';
import BibleStudiesList from './pages/bible-studies/index';
import CreateBibleStudy from './pages/bible-studies/create';
import SermonsList from './pages/sermons/index';
import CreateSermon from './pages/sermons/create';
import EventsList from './pages/events/index';
import CreateEvent from './pages/events/create';
import Discussions from './pages/discussions';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={UsersList} />
      <Route path="/users/create" component={CreateUser} />
      <Route path="/bible-studies" component={BibleStudiesList} />
      <Route path="/bible-studies/create" component={CreateBibleStudy} />
      <Route path="/sermons" component={SermonsList} />
      <Route path="/sermons/create" component={CreateSermon} />
      <Route path="/events" component={EventsList} />
      <Route path="/events/create" component={CreateEvent} />
      <Route path="/discussions" component={Discussions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
