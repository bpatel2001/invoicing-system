import { useState, useEffect } from 'react';

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

function ViewQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/quotes')
      .then(response => response.json())
      .then(async data => {
        if (data && data._embedded && Array.isArray(data._embedded.quoteses)) {
          const quotesWithCustomer = await Promise.all(
            data._embedded.quoteses.map(async (quote) => {
              let customerName = 'Unknown Customer';
              if (quote._links && quote._links.customer) {
                customerName = await getCustomerName(quote._links.customer.href);
              }
              return { ...quote, customerName };
            })
          );
          setQuotes(quotesWithCustomer);
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
      <h1>View Quotes</h1>
      <ul>
        {quotes.map((quote, idx) => {
          const id = quote.id || (quote._links && quote._links.self
            ? quote._links.self.href.split('/').pop()
            : idx);
          return (
            <li key={id}>
              Customer: {quote.customerName} | Quote ID: {id} | Status: {quote.status} | Total Cost: {quote.totalCost}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ViewQuotes;
