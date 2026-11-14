import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostCreate from './components/PostCreate';
import PostView from './components/PostView';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/new" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}