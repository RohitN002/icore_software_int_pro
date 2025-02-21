import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/auth.reducer";
import { AppDispatch, RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => navigate("/dashboard"));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full p-2 bg-green-500 text-white">
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p>
          Didn't have account ? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
