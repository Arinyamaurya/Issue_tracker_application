"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues");
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch issues", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/issues/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === id ? { ...issue, status } : issue
        )
      );
    } catch (err) {
      console.error("Error updating issue", err);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-[#000319] w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">All Issues</h1>
        <Link
          href="/issues/new"
          className="bg-white text-black px-4 py-2 rounded hover:bg-blue-200 transition font-[600]"
        >
          Create New Issue
        </Link>
      </div>

      {loading ? (
        <p className="text-white">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-gray-400">No issues found.</p>
      ) : (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-[#0e0e2e] text-white p-4 rounded-lg border border-zinc-700 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{issue.title}</h2>
              <p className="text-sm text-zinc-400 mt-1">{issue.description}</p>

              <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      issue.status === "OPEN"
                        ? "bg-green-700 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {issue.status}
                  </span>

                  <button
                    onClick={() => handleStatusChange(issue.id, "CLOSED")}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition disabled:opacity-50"
                    disabled={issue.status === "CLOSED"}
                  >
                    Close Issue
                  </button>
                </div>

                <span className="text-xs text-zinc-400">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
