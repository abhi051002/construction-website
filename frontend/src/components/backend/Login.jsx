import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();

      if (result && result.success) {
        const userInfo = {
          id: result.id,
          token: result.token,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        login(userInfo);

        toast.success("Login successful!");

        // Now navigate
        navigate("/admin/dashboard");
      } else {
        toast.error(
          result?.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="container my-5 d-flex justify-content-center">
        <div className="login-form my-5 w-100" style={{ maxWidth: "450px" }}>
          <div className="card border-0 shadow">
            <div className="card-body py-4 px-4">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="text-center mb-4">
                  <h4>Login Here</h4>
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-light">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-light">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
