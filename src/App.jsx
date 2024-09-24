import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ListNewsPage } from './Pages/ListNewsPage/ListNewsPage';
import { NewsPage } from './Pages/NewsPage/NewsPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <ListNewsPage />,
  },
  {
    path: 'news/:id',
    element: <NewsPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
