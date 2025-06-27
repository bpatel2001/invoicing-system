import { useState, useEffect } from 'react';
import '../AppStyles.css';

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

  const handleDeleteProduct = async (product) => {
    const productUrl = product._links?.self?.href;
    if (!productUrl) return;
    if (!window.confirm(`Delete product "${product.name}"?`)) return;
    try {
      const res = await fetch(productUrl, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p._links.self.href !== productUrl));
      } else {
        alert('Failed to delete product.');
      }
    } catch (e) {
      alert('Error deleting product.');
    }
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
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
            <li className="idk" key={id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
              <span><strong>ID:</strong> {id} | <strong>Name:</strong> {product.name} | <strong>Price:</strong> ${Number(product.price).toFixed(2)}</span>
              <button className="delete-button small-btn"
                onClick={() => handleDeleteProduct(product)}
                style={{ width: 'auto', minWidth: '70px', marginLeft: '12px', padding: '6px 12px' }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <div className="create">
        <button onClick={() => window.location.href = '/createproduct'}>Create Product</button>
      </div> 
    </div>
  );
}

export default ViewProducts;
