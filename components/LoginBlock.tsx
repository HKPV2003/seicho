"use client";

import React from "react";
import { useAuth } from "./AuthProvider";

export const LoginBlock: React.FC = () => {
  const { loginWithGoogle, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <section
      style={{
        maxWidth: 440,
        margin: "72px auto 40px",
        padding: "24px 22px 26px",
        borderRadius: 24,
        border: "1px solid rgba(148,163,184,0.4)",
        background:
          "radial-gradient(circle at 0 0, rgba(59,130,246,0.2), transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.24), transparent 55%), rgba(15,23,42,0.96)",
        boxShadow: "0 30px 60px rgba(15,23,42,0.85)"
      }}
    >
      <p
        style={{
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: 1.6,
          color: "rgba(148,163,184,0.9)",
          marginBottom: 6
        }}
      >
        InfoFi Campaign Hub
      </p>
      <h1 style={{ fontSize: 30, margin: "0 0 8px" }}>Welcome to SEICHO</h1>
      <p
        style={{
          margin: "0 0 20px",
          fontSize: 14,
          color: "rgba(156,163,175,0.95)"
        }}
      >
        Connect your Google account to join SEICHO campaigns, submit X posts,
        and climb the on-chain social leaderboard.
      </p>
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "11px 16px",
          borderRadius: 999,
          border: "none",
          background:
            "linear-gradient(90deg, #22c55e, #0ea5e9, #a855f7, #ec4899)",
          backgroundSize: "200% 100%",
          color: "#0b1120",
          fontWeight: 600,
          fontSize: 15,
          boxShadow: "0 12px 30px rgba(59,130,246,0.5)"
        }}
      >
        {loading ? "Checking session..." : "Continue with Google"}
      </button>
      <p
        style={{
          marginTop: 10,
          fontSize: 11,
          color: "rgba(148,163,184,0.9)"
        }}
      >
        SEICHO never posts on your behalf. We only use your account to link
        X posts and calculate rewards.
      </p>
    </section>
  );
};
