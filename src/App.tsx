import { useState } from 'react';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <MainLayout onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}
