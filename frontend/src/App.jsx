import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from 'lucide-react';
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck().catch(error => {
      console.error("Auth check failed:", error);
    });
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10'/>
        </div>
      </div>
    )
  }

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>;
  }

  return (
    <>
      <Routes >
        <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/watch/:id' element={ user ? <WatchPage /> : <Navigate to="/login" />} />
        <Route path='/search' element={ user ? <SearchPage /> : <Navigate to="/login" />} />
      </Routes>
      
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;