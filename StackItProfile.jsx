// StackItProfile.jsx
import React from "react";
import { FaUser, FaQuestionCircle, FaCommimport React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications, markAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setShowNotifications(false);
    if (notification.type === "answer") {
      navigate(`/question/${notification.questionId}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-blue-700">StackIt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/public" className="text-gray-600 hover:text-blue-700 transition-colors">
              Public
            </Link>
            <Link to="/tags" className="text-gray-600 hover:text-blue-700 transition-colors">
              Tags
            </Link>
            <Link to="/users" className="text-gray-600 hover:text-blue-700 transition-colors">
              Users
            </Link>
            <Link to="/companies" className="text-gray-600 hover:text-blue-700 transition-colors">
              Companies
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search questions, answers, or tags..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Ask Question Button */}
                <Link
                  to="/ask"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ask Question
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <FaBell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-gray-500 text-center">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification)}
                              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                            >
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
                    <img
                      src={user.avatar || `https://api.dicebear.com/6.x/adventurer/svg?seed=${user.username}`}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block text-gray-700">{user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;entDots } from "react-icons/fa";

const StackItProfile = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="border-b px-8 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">📚 StackIt</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Public</a>
          <a href="#" className="hover:underline">Tags</a>
          <a href="#" className="hover:underline">Users</a>
          <a href="#" className="hover:underline">Companies</a>
        </nav>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md"
          />
          <img
            src="https://api.dicebear.com/6.x/adventurer/svg?seed=Sophia"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Profile Header */}
      <section className="text-center mt-10 px-4">
        <img
          src="https://api.dicebear.com/6.x/adventurer/svg?seed=Sophia"
          alt="Sophia Avatar"
          className="w-24 h-24 mx-auto rounded-full"
        />
        <h1 className="text-2xl font-semibold mt-4">Sophia Bennett</h1>
        <p className="text-gray-600">Software Engineer | Passionate about coding and problem-solving</p>
        <p className="text-gray-500 text-sm">Joined 2021</p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center mt-6 border-b">
        <button className="px-4 py-2 font-medium border-b-2 border-black">Profile</button>
        <button className="px-4 py-2 text-gray-500 hover:text-black">Posts</button>
        <button className="px-4 py-2 text-gray-500 hover:text-black">Answers</button>
        <button className="px-4 py-2 text-gray-500 hover:text-black">Questions</button>
      </div>

      {/* About Section */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">
          Sophia is a software engineer with a passion for coding and problem-solving. She enjoys contributing to the community
          and helping others learn and grow in the field of technology.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-md p-4 text-center">
            <p className="text-2xl font-bold">150</p>
            <p className="text-gray-500">Reputation</p>
          </div>
          <div className="border rounded-md p-4 text-center">
            <p className="text-2xl font-bold">75</p>
            <p className="text-gray-500">Answers</p>
          </div>
          <div className="border rounded-md p-4 text-center">
            <p className="text-2xl font-bold">200</p>
            <p className="text-gray-500">Questions</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <FaCommentDots />
            <p>Answered a question about <strong>Python</strong> <span className="text-gray-400">2 days ago</span></p>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaQuestionCircle />
            <p>Asked a question about <strong>JavaScript</strong> <span className="text-gray-400">1 week ago</span></p>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaUser />
            <p>Joined the community <span className="text-gray-400">2021</span></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackItProfile;