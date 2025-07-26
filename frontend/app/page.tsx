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
  const [isGenerating, setIsGenerating] = useState(false);

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
    setIsGenerating(true);
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
      setIsGenerating(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Vibe Coding
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Website Generator</p>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={() => setShowStats(!showStats)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
            >
              {showStats ? "Hide Analytics" : "Show Analytics"}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Ideas Into
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stunning Websites
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Harness the power of AI to generate intelligent, contextual website sections. 
              No coding required - just describe your vision and watch it come to life.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <AnimatePresence>
          {showStats && stats && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stats.totalSections}</div>
                  <p className="text-gray-300">Total Sections Generated</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">{stats.todaySections}</div>
                  <p className="text-gray-300">Generated Today</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stats.popularIdeas.length}</div>
                  <p className="text-gray-300">Popular Ideas</p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
                  <input
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your website idea... (e.g., 'A modern bakery website with online ordering')"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg px-6 py-4"
                    required
                    minLength={3}
                    maxLength={500}
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400 text-sm">{idea.length}/500</span>
                  </div>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isGenerating || !idea.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Your Website...</span>
                  </div>
                ) : (
                  "Generate Website Sections"
                )}
              </motion.button>
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
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-200 font-medium">Error: {error}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search generated websites..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 px-4 py-3 pl-12"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sections Display */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-8"
        >
          {loading && sections.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-300 text-lg">Loading your websites...</p>
            </div>
          ) : sections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No websites yet</h3>
              <p className="text-gray-400 text-lg">Generate your first website to get started!</p>
            </motion.div>
          ) : (
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white flex-1 pr-4">
                      {section.idea}
                    </h3>
                    <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
                      {section.sections.length} sections
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {section.sections.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl px-4 py-3 text-blue-200 font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        {s}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Created: {new Date(section.createdAt).toLocaleDateString()}</span>
                    <span>ID: {section._id.slice(-8)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Pagination */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  fetchSections(Math.max(1, currentPage - 1));
                }}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300"
              >
                Previous
              </button>
              <span className="px-6 py-3 text-white">Page {currentPage}</span>
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  fetchSections(currentPage + 1);
                }}
                disabled={sections.length < 10}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Built with ❤️ by the Vibe Coding Team
            </p>
            <p className="text-sm text-gray-500">
              Powered by Next.js, NestJS, and MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
