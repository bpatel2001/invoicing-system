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
              let products = []; // Default to an empty array

              // *** 2. Fetch BOTH customer and products concurrently ***
              if (quote._links) {
                if (quote._links.customer) {
                  customerName = await getCustomerName(quote._links.customer.href);
                }
                if (quote._links.quotesProducts) {
                  products = await getQuoteProducts(quote._links.quotesProducts.href);
                }
              }
              
              // Return the quote object enriched with the new details
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

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>View Quotes</h1>
      <ul>
        {quotes.map((quote, idx) => {
          // Use a stable key for the quote list item
          const quoteId = quote._links?.self?.href || idx;
          return (
            <li key={quoteId}>
              <strong>Customer:</strong> {quote.customerName} | <strong>Quote ID:</strong> {quote._links.self.href.split('/').pop()} | <strong>Status:</strong> {quote.status}
              
              {/* *** 3. Render the list of products for this quote *** */}
              {quote.products && quote.products.length > 0 && (
                <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                  <strong>Products:</strong>
                  <ul>
                    {quote.products.map((product, productIdx) => (
                      <li key={productIdx}>
                        {product.productName || 'Unknown Product'} - 
                        Quantity: {product.quantity}, 
                        Price: ${product.priceAtQuote.toFixed(2)} each
                      </li>
                    ))}
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