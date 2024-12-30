import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRolesIfNeeded } from "../Redux/Action/clientThunk";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const roles = [
    { id: "customer", name: "Customer" },
    { id: "store", name: "Store" },
    { id: "admin", name: "Admin" }
  ];
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  useEffect(() => {
    dispatch(fetchRolesIfNeeded());
  }, [dispatch]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let postData;
    if (data.role_id === "store") {
      postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        store: {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_no,
          bank_account: data.store_bank_account,
        },
      };
    } else {
      postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };
    }

    try {
      const response = await axios.post("https://workintech-fe-ecommerce.onrender.com/signup", postData);
      toast.success("Account created successfully! Please check your email to activate your account.");
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "An error occurred during signup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            {...register("name", { 
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters"
              }
            })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account Type</label>
          <select 
            {...register("role_id", { 
              required: "Please select an account type" 
            })} 
            className="border px-3 py-2 w-full rounded"
          >
            <option value="">Select...</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-red-500">{errors.role_id.message}</span>
          )}
        </div>

        {/* Store Fields (Conditional) */}
        {watch("role_id") === "store" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input
                {...register("store_name", { 
                  required: "Store name is required" 
                })}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.store_name && (
                <span className="text-red-500">{errors.store_name.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Phone</label>
              <input
                {...register("store_phone", { 
                  required: "Store phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid phone number"
                  }
                })}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.store_phone && (
                <span className="text-red-500">{errors.store_phone.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Number</label>
              <input
                {...register("store_tax_no", { 
                  required: "Tax number is required" 
                })}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.store_tax_no && (
                <span className="text-red-500">{errors.store_tax_no.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bank Account</label>
              <input
                {...register("store_bank_account", { 
                  required: "Bank account is required" 
                })}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.store_bank_account && (
                <span className="text-red-500">{errors.store_bank_account.message}</span>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full mt-6 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignupForm;
