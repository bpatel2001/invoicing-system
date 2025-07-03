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
              <span><strong>Customer ID:</strong> {id} | <strong>Name:</strong> {customer.name} | <strong>Email:</strong> {customer.email} | <strong>Address:</strong> {customer.address}</span>
              <button
                onClick={() => handleDeleteCustomer(customer)}
                style={{ width: 'auto', minWidth: '70px', marginLeft: '12px', padding: '6px 12px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Delete
              </button>
              {customer.quotes && customer.quotes.length > 0 && (
                <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                  <strong>Quotes assigned:</strong>
                  <ul style={{ margin: '8px 0 0 16px', padding: 0, listStyle: 'none' }}>
                    {customer.quotes.map((quote, qidx) => {
                      const qid = quote.id || (quote._links && quote._links.self
                        ? quote._links.self.href.split('/').pop()
                        : qidx);
                      const isSigned = quote.status === 'SIGNED';
                      return (
                        <li key={qid} style={{ marginBottom: 4 }}>
                          <span><strong>Quote #:</strong> {qid} </span>
                          <span style={{ color: isSigned ? 'green' : 'red', fontWeight: 600, marginLeft: 8 }}>
                            {isSigned ? 'Signed' : 'Unsigned'}
                          </span>
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
        <button onClick={() => window.location.href = '/createcustomer'}>Create Customer</button>
      </div> 
    </div>
  );
}

export default ViewCustomers;