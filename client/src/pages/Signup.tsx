import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { signupUser } from "../redux/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser(formData));
    // .then((res) => {
    //   if (res.meta.requestStatus === "fulfilled") {
    //     navigate("/login");
    //   }
    // });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 w-full rounded-md"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 w-full rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
