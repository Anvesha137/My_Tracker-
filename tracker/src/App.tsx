import { useState, useEffect } from 'react';
import Tracker from './Tracker';
import Auth from './Auth';
import './App.css';

function App() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('tracker_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
    localStorage.setItem('tracker_current_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tracker_current_user');
  };

  if (loading) return null;

  return (
    <div className="App">
      {user ? (
        <Tracker user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
