"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./AuthProvider";
import { LoginBlock } from "./LoginBlock";

export type Project = {
  id: string;
  title: string;
  description?: string;
  active: boolean;
};

export const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), where("active", "==", true));
        const snapshot = await getDocs(q);
        const list: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">)
        }));
        setProjects(list);
      } catch (err) {
        console.error(err);
        alert("Error loading projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (!user) {
    return <LoginBlock />;
  }

  if (loading) {
    return <div style={{ padding: 24 }}>Loading campaigns...</div>;
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24
        }}
      >
        <h2 style={{ fontSize: 26, margin: 0 }}>Live InfoFi Campaigns</h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "rgba(148,163,184,0.95)",
            maxWidth: 560
          }}
        >
          Complete tasks, submit X posts, and earn points. Leaderboards refresh
          in real-time as admins validate submissions.
        </p>
      </section>

      <div
        style={{
          marginTop: 4,
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
        }}
      >
        {projects.map((p, index) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            style={{
              position: "relative",
              borderRadius: 20,
              padding: 18,
              border: "1px solid rgba(148,163,184,0.45)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(6,78,59,0.92))",
              overflow: "hidden",
              boxShadow:
                index === 0
                  ? "0 24px 60px rgba(34,197,94,0.45)"
                  : "0 16px 40px rgba(15,23,42,0.85)"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle at 0 0, rgba(34,197,94,0.25), transparent 55%)"
              }}
            />
            <div style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1.6,
                  color: "rgba(187,247,208,0.9)",
                  marginBottom: 6
                }}
              >
                Campaign #{index + 1}
              </p>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 18
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 13,
                  color: "rgba(226,232,240,0.9)",
                  minHeight: 40
                }}
              >
                {p.description?.slice(0, 150) ?? "No description provided."}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.5)"
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#22c55e"
                  }}
                />
                View tasks & leaderboard
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
