import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import{useSelector} from 'react-redux';



const Comprar = () => {
  const { title } = useParams(); // Obtener el ID de la película de los parámetros de la URL

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la información del formulario
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Cantidad de entradas:', cantidad);
    // Puedes redirigir a otra página después de enviar el formulario si es necesario
  };

  const peliculaSelecionada=useSelector(state=>state.favoriteMovies.favoriteMovies);
  console.log(peliculaSelecionada)

  return (
    <div>
      <br></br> <br></br> <br></br><br></br>
    <div className="max-w-md mx-auto bg-white rounded p-8 m-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Compra de entradas para la película {peliculaSelecionada}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-input mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input mt-1 block w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="cantidad" className="block text-gray-700">Cantidad de entradas:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            min={1}
            required
            className="form-input mt-1 block w-full"
          />
        </div>
        <Link to={`/`}>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Comprar entradas
        </button></Link>
      </form>
    </div>
    </div>
  );
};

export default Comprar;
