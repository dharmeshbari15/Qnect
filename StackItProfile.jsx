// StackItProfile.jsx
import React from "react";
import { FaUser, FaQuestionCircle, FaCommentDots } from "react-icons/fa";

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