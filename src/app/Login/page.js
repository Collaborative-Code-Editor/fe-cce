"use client";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black/30">
      <div className="p-8 bg-black/80 text-white shadow-lg rounded-2xl border border-blue-400/30 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/60 border border-blue-400/30 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/60 border border-blue-400/30 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-black p-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">or continue with</p>
        <div className="flex justify-center mt-4 gap-4">
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-300">
            Google
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-300">
            GitHub
          </button>
        </div>
        <p className="mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/Signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;