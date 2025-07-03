import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';

async function getCustomerName(customerLink) {
  try {
    const response = await apiFetch(customerLink);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const customer = await response.json();
    return customer.name || 'Unknown Customer';
  } catch (error) {
    console.error('Error fetching customer name:', error);
    return 'Unknown Customer';
  }
}

async function getQuoteProducts(productsLink) {
  try {
    const response = await apiFetch(productsLink);
    if (!response.ok) {
      throw new Error('Network response was not ok for products');
    }
    const data = await response.json();
    if (data && data._embedded && Array.isArray(data._embedded.quotesProductses)) {
      return data._embedded.quotesProductses;
    }
    return []; 
  } catch (error) {
    console.error('Error fetching quote products:', error);
    return []; 
  }
}

function ViewQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    apiFetch('/quotes')
      .then(response => response.json())
      .then(async data => {
        if (data && data._embedded && Array.isArray(data._embedded.quoteses)) {
          const quotesWithDetails = await Promise.all(
            data._embedded.quoteses.map(async (quote) => {
              let customerName = 'Unknown Customer';
              let products = []; 

              if (quote._links) {
                if (quote._links.customer) {
                  customerName = await getCustomerName(quote._links.customer.href);
                }
                if (quote._links.quotesProducts) {
                  products = await getQuoteProducts(quote._links.quotesProducts.href);
                }
              }
              
              return { ...quote, customerName, products };
            })
          );
          setQuotes(quotesWithDetails);
        } else {
          setQuotes([]);
        }
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
        setQuotes([]);
      });
  }, []);

  const handleDeleteQuote = async (quote) => {
    const quoteUrl = quote._links?.self?.href;
    if (!quoteUrl) return;
    if (!window.confirm(`Delete quote #${quote._links.self.href.split('/').pop()}?`)) return;
    try {
      const res = await apiFetch(quoteUrl, { method: 'DELETE' });
      if (res.ok) {
        setQuotes(quotes.filter(q => q._links.self.href !== quoteUrl));
      } else {
        alert('Failed to delete quote.');
      }
    } catch (e) {
      alert('Error deleting quote.');
    }
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1 className = "welcome">Welcome to the Quote Management System</h1>
      <h2 className = "paragraph">Create customer and product before creating a quote</h2>
      <ul>
        {quotes.map((quote, idx) => {
          const quoteId = quote._links?.self?.href || idx;
          return (
            <li className="idk" key={quoteId} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <strong>Customer:</strong> {quote.customerName} | <strong>Quote #:</strong> {quote._links.self.href.split('/').pop()} | <strong>Status:</strong>
                <span style={{ color: quote.status === 'NOT_SIGNED' ? 'red' : quote.status === 'SIGNED' ? 'green' : 'black', fontWeight: 'bold', marginLeft: 4, marginRight: 8 }}>
                  {quote.status === 'NOT_SIGNED' ? 'Unsigned' : quote.status === 'SIGNED' ? 'Signed' : quote.status}
                </span>
                <Link to={`/viewquotes/${quote._links.self.href.split('/').pop()}`} style={{ marginLeft: 8 }}>
                  Go to Quote
                </Link>
              </div>
              <button className="delete-button small-btn"
                onClick={() => handleDeleteQuote(quote)}
                style={{ width: 'auto', minWidth: '70px', marginLeft: '12px', padding: '6px 12px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Delete
              </button>
              {quote.products && quote.products.length > 0 && (
                <div className = "idk2" style={{ gridColumn: '1 / -1' }}>
                  <strong>Products:</strong>
                  <ul>
                    {quote.products.map((product, productIdx) => {
                      return (
                        <li key={productIdx}>
                          {(product.productName || product.name || product.product?.name || 'Unknown Product')} - 
                          Quantity: {product.quantity}, 
                          Price: ${Number(product.priceAtQuote).toFixed(2)} each
                        </li>
                      );
                    })}
                  </ul>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>
                    Total Cost: ${quote.products.reduce((sum, p) => sum + (Number(p.priceAtQuote) * Number(p.quantity)), 0).toFixed(2)}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className = "create">
        <button onClick={() => window.location.href = '/createquote'}>Create Quote</button>
      </div>      
    </div>
  );
}

export default ViewQuotes;
