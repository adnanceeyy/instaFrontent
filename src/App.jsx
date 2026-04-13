import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import History from './pages/History';
import Hashtags from './pages/Hashtags';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hashtags" element={<Hashtags />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
