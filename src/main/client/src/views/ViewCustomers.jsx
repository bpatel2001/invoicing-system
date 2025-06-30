import { useState, useEffect } from 'react';
import { apiFetch } from '../api'; 

async function fetchCustomerQuotes(quotesUrl) {
  try {
    const res = await apiFetch(quotesUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data._embedded && Array.isArray(data._embedded.quoteses)) {
        return data._embedded.quoteses;
      }
    }
  } catch (e) {
  }
  return [];
}

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    apiFetch('/customers')
      .then(response => response.json())
      .then(async data => {
        if (data && data._embedded && Array.isArray(data._embedded.customerses)) {
          const customersWithQuotes = await Promise.all(
            data._embedded.customerses.map(async (customer) => {
              let quotes = [];
              if (customer._links && customer._links.quotes) {
                quotes = await fetchCustomerQuotes(customer._links.quotes.href);
              }
              return { ...customer, quotes };
            })
          );
          setCustomers(customersWithQuotes);
        } else {
          setCustomers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setCustomers([]);
      });
  }, []);

  const handleDeleteCustomer = async (customer) => {
    const customerUrl = customer._links?.self?.href;
    if (!customerUrl) return;
    if (!window.confirm(`Delete customer "${customer.name}"?`)) return;
    try {
      const res = await apiFetch(customerUrl, { method: 'DELETE' });
      if (res.ok) {
        setCustomers(customers.filter(c => c._links.self.href !== customerUrl));
      } else {
        alert('Failed to delete customer.');
      }
    } catch (e) {
      alert('Error deleting customer.');
    }
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>View Customers</h1>
      <ul>
        {customers.map((customer, idx) => {
          const id = customer.id || (customer._links && customer._links.self
            ? customer._links.self.href.split('/').pop()
            : idx);
          return (
            <li className="idk" key={id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
              <span>ID: {id} | Name: {customer.name} | Address: {customer.address}</span>
              <button
                onClick={() => handleDeleteCustomer(customer)}
                style={{ width: 'auto', minWidth: '70px', marginLeft: '12px', padding: '6px 12px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Delete
              </button>
              {customer.quotes && customer.quotes.length > 0 && (
                <ul style={{ gridColumn: '1 / -1' }}>
                  {customer.quotes.map((quote, qidx) => {
                    const qid = quote.id || (quote._links && quote._links.self
                      ? quote._links.self.href.split('/').pop()
                      : qidx);
                    return (
                      <li className = "idk2" key={qid}>
                        Quote ID: {qid} | Status: {quote.status} | Total Cost: {quote.totalCost}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className = "create">
        <button onClick={() => window.location.href = '/createcustomer'}>Create Customer</button>
      </div> 
    </div>
  );
}

export default ViewCustomers;