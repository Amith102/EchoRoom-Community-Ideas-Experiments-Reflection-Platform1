"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const demoAccounts = [
  
  { role: "User", email: "user@echoroom.dev", password: "user123" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with actual backend authentication endpoint
      // For now, validate against demo accounts
      const account = demoAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (account) {
        // Store user info in localStorage (replace with proper auth later)
        localStorage.setItem("user", JSON.stringify({ email, role: account.role }));
        router.push("/ideas");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Access EchoRoom to explore ideas and experiments
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-3 mb-4 text-sm border border-red-200 dark:border-red-800">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-900 dark:text-white mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900 dark:text-white mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Demo Accounts:
            </p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <div key={acc.email} className="text-xs">
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-white">{acc.role}:</span>{" "}
                    {acc.email} / {acc.password}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Join the community
            </Link>
          </p>

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
