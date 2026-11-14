import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostCreate() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:7070/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content }),
    })
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error('Ошибка при создании:', err));
  };

  return (
    <div className="modal-card">
      <div className="card-header">
        <h3>Добавить пост</h3>
        <button className="close-btn" onClick={() => navigate('/')}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Что у вас нового?"
          required
          rows="4"
        />
        <button type="submit" className="btn btn-publish">
          Опубликовать
        </button>
      </form>
    </div>
  );
}