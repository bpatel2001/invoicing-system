import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import ViewQuotes from './views/ViewQuotes.jsx'
import ViewCustomers from './views/ViewCustomers.jsx'
import ViewProducts from './views/ViewProducts.jsx'
import ViewSingleQuote from './views/ViewSingleQuote.jsx'
import CreateQuote from './creates/CreateQuote.jsx'
import CreateCustomer from './creates/CreateCustomer.jsx'
import CreateProduct from './creates/CreateProduct.jsx'
import Login from './Login.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <ViewQuotes />
    },
    {
      path: '/viewproducts',
      element: <ViewProducts />
    },
    {
      path: '/viewcustomers',
      element: <ViewCustomers />
    },
    {
      path: '/viewquotes/:id',
      element: <ViewSingleQuote/>
    },
    {
      path: '/createquote',
      element: <CreateQuote />
    },
    {
      path: '/createcustomer',
      element: <CreateCustomer />
    },
    {
      path: '/createproduct',
      element: <CreateProduct />
    }
]);

function Root() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (username, password) => {
    const encoded = btoa(`${username}:${password}`);
    setAuth(encoded);
    localStorage.setItem('auth', JSON.stringify(encoded));
    window.location.reload();
  };

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
