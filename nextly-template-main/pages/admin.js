// pages/admin.js
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import articlesData from '../data/articles.json';

export default function Admin() {
  const { authenticated, logout } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      router.replace('/login');
    } else if (authenticated && authenticated.role !== 'ADMIN') {
      router.replace('/unauthorized');
    } else {
      setArticles(articlesData); // Still using local data
    }
  }, [authenticated, router]);

  const addArticle = () => {
    const newArticle = { id: articles.length + 1, title: 'Nuevo Artículo', content: 'Contenido del nuevo artículo' };
    setArticles([...articles, newArticle]);
  };

  const removeArticle = (id) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
  };

  if (!authenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administración del Museo</h1>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={addArticle} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Artículo
        </button>
        <button 
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
      <ul>
        {articles.map(article => (
          <li key={article.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="mb-2">{article.content}</p>
            <button 
              onClick={() => removeArticle(article.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}