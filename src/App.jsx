import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer.jsx';

import LoadingOverlay from './components/LoadingOverlay';
import { useAuth } from './store/useAuth';



export default function App() {
  const location = useLocation();
  const [transitionKey, setTransitionKey] = useState(location.pathname);
  const [loading, setLoading] = useState(false);
  const init = useAuth((s) => s.init);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setTransitionKey(location.pathname);
      setLoading(false);
    }, 250);
    return () => clearTimeout(id);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <div key={transitionKey} className="page page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <LoadingOverlay show={loading} />
    </div>
  );
}

