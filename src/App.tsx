"use client";

import { useState, useEffect } from "react";
import { useSearchEngine } from "@/store/store";
import type { MovieResult, SearchResult } from "@/types/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MovieCard from "./components/MovieCard";
import SearchResultCard from "./components/SearchResultCard";
import NProgress from "nprogress";
import { FaSearch } from "react-icons/fa";
import "nprogress/nprogress.css";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const { answer, movieResult, webSearchResponse, searchQuery, isLoading, image } =
    useSearchEngine();

  const handleSearch = () => {
    if (query.trim()) {
      searchQuery(query);
    }
  };


  async function copyBase64AsFile(base64: string, fileType = "image/png", fileName = "image.png") {
    const res = await fetch(base64);
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: fileType });

    const clipboardItem = new ClipboardItem({ [file.type]: file });

    try {
      await navigator.clipboard.write([clipboardItem]);
      alert("File copied");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6 md:p-12 font-sans">
      {/* Overlay during loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="mt-4 text-lg font-medium text-white animate-pulse">
              Searching...
            </span>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 animate-gradient">
          Anything Search
        </h1>
        <div
          className={`flex w-full gap-3 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 ${isLoading ? "opacity-60 pointer-events-none" : ""
            }`}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you looking for?"
            aria-busy={isLoading}
            disabled={isLoading}
            className="flex-1 bg-transparent px-6 py-3 text-lg text-white placeholder-gray-400 outline-none transition-colors"
            aria-label="Search input"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <FaSearch size={30} />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Skeleton Loader during loading */}
        {isLoading && (
          <div className="space-y-8">
            <div className="animate-pulse p-8 bg-gray-800 rounded-3xl shadow-xl">
              <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 w-1/4 bg-gray-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-64 bg-gray-800 rounded-xl shadow-lg"
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Answer */}
        {!isLoading && answer && (
          <div className="p-8 bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700 transition-opacity duration-500 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              AI-Powered Answer
            </h2>
            <div className="prose prose-invert prose-p:text-gray-300 prose-a:text-blue-400">
              <Markdown remarkPlugins={[remarkGfm]}>{answer}</Markdown>
            </div>
          </div>
        )}
        {/*  */}
        {!isLoading && image && (
          <div className="border relative max-w-96 max-h-96 flex justify-center items-center border-gray-600 rounded-2xl shadow-2xl overflow-hidden">
            {image ? (
              <div>
                <img
                  className="scale-115 z-10 duration-300 transition-all hover:scale-110 object-cover"
                  src={image}
                  alt="Generated Image"
                />
                <button
                  className="z-20 absolute bottom-2 right-2 shadow text-sm py-1 px-4 bg-black rounded-2xl border-gray-900 text-white"
                  onClick={() => copyBase64AsFile(image)}
                >
                  Copy
                </button>
              </div>
            ) : (
              <p className="text-center p-4 text-gray-500">No image generated</p>
            )}
          </div>
        )}

        {/* Movies */}
        {!isLoading && movieResult.length > 0 && (
          <div className="transition-opacity duration-500 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieResult.map((movie: MovieResult) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Web Results */}
        {!isLoading && webSearchResponse && (
          <div className="transition-opacity duration-500 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">
              Web Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {webSearchResponse.results.map((res: SearchResult) => (
                <SearchResultCard key={res.url} result={res} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;