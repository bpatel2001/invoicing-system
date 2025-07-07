import './App.css'
import { useState } from 'react';
import Login from './Login';

function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (username, password) => {
    const encoded = btoa(`${username}:${password}`);
    setAuth(encoded);
    localStorage.setItem('auth', JSON.stringify(encoded));
    window.location.reload(); // reload to re-render with auth
  };

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1 className = "welcome">Welcome to the Quote Management System</h1>
      <h2 className = "paragraph">Create customer and product before creating a quote</h2>
      <div className="create">
        <button onClick={() => window.location.href = '/createquote'}>Create Quote</button>
      </div>
      <div className="create">
        <button onClick={() => window.location.href = '/createcustomer'}>Add Customer</button>
      </div>
      <div className="create">
        <button onClick={() => window.location.href = '/createproduct'}>Add Product</button>
      </div>
    </>
  )
}

export default App
