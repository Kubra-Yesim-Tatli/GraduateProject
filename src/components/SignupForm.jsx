import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRolesIfNeeded } from "../Redux/Action/clientThunk";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux state'ten roles verisini alıyoruz
  const roles = useSelector((state) => state.client.roles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  useEffect(() => {
    dispatch(fetchRolesIfNeeded()); // Roles verisini alıyoruz
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
      await axios.post("https://workintech-fe-ecommerce.onrender.com/signup", postData);
      alert("You need to click the link in the email to activate your account!");
      history.goBack();
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading veya hata durumlarını kontrol ediyoruz
  if (roles === undefined) {
    return <div>Loading roles...</div>;
  }

  if (roles === null) {
    return <div>Error loading roles.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          className="border px-3 py-2 w-full"
        />
        {errors.name && <span className="text-red-500">Name is required (min 3 chars).</span>}
      </div>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.email && <span className="text-red-500">Valid email is required.</span>}
      </div>
      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.password && (
          <span className="text-red-500">
            Password must be at least 8 characters with numbers, upper, lower case, and special chars.
          </span>
        )}
      </div>
      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Confirm Password</label>
        <input
          type="password"
          {...register("confirm_password", {
            required: true,
            validate: (value) => value === password,
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.confirm_password && <span className="text-red-500">Passwords do not match.</span>}
      </div>
      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-2">Role</label>
        <select
          {...register("role_id", { required: true })}
          className="border px-3 py-2 w-full"
        >
          {Array.isArray(roles) && roles.length > 0 ? (
            roles.map((role) => (
              <option key={role.id} value={role.code}>
                {role.name}
              </option>
            ))
          ) : (
            <option disabled>No roles available</option>
          )}
        </select>
        {errors.role_id && <span className="text-red-500">Role is required.</span>}
      </div>
      {/* Store Fields */}
      {watch("role_id") === "store" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Store Name</label>
            <input
              {...register("store_name", { required: true, minLength: 3 })}
              className="border px-3 py-2 w-full"
            />
            {errors.store_name && (
              <span className="text-red-500">Store name must be at least 3 characters long.</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register("store_phone", {
                required: true,
                pattern: /^(05)([0-9]{9})$/,
              })}
              className="border px-3 py-2 w-full"
            />
            {errors.store_phone && (
              <span className="text-red-500">Enter a valid Türkiye phone number (e.g., 05XXXXXXXXX).</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tax ID</label>
            <input
              {...register("store_tax_no", {
                required: true,
                pattern: /^T\d{4}V\d{6}$/,
              })}
              className="border px-3 py-2 w-full"
            />
            {errors.store_tax_no && (
              <span className="text-red-500">Tax ID must follow the pattern "TXXXXVXXXXXX".</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bank Account (IBAN)</label>
            <input
              {...register("store_bank_account", {
                required: true,
                pattern: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
              })}
              className="border px-3 py-2 w-full"
            />
            {errors.store_bank_account && (
              <span className="text-red-500">Enter a valid IBAN address (e.g., TRXX...).</span>
            )}
          </div>
        </>
      )}
      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-4"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
