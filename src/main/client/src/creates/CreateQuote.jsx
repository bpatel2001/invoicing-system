import { useState, useEffect } from 'react';

function CreateQuote() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [quoteItems, setQuoteItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/customers')
      .then(response => response.json())
      .then(data => {
        if (data && data._embedded && Array.isArray(data._embedded.customerses)) {
          setCustomers(data._embedded.customerses);
        }
      })
      .catch(error => console.error('Error fetching customers:', error));

    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        if (data && data._embedded && Array.isArray(data._embedded.productses)) {
          setProducts(data._embedded.productses);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []); 

  const handleAddProduct = () => {
    const productId = document.getElementById('product-select').value;
    const quantity = parseInt(document.getElementById('quantity-input').value, 10);

    if (!productId || !quantity || quantity < 1) {
      setMessage('Please select a product and enter a valid quantity.');
      return;
    }

    const productToAdd = products.find(p => p._links.self.href.split('/').pop() == productId);
    const existingItemIndex = quoteItems.findIndex(item => item.product._links.self.href === productToAdd._links.self.href);

    if (existingItemIndex > -1) {
        const updatedItems = [...quoteItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setQuoteItems(updatedItems);
    } else {
        setQuoteItems([...quoteItems, { product: productToAdd, quantity: quantity }]);
    }
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomerId || quoteItems.length === 0) {
      setMessage('Error: You must select a customer and add at least one product.');
      return;
    }
    
    setIsLoading(true);
    setMessage('Creating quote...');

    try {
      const quoteResponse = await fetch('http://localhost:8080/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: `/${selectedCustomerId}`,
          status: 'NOT_SIGNED',
          totalCost: quoteItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
        })
      });

      if (!quoteResponse.ok) throw new Error('Failed to create the quote.');

      const newQuote = await quoteResponse.json();
      const selfHref = newQuote._links?.self?.href;
      const newQuoteId = selfHref ? selfHref.split('/').pop() : undefined;
      
      for (const item of quoteItems) {
        const productId = item.product._links.self.href.split('/').pop();
        const productResponse = await fetch('http://localhost:8080/api/quotesproducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quoteId: newQuoteId,
                productId: parseInt(productId, 10),
                quantity: item.quantity,
                priceAtQuote: item.product.price 
            })
        });

        if (!productResponse.ok) {
            throw new Error(`Failed to add product ${item.product.name} to the quote.`);
        }
      }
      setMessage(`Success! Quote #${newQuoteId} created successfully.`);
      setSelectedCustomerId('');
      setQuoteItems([]);

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>Create a New Quote</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer-select"><strong>1. Select a Customer:</strong></label>
          <select 
            id="customer-select" 
            value={selectedCustomerId} 
            onChange={e => setSelectedCustomerId(e.target.value)}
            required
          >
            <option value="">-- Choose a Customer --</option>
            {customers.map(customer => (
              <option key={customer._links.self.href} value={customer._links.self.href.split('/').pop()}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '20px' }}>
            <label><strong>2. Add Products to Quote:</strong></label>
            <div>
                <select id="product-select" defaultValue="">
                    <option value="">-- Choose a Product --</option>
                    {products.map(product => (
                        <option key={product._links.self.href} value={product._links.self.href.split('/').pop()}>
                            {product.name} - ${product.price.toFixed(2)}
                        </option>
                    ))}
                </select>
                <input id="quantity-input" type="number" min="1" defaultValue="1" style={{ marginLeft: '10px', width: '60px' }} />
                <button type="button" onClick={handleAddProduct} style={{ marginLeft: '10px' }}>Add Product</button>
            </div>
        </div>

        {quoteItems.length > 0 && (
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Current Quote Items:</h3>
                <ul>
                    {quoteItems.map((item, index) => (
                        <li key={index}>
                            {item.product.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
                <h4>Total: ${quoteItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</h4>
            </div>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Final Quote'}
          </button>
        </div>
      </form>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default CreateQuote;
