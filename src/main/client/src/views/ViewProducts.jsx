import { useState, useEffect } from 'react';

function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        if (data && data._embedded && Array.isArray(data._embedded.productses)) {
          setProducts(data._embedded.productses);
        } else {
          setProducts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, []);

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>View Products</h1>
      <ul>
        {products.map((product, idx) => {
          const id = product.id || (product._links && product._links.self
            ? product._links.self.href.split('/').pop()
            : idx);
          return (
            <li key={id}>
              ID: {id} | Name: {product.name} | Price: {product.price}
            </li>
          );
        })}
      </ul>
      <div className = "create">
        <button onClick={() => window.location.href = '/createproduct'}>Create Product</button>
      </div> 
    </div>
  );
}

export default ViewProducts;
