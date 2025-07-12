import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaComment, FaCheck, FaEye, FaFilter } from "react-icons/fa";
import QuestionCard from "../components/QuestionCard";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterTag, setFilterTag] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Mock data for demonstration
  useEffect(() => {
    const mockQuestions = [
      {
        id: 1,
        title: "How to implement JWT authentication in React?",
        description: "I'm trying to set up JWT authentication in my React application. What's the best approach to handle token storage and automatic logout?",
        tags: ["React", "JWT", "Authentication"],
        author: {
          username: "john_doe",
          avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=john",
          reputation: 150
        },
        votes: 12,
        answers: 3,
        views: 245,
        createdAt: "2024-01-15T10:30:00Z",
        hasAcceptedAnswer: true
      },
      {
        id: 2,
        title: "Best practices for MongoDB schema design",
        description: "What are the key considerations when designing a MongoDB schema for a social media application?",
        tags: ["MongoDB", "Database", "Schema"],
        author: {
          username: "jane_smith",
          avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=jane",
          reputation: 320
        },
        votes: 8,
        answers: 2,
        views: 180,
        createdAt: "2024-01-14T15:45:00Z",
        hasAcceptedAnswer: false
      },
      {
        id: 3,
        title: "How to optimize React component re-renders?",
        description: "My React application is experiencing performance issues due to unnecessary re-renders. What are the best optimization techniques?",
        tags: ["React", "Performance", "Optimization"],
        author: {
          username: "dev_guru",
          avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=guru",
          reputation: 890
        },
        votes: 25,
        answers: 5,
        views: 420,
        createdAt: "2024-01-13T09:15:00Z",
        hasAcceptedAnswer: true
      },
      {
        id: 4,
        title: "Setting up CI/CD pipeline with GitHub Actions",
        description: "I need help setting up a continuous integration and deployment pipeline for my Node.js application using GitHub Actions.",
        tags: ["CI/CD", "GitHub", "DevOps"],
        author: {
          username: "pipeline_pro",
          avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=pipeline",
          reputation: 567
        },
        votes: 15,
        answers: 4,
        views: 350,
        createdAt: "2024-01-12T14:20:00Z",
        hasAcceptedAnswer: false
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = searchQuery === "" || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = filterTag === "" || question.tags.includes(filterTag);
    
    return matchesSearch && matchesTag;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "votes":
        return b.votes - a.votes;
      case "answers":
        return b.answers - a.answers;
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const allTags = [...new Set(questions.flatMap(q => q.tags))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : "All Questions"}
          </h1>
          <p className="text-gray-600">
            {sortedQuestions.length} question{sortedQuestions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to="/ask"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ask Question
        </Link>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="votes">Most Votes</option>
            <option value="answers">Most Answers</option>
            <option value="views">Most Views</option>
          </select>
        </div>
        
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchQuery ? "No questions found matching your search." : "No questions yet."}
            </div>
            <Link
              to="/ask"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask the First Question
            </Link>
          </div>
        ) : (
          sortedQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>

      {/* Pagination */}
      {sortedQuestions.length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-500 hover:text-blue-600 disabled:opacity-50">
              Previous
            </button>
            <span className="px-3 py-2 bg-blue-600 text-white rounded">1</span>
            <button className="px-3 py-2 text-gray-500 hover:text-blue-600">2</button>
            <button className="px-3 py-2 text-gray-500 hover:text-blue-600">3</button>
            <button className="px-3 py-2 text-gray-500 hover:text-blue-600">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Home;