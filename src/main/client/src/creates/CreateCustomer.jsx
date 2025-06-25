import { useState, useEffect } from 'react';

async function createCustomer(customerName, customerAddress) {
  try {
    const response = await fetch('http://localhost:8080/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: customerName,
        address: customerAddress
      })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error; 
  }
}

function CreateCustomer() {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCustomer = await createCustomer(customerName, customerAddress);
      alert(`Customer created successfully: ${newCustomer.name}`);
      setCustomerName('');
      setCustomerAddress('');
      window.location.href = '/viewcustomers'; 
    } catch (error) {
      alert('Failed to create customer. Please try again.');
    }
  }

  return (
    <div>
      <div className="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/viewquotes'}>View Quotes</button>
        <button onClick={() => window.location.href = '/viewproducts'}>View Products</button>
        <button onClick={() => window.location.href = '/viewcustomers'}>View Customers</button>
      </div>
      <h1>Create Customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
}

export default CreateCustomer;
