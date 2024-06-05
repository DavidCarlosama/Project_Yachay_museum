import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import articlesData from '../data/articles.json'; // Importa el archivo JSON

export default function Admin() {
  const { authenticated } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      router.push('/403');  // Redirige a una página de acceso denegado si no está autenticado
    } else {
      setArticles(articlesData); // Cargar los artículos cuando el usuario esté autenticado
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
      <button onClick={addArticle}>Agregar Artículo</button>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => removeArticle(article.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
