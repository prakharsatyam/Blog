import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import CustomCursor from './components/Portfolio/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen relative cursor-none md:cursor-auto">
      <CustomCursor />
      <main>
        <Outlet />
      </main>
    </div>
  ) : null;
}

export default App;
