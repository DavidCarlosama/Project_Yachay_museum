// pages/catalogo.js
import { useState } from 'react';
import Head from "next/head";
import Navbar from "../components/navbar";
import PopupWidget from "../components/popupWidget";
import Link from 'next/link';
import Image from 'next/image'
import articles from '../data/articles.json';




const ITEMS_PER_PAGE = 6;

const Catalogo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  const currentArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Head>
        {/* Encabezado omitido por brevedad */}
      </Head>

      <Navbar />
      
      <main className={`container mx-auto p-8 ${darkMode ? 'dark' : ''}`}>
        {/* Contenido omitido por brevedad */}

        <div className="flex flex-wrap justify-center">
          {currentArticles.map(article => (
            <div key={article.id} className={`max-w-sm rounded overflow-hidden shadow-lg m-4 border ${darkMode ? 'border-gray-600' : 'border-cyan-500'}`}>
              {/* Contenido del artículo */}
              <Link href={`/articles/${article.id}`}>
                <div className="cursor-pointer bg-blue-200 rounded">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-black">{article.title}</div>
                    <p className="text-base text-black">{article.description}</p>
                  </div>
                </div>
              </Link>
              {/* Sección de información adicional */}
              <div className="px-6 py-4 bg-blue-200 rounded text-black">
                <div className="text-sm">
                  <p><strong>IDENTIFICACIÓN</strong></p>
                  <p>Código de coleccionista: {article.codigoColeccionista}</p>
                  <p>Código Sipce: {article.codigoSipce}</p>
                  <p>Código de ubicación: {article.codigoUbicacion}</p>
                  <p>FILIACIÓN CULTURAL: {article.filiacionCultural}</p>
                  <p><strong>DIMENSIONES</strong></p>
                  <p>{article.dimensiones}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botones de paginación */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </main>
      
      
      <PopupWidget />
    </>
  );
}

export default Catalogo;