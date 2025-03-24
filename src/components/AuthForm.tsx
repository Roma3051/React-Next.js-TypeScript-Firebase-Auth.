"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation"; 
import "../styles/globals.css";

interface AuthFormProps {
  isRegister: boolean;
}

const AuthForm = ({ isRegister }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password should be at least 6 characters long");
        return;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          "Password must contain at least one uppercase letter and one digit"
        );
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Registration successful!");
        router.push("/home");
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Login successful!");
        router.push("/home");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-gradient-to-r from-[#925bc5] to-[#ba4f4f] rounded-lg shadow-lg">
      {isForgotPassword ? (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>

          {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

          {success && (
            <div className="mt-4 text-green-600 text-sm">{success}</div>
          )}

          <button
            type="button"
            className="text-#000000-600 mt-4 block w-full text-center"
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isRegister && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

          {success && (
            <div className="mt-4 text-green-600 text-sm">{success}</div>
          )}

          {!isRegister && (
            <button
              type="button"
              className="text-#000000-600 block w-full text-center mt-2"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </button>
          )}

          {isRegister ? (
            <button
              type="button"
              className="text-#000000-600 block w-full text-center mt-2"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </button>
          ) : (
            <button
              type="button"
              className="text-#000000-600 block w-full text-center mt-2"
              onClick={() => router.push("/register")}
            >
              Don't have an account? Register
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
