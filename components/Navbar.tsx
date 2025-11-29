"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(18px)",
        background:
          "linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.85))",
        borderBottom: "1px solid rgba(148,163,184,0.3)"
      }}
    >
      <nav
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            letterSpacing: 1.2,
            fontSize: 20
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: "999px",
              background:
                "conic-gradient(from 140deg, #22c55e, #0ea5e9, #a855f7, #f97316, #22c55e)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(56,189,248,0.6)"
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "999px",
                background: "#020617"
              }}
            />
          </span>
          <span>SEICHO</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.5)",
                background: "rgba(15,23,42,0.8)"
              }}
            >
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "999px",
                    objectFit: "cover"
                  }}
                />
              )}
              <span style={{ opacity: 0.7 }}>Logged in as</span>
              <span>{user.displayName || user.email}</span>
            </div>
          )}

          {user && (
            <button
              onClick={logout}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(248,250,252,0.2)",
                background:
                  "linear-gradient(135deg, rgba(148,163,184,0.3), rgba(15,23,42,0.95))",
                color: "#e5e7eb",
                fontSize: 13
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
