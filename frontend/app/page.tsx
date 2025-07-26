"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  _id: string;
  idea: string;
  sections: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

interface Stats {
  totalSections: number;
  todaySections: number;
  popularIdeas: Array<{ _id: string; count: number }>;
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showStats, setShowStats] = useState(false);

  const API_BASE_URL = "http://localhost:4000/api/v1";

  const fetchSections = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/sections?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch sections");
      const data: ApiResponse<Section[]> = await res.json();
      if (data.success) {
        setSections(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch sections");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sections/stats/overview`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data: ApiResponse<Stats> = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch stats:", err.message);
    }
  };

  const searchSections = async (query: string) => {
    if (!query.trim()) {
      fetchSections();
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/sections/search/${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to search sections");
      const data: ApiResponse<Section[]> = await res.json();
      if (data.success) {
        setSections(data.data);
      } else {
        throw new Error(data.error || "Failed to search sections");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) throw new Error("Failed to submit idea");
      const data: ApiResponse<Section> = await res.json();
      if (data.success) {
        setIdea("");
        await fetchSections();
        await fetchStats();
      } else {
        throw new Error(data.error || "Failed to submit idea");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchStats();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchSections(searchQuery);
      } else {
        fetchSections();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vibe Coding
              </h1>
            </motion.div>
            
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={() => setShowStats(!showStats)}
              className="btn-secondary"
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Website
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Section Generator
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your website ideas into intelligent, contextual sections using advanced AI analysis. 
            No API keys required - completely free and instant!
          </p>
        </motion.section>

        {/* Stats Section */}
        <AnimatePresence>
          {showStats && stats && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="card text-center"
                >
                  <h3 className="text-2xl font-bold text-blue-600">{stats.totalSections}</h3>
                  <p className="text-gray-600">Total Sections Generated</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="card text-center"
                >
                  <h3 className="text-2xl font-bold text-green-600">{stats.todaySections}</h3>
                  <p className="text-gray-600">Generated Today</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="card text-center"
                >
                  <h3 className="text-2xl font-bold text-purple-600">{stats.popularIdeas.length}</h3>
                  <p className="text-gray-600">Popular Ideas</p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Enter your website idea (e.g., 'Landing page for a bakery')"
                  className="input-primary text-lg"
                  required
                  minLength={3}
                  maxLength={500}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400 text-sm">{idea.length}/500</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="spinner"></div>
                    <span>Generating Sections...</span>
                  </div>
                ) : (
                  "Generate Sections"
                )}
              </button>
            </form>
          </div>
        </motion.section>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800 font-medium">Error: {error}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search generated sections..."
                className="input-primary pl-10"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.section>

        {/* Sections Display */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {loading && sections.length === 0 ? (
            <div className="text-center py-12">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Loading sections...</p>
            </div>
          ) : sections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sections yet</h3>
              <p className="text-gray-600">Generate your first website section to get started!</p>
            </motion.div>
          ) : (
            sections.map((section, index) => (
              <motion.div
                key={section._id}
                variants={itemVariants}
                className="card hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">
                    {section.idea}
                  </h3>
                  <span className="badge-info ml-4">
                    {section.sections.length} sections
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {section.sections.map((s, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg px-3 py-2 text-sm font-medium text-blue-800"
                    >
                      {s}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Created: {new Date(section.createdAt).toLocaleDateString()}</span>
                  <span>ID: {section._id.slice(-8)}</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.section>

        {/* Pagination */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  fetchSections(Math.max(1, currentPage - 1));
                }}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">Page {currentPage}</span>
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  fetchSections(currentPage + 1);
                }}
                disabled={sections.length < 10}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with ❤️ by the Vibe Coding Team
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by Next.js, NestJS, and MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
