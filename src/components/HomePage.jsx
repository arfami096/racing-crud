import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки постов:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Загрузка ленты...</div>;
  }

  return (
    <div className="page-container">
      <div className="top-bar">
        <Link to="/posts/new" className="btn btn-create">
          Создать пост
        </Link>
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="post-header">
              <span className="post-author">Пользователь</span>
              <span className="post-date">
                {new Date(post.created).toLocaleDateString()}
              </span>
            </div>
            <p className="post-text">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
