#!/bin/bash

echo "🚀 Creating Qnect Project Structure..."

mkdir -p qnect/client/src/{pages,components} qnect/server/{controllers,models,routes,middleware,config,utils}
cd qnect

### 1. CLIENT SETUP
echo "📦 Setting up client..."
cd client
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Tailwind Base
echo -e "@tailwind base;\n@tailwind components;\n@tailwind utilities;" > src/index.css
sed -i 's/content: \[\]/content: ["\.\/src\/\*\*\/\*\.\{js,jsx\}"]/' tailwind.config.js

# Basic Routing
npm install react-router-dom react-icons

# App.jsx
cat <<EOF > src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import StackItProfile from "./pages/StackItProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/profile" element={<StackItProfile />} />
      </Routes>
    </Router>
  );
}
export default App;
EOF

# main.jsx
cat <<EOF > src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# index.html (ensure root div exists)
mkdir public
cat <<EOF > public/index.html
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Qnect</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
EOF

# Navbar.jsx
cat <<EOF > src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
      <div className="text-xl font-bold text-blue-700">Qnect</div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link to="/ask" className="text-gray-600 hover:text-black">Ask</Link>
        <Link to="/profile" className="text-gray-600 hover:text-black">Profile</Link>
      </div>
    </nav>
  );
};
export default Navbar;
EOF

# Pages: Home.jsx
cat <<EOF > src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Qnect 💬</h1>
      <p className="mb-4 text-gray-600">Ask, answer, and connect with developers worldwide.</p>
      <Link to="/ask" className="bg-blue-600 text-white px-4 py-2 rounded">Ask a Question</Link>
    </div>
  );
};
export default Home;
EOF

# AskQuestion.jsx
cat <<EOF > src/pages/AskQuestion.jsx
import React, { useState } from "react";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, desc, tags });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" className="w-full border p-2 rounded"
               value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Describe your question..." className="w-full border p-2 rounded h-32"
               value={desc} onChange={(e) => setDesc(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" className="w-full border p-2 rounded"
               value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};
export default AskQuestion;
EOF

# QuestionDetails.jsx
cat <<EOF > src/pages/QuestionDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const QuestionDetails = () => {
  const { id } = useParams();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Question Title #{id}</h2>
      <p className="text-gray-700 mb-4">This is a placeholder for the full question description and any related answers.</p>
      <h3 className="text-xl font-semibold mb-2">Answers</h3>
      <div className="border p-4 mb-2 rounded">Answer 1...</div>
      <div className="border p-4 mb-2 rounded">Answer 2...</div>
    </div>
  );
};
export default QuestionDetails;
EOF

# StackItProfile.jsx placeholder
touch src/pages/StackItProfile.jsx

cd ../..

### 2. SERVER SETUP
echo "⚙️  Setting up server..."
cd qnect/server
npm init -y
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
npm install -D nodemon

# .env
cat <<EOF > .env
MONGO_URI=mongodb://localhost:27017/qnect
JWT_SECRET=supersecretkey
EOF

# server.js
cat <<EOF > server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Qnect API is running...");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`)))
  .catch((err) => console.error("MongoDB connection error:", err));
EOF

echo "✅ Qnect project structure created with full boilerplate!"
