import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaComment, FaCheck, FaEye, FaClock } from "react-icons/fa";

const QuestionCard = ({ question }) => {
  const {
    id,
    title,
    description,
    tags,
    author,
    votes,
    answers,
    views,
    createdAt,
    hasAcceptedAnswer
  } = question;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Stats Column */}
        <div className="flex flex-col items-center space-y-3 text-sm text-gray-600 min-w-[80px]">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">{votes}</span>
            <span>votes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`font-semibold text-lg ${hasAcceptedAnswer ? 'text-green-600' : ''}`}>
              {answers}
            </span>
            <span>answers</span>
            {hasAcceptedAnswer && <FaCheck className="text-green-600 mt-1" />}
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">{views}</span>
            <span>views</span>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1">
          <div className="mb-3">
            <Link
              to={`/question/${id}`}
              className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition-colors"
            >
              {title}
            </Link>
          </div>

          <div className="mb-4 text-gray-700">
            {truncateDescription(description)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author and Date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src={author.avatar}
                alt={author.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <Link
                  to={`/user/${author.username}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {author.username}
                </Link>
                <div className="text-gray-500">
                  {author.reputation} reputation
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <FaClock className="w-3 h-3" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;