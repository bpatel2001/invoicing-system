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
    </div>
  );
}

export default ViewProducts;
