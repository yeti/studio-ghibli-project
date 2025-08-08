import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '~/routes.tsx';
import { ErrorBoundary } from '~/shared/components/ErrorBoundary';

const App = () => {
  const router = createBrowserRouter([...routes]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
