import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
    
      if (!email) {
        setErrors({ email: "Email is required" });
        return;
      }
      if (!password) {
        setErrors({ password: "Password is required" });
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        await login({ email, password });
        toast.success("Logged in successfully!");
        navigate("/");
      } catch (error) {
        setErrors({ form: error.message || "Login failed" });
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <div className='h-screen w-full hero-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
          <Link to={"/"}>
            <img src='/VibeSpace-logo.png' alt='VibeSpace logo' className='w-52' />
          </Link>
        </header>
         
        <div className='flex justify-center items-center mt-20 mx-3'>
          <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
            <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

            {errors.form && (
              <div className="p-2 text-center text-red-400 text-sm">
                {errors.form}
              </div>
            )}

            <form className='space-y-4' onSubmit={handleLogin}>
              <div>
                <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                  Email:
                </label>
                <input
                  type='email'
                  id='email'
                  className={`w-full px-3 py-2 mt-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                  Password:
                </label>
                <input
                  type='password'
                  id='password'
                  className={`w-full px-3 py-2 mt-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder='************'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md hover:bg-red-700 ${
                  isLoading ? 'bg-red-700 opacity-70 cursor-not-allowed' : 'bg-red-600'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className='text-center text-gray-400'>
              Don't have an account? {" "}
              <Link to={"/signup"} className='text-red-500 hover:underline'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;