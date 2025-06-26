import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
