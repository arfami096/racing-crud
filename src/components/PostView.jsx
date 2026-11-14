import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === Number(id));
        if (found) {
          setPost(found);
          setEditContent(found.content);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки поста:', err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:7070/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => navigate('/'))
      .catch((err) => console.error('Ошибка удаления:', err));
  };

  const handleSave = (e) => {
    e.preventDefault();
    fetch(`http://localhost:7070/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), content: editContent }),
    })
      .then(() => {
        setPost({ ...post, content: editContent });
        setIsEditing(false);
      })
      .catch((err) => console.error('Ошибка сохранения:', err));
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!post) return <div className="error">Пост не найден</div>;

  return (
    <div className="page-container">
      {!isEditing ? (
        <div className="post-card view-card">
          <div className="card-header">
            <span className="post-author">Пользователь</span>
            <button className="close-btn" onClick={() => navigate('/')}>
              &times;
            </button>
          </div>
          <p className="post-text">{post.content}</p>
          <div className="card-actions">
            <button
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </div>
      ) : (
        <div className="modal-card edit-card">
          <div className="card-header">
            <h3>Редактировать пост</h3>
            <button
              className="close-btn"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSave}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
              rows="4"
            />
            <button type="submit" className="btn btn-save">
              Сохранить
            </button>
          </form>
        </div>
      )}
    </div>
  );
}