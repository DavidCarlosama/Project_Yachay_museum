// pages/admin.js
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Admin() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (user.role !== 'ADMIN') {
      router.replace('/unauthorized');
    } else {
      fetchArticles();
    }
  }, [user, router]);

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  };

  const addArticle = async () => {
    const newArticle = {
      title: prompt('Enter title:'),
      description: prompt('Enter description:'),
      image: prompt('Enter image URL:'),
      codigoColeccionista: prompt('Enter código coleccionista:'),
      codigoSipce: prompt('Enter código sipce:'),
      codigoUbicacion: prompt('Enter código ubicación:'),
      filiacionCultural: prompt('Enter filiación cultural:'),
      dimensiones: prompt('Enter dimensiones:'),
      details: prompt('Enter details:'),
      relatedImages: prompt('Enter related image URLs (comma-separated):').split(',').map(url => url.trim()),
    };

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle),
    });
    const createdArticle = await res.json();
    setArticles([...articles, createdArticle]);
  };

  const editArticle = async (id) => {
    const article = articles.find(a => a._id === id);
    const updatedArticle = {
      title: prompt('Edit title:', article.title),
      description: prompt('Edit description:', article.description),
      image: prompt('Edit image URL:', article.image),
      codigoColeccionista: prompt('Edit código coleccionista:', article.codigoColeccionista),
      codigoSipce: prompt('Edit código sipce:', article.codigoSipce),
      codigoUbicacion: prompt('Edit código ubicación:', article.codigoUbicacion),
      filiacionCultural: prompt('Edit filiación cultural:', article.filiacionCultural),
      dimensiones: prompt('Edit dimensiones:', article.dimensiones),
      details: prompt('Edit details:', article.details),
      relatedImages: prompt('Edit related image URLs (comma-separated):', article.relatedImages.join(', ')).split(',').map(url => url.trim()),
    };

    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArticle),
    });
    const updatedArticleFromServer = await res.json();
    setArticles(articles.map(a => a._id === id ? updatedArticleFromServer : a));
  };

  const removeArticle = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    setArticles(articles.filter(a => a._id !== id));
  };

  if (!user) return <div>Loading...</div>;
  if (user.role !== 'ADMIN') return <div>Unauthorized access</div>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>

      <h2>Articles</h2>
      <button onClick={addArticle}>Add New Article</button>

      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <img src={article.image} alt={article.title} style={{ maxWidth: '200px' }} />
            <p>Código Coleccionista: {article.codigoColeccionista}</p>
            <p>Código Sipce: {article.codigoSipce}</p>
            <p>Código Ubicación: {article.codigoUbicacion}</p>
            <p>Filiación Cultural: {article.filiacionCultural}</p>
            <p>Dimensiones: {article.dimensiones}</p>
            <p>Details: {article.details}</p>
            <div>
              Related Images:
              {article.relatedImages.map((img, index) => (
                <img key={index} src={img} alt={`Related ${index + 1}`} style={{ maxWidth: '100px' }} />
              ))}
            </div>
            <button onClick={() => editArticle(article._id)}>Edit</button>
            <button onClick={() => removeArticle(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}