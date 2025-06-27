import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

async function getCustomerName(customerLink) {
  try {
    const response = await fetch(customerLink);
    if (!response.ok) {
      throw new Error('Network response was not ok while fetching customer.');
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
    const response = await fetch(productsLink);
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

function ViewSingleQuote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleQuote = async () => {
      try {
        setLoading(true);
        const quoteResponse = await fetch(`http://localhost:8080/quotes/${id}`);
        if (!quoteResponse.ok) {
          throw new Error(`Quote not found. Status: ${quoteResponse.status}`);
        }
        const quoteData = await quoteResponse.json();

        let customerName = 'Unknown Customer';
        let products = [];

        if (quoteData._links) {
            const customerPromise = quoteData._links.customer 
                ? getCustomerName(quoteData._links.customer.href) 
                : Promise.resolve('Unknown Customer');
            
            const productsPromise = quoteData._links.quotesProducts 
                ? getQuoteProducts(quoteData._links.quotesProducts.href) 
                : Promise.resolve([]);

            [customerName, products] = await Promise.all([customerPromise, productsPromise]);
        }
        
        setQuote({ ...quoteData, customerName, products });

      } catch (err) {
        console.error('Error fetching single quote:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleQuote();
  }, [id]); 

  const handleSignQuote = async () => {
    if (!quote || !quote._links?.self?.href) {
        alert('Quote data is not available.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/quotes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'SIGNED' }), 
        });

        if (!response.ok) {
            throw new Error('Failed to update quote status.');
        }

        const updatedQuote = await response.json();

        setQuote(prevQuote => ({
            ...prevQuote,
            ...updatedQuote,
        }));
        
        alert('Quote has been successfully signed!');

    } catch (e) {
        console.error('Error signing quote:', e);
        alert(`Error: ${e.message}`);
    }
  };

  if (loading) {
    return <div>Loading quote details...</div>;
  }

  if (error) {
    return <div>Error: {error} <Link to="/viewquotes">Go back to quotes list.</Link></div>;
  }

  if (!quote) {
    return <div>No quote found.</div>;
  }

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>

      <h1>Quote Details (ID: {id})</h1>

      <div>
        <p><strong>Customer:</strong> {quote.customerName}</p>
        <p><strong>Status:</strong> 
          <span>
            {quote.status}
          </span>
        </p>

        {quote.products && quote.products.length > 0 && (
          <div>
            <strong>Products:</strong>
            <ul>
              {quote.products.map((product, productIdx) => (
                <li key={productIdx}>
                  {(product.productName || 'Unknown Product')} - 
                  Quantity: {product.quantity}, 
                  Price: ${Number(product.priceAtQuote).toFixed(2)} each
                </li>
              ))}
            </ul>
          </div>
        )}

        {quote.status !== 'Signed' && (
            <div>
                <h3>Customer Signature</h3>
                <p>By clicking "Sign Quote", you agree to the terms and conditions outlined in this document.</p>
                <button onClick={handleSignQuote}>
                    Sign and Accept Quote
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

export default ViewSingleQuote;