import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"; // Controller artık ihtiyacınız yok, direkt useForm kullanabilirsiniz
import { useHistory } from "react-router-dom"; // useHistory import

// Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignUpPage = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("1"); // Default role is Customer
  const history = useHistory(); // useHistory hook'u

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Watch for role changes
  const role_id = watch("role_id");

  const onSubmit = async (data) => {
    // If Store role is selected, include store-specific fields
    if (role_id === "store") {
      data.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account,
      };
      delete data.store_name;
      delete data.store_phone;
      delete data.store_tax_no;
      delete data.store_bank_account;
    }

    try {
      await api.post("/signup", data);
      alert("You need to click the link in the email to activate your account!");
      history.goBack(); // Go to the previous page using history
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please check your input and try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
            className={`w-full border px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
            className={`w-full border px-3 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message: "Password must include upper, lower, number, and special character",
              },
            })}
            className={`w-full border px-3 py-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Password Validation */}
        <div>
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("password_confirmation", {
              required: "Password confirmation is required",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            className={`w-full border px-3 py-2 ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium">Role</label>
          <select
            {...register("role_id")}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border px-3 py-2"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {/* Store-Specific Fields */}
        {selectedRole === "store" && (
          <>
            {/* Store Name */}
            <div>
              <label className="block font-medium">Store Name</label>
              <input
                type="text"
                {...register("store_name", { required: "Store name is required", minLength: { value: 3, message: "Store name must be at least 3 characters" } })}
                className={`w-full border px-3 py-2 ${errors.store_name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.store_name && <p className="text-red-500 text-sm">{errors.store_name.message}</p>}
            </div>

            {/* Store Phone */}
            <div>
              <label className="block font-medium">Store Phone</label>
              <input
                type="tel"
                {...register("store_phone", { required: "Store phone is required", pattern: { value: /^\+?90\d{10}$/, message: "Invalid Turkish phone number" } })}
                className={`w-full border px-3 py-2 ${errors.store_phone ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.store_phone && <p className="text-red-500 text-sm">{errors.store_phone.message}</p>}
            </div>

            {/* Store Tax ID */}
            <div>
              <label className="block font-medium">Tax ID</label>
              <input
                type="text"
                {...register("store_tax_no", { required: "Tax ID is required", pattern: { value: /^T\d{4}V\d{6}$/, message: "Invalid Tax ID format" } })}
                className={`w-full border px-3 py-2 ${errors.store_tax_no ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.store_tax_no && <p className="text-red-500 text-sm">{errors.store_tax_no.message}</p>}
            </div>

            {/* Store Bank Account */}
            <div>
              <label className="block font-medium">Bank Account</label>
              <input
                type="text"
                {...register("store_bank_account", { required: "Bank account is required", pattern: { value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, message: "Invalid IBAN format" } })}
                className={`w-full border px-3 py-2 ${errors.store_bank_account ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.store_bank_account && <p className="text-red-500 text-sm">{errors.store_bank_account.message}</p>}
            </div>
          </>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
