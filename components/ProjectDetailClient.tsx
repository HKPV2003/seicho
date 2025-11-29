"use client";

import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./AuthProvider";
import type { Project } from "./ProjectsPage";
import { LoginBlock } from "./LoginBlock";

type Submission = {
  id: string;
  userId: string;
  userName: string;
  tweetUrl: string;
  points: number;
};

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tweetUrl, setTweetUrl] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", projectId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProject({ id: snap.id, ...(snap.data() as Omit<Project, "id">) });
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error(err);
        alert("Error loading project");
      } finally {
        setLoadingProject(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const fetchSubmissions = async () => {
    try {
      const subsRef = collection(db, "projects", projectId, "submissions");
      const q = query(
        subsRef,
        orderBy("points", "desc"),
        orderBy("createdAt", "asc")
      );
      const snap = await getDocs(q);
      const list: Submission[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Submission, "id">)
      }));
      setSubmissions(list);
    } catch (err) {
      console.error(err);
      alert("Error loading leaderboard");
    } finally {
      setLoadingSubs(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!tweetUrl.trim()) {
      alert("Please paste your X/Twitter post link");
      return;
    }

    setSubmitting(true);
    try {
      const subsRef = collection(db, "projects", projectId, "submissions");
      await addDoc(subsRef, {
        userId: user.uid,
        userName: user.displayName || user.email,
        tweetUrl: tweetUrl.trim(),
        points: 0,
        createdAt: serverTimestamp()
      });

      setTweetUrl("");
      await fetchSubmissions();
      alert("Submission saved! Admin will update points.");
    } catch (err) {
      console.error(err);
      alert("Error submitting link");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <LoginBlock />;
  }

  if (loadingProject) {
    return <div style={{ padding: 24 }}>Loading project...</div>;
  }

  if (!project) {
    return <div style={{ padding: 24 }}>Project not found.</div>;
  }

  return (
    <div style={{ paddingTop: 24, display: "grid", gap: 24 }}>
      <section
        style={{
          borderRadius: 24,
          padding: 20,
          border: "1px solid rgba(148,163,184,0.45)",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.14), transparent 55%), rgba(15,23,42,0.97)"
        }}
      >
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1.6,
            color: "rgba(148,163,184,0.9)",
            marginBottom: 4
          }}
        >
          Campaign Overview
        </p>
        <h2 style={{ fontSize: 24, margin: "0 0 10px" }}>{project.title}</h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "rgba(209,213,219,0.95)",
            maxWidth: 680
          }}
        >
          {project.description}
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.4fr)"
        }}
      >
        <div
          style={{
            borderRadius: 22,
            padding: 18,
            border: "1px solid rgba(148,163,184,0.4)",
            background:
              "radial-gradient(circle at bottom right, rgba(16,185,129,0.22), transparent 55%), rgba(15,23,42,0.98)"
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 16 }}>
            Submit your X post
          </h3>
          <p
            style={{
              marginTop: 0,
              marginBottom: 10,
              fontSize: 13,
              color: "rgba(148,163,184,0.95)"
            }}
          >
            Publish your campaign post on X, then paste the public URL below.
            SEICHO mods will review and assign points based on quality and
            requirements.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="https://x.com/your-handle/status/123456789"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              style={{
                width: "100%",
                padding: 9,
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.7)",
                background: "#020617",
                color: "#f9fafb",
                fontSize: 13,
                marginBottom: 10
              }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "9px 14px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(90deg, #22c55e, #0ea5e9, #a855f7)",
                color: "#020617",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              {submitting ? "Submitting..." : "Submit X post link"}
            </button>
          </form>
          <p
            style={{
              marginTop: 8,
              fontSize: 11,
              color: "rgba(148,163,184,0.9)"
            }}
          >
            Tip: pin your best SEICHO post on X to maximise visibility and
            chances of higher points.
          </p>
        </div>

        <div
          style={{
            borderRadius: 22,
            padding: 18,
            border: "1px solid rgba(148,163,184,0.45)",
            background:
              "radial-gradient(circle at top right, rgba(129,140,248,0.25), transparent 55%), rgba(15,23,42,0.98)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            <h3 style={{ margin: 0, fontSize: 16 }}>Leaderboard</h3>
            <span
              style={{
                fontSize: 11,
                padding: "4px 8px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.5)",
                color: "rgba(148,163,184,0.95)"
              }}
            >
              Points updated by mods
            </span>
          </div>

          {loadingSubs ? (
            <p style={{ fontSize: 13 }}>Loading leaderboard...</p>
          ) : submissions.length === 0 ? (
            <p style={{ fontSize: 13 }}>No submissions yet. Be the first.</p>
          ) : (
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontSize: 13
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Rank</th>
                    <th style={thStyle}>User</th>
                    <th style={thStyle}>X Post</th>
                    <th style={thStyle}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, index) => (
                    <tr key={s.id}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={tdStyle}>{s.userName}</td>
                      <td style={tdStyle}>
                        <a href={s.tweetUrl} target="_blank" rel="noreferrer">
                          View post
                        </a>
                      </td>
                      <td style={tdStyle}>{s.points ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(51,65,85,0.9)",
  textAlign: "left",
  padding: 6,
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(148,163,184,0.9)"
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(30,41,59,0.9)",
  padding: 6,
  fontSize: 12
};
