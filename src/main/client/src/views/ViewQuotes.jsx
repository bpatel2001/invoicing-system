import { useState, useEffect } from 'react';

// Helper function for fetching the customer name
async function getCustomerName(customerLink) {
  try {
    const response = await fetch(customerLink);
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

// *** 1. NEW Helper function for fetching the products of a quote ***
async function getQuoteProducts(productsLink) {
  try {
    const response = await fetch(productsLink);
    if (!response.ok) {
      throw new Error('Network response was not ok for products');
    }
    const data = await response.json();
    // The products are in the _embedded.quotesProductses array
    if (data && data._embedded && Array.isArray(data._embedded.quotesProductses)) {
      return data._embedded.quotesProductses;
    }
    return []; // Return an empty array if no products are found
  } catch (error) {
    console.error('Error fetching quote products:', error);
    return []; // Return an empty array on error
  }
}

function ViewQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/quotes')
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
      const res = await fetch(quoteUrl, { method: 'DELETE' });
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
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>View Quotes</h1>
      <ul>
        {quotes.map((quote, idx) => {
          const quoteId = quote._links?.self?.href || idx;
          return (
            <li key={quoteId}>
              <strong>Customer:</strong> {quote.customerName} | <strong>Quote ID:</strong> {quote._links.self.href.split('/').pop()} | <strong>Status:</strong> {quote.status}
              <button
                style={{ marginLeft: '10px', color: 'red' }}
                onClick={() => handleDeleteQuote(quote)}
              >
                Delete
              </button>
              {quote.products && quote.products.length > 0 && (
                <div style={{ marginLeft: '20px', marginTop: '10px' }}>
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