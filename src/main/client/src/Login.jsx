import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Try a test fetch to verify credentials
      const encoded = btoa(`${username}:${password}`);
      const res = await fetch('/customers', {
        headers: { 'Authorization': `Basic ${encoded}` }
      });
      if (res.status === 401) {
        setError('Invalid credentials');
        return;
      }
      onLogin(username, password);
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8, background: '#fff' }}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" style={{ width: '100%', marginBottom: 12, padding: 8 }} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', marginBottom: 12, padding: 8 }} />
      <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </form>
  );
}

export default Login;
