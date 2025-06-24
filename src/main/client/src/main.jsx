import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import ViewQuotes from './views/ViewQuotes.jsx'
import ViewCustomers from './views/ViewCustomers.jsx'
import ViewProducts from './views/ViewProducts.jsx'
import CreateQuote from './creates/CreateQuote.jsx'
import CreateCustomer from './creates/CreateCustomer.jsx'
import CreateProduct from './creates/CreateProduct.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/viewquotes',
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
