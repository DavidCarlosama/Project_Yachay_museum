import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Admin() {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push('/403');  // Redirige a una página de acceso denegado
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administración del Museo</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">Título</label>
          <input type="text" id="title" name="title" className="w-full border p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">Descripción</label>
          <textarea id="description" name="description" className="w-full border p-2"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">Imagen</label>
          <input type="file" id="image" name="image" className="w-full border p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar</button>
      </form>
    </div>
  );
}
