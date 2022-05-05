import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCargando(true);
    const obternerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(false);
      }, 1500);
    };
    obternerClienteAPI();
  }, []);

  return Object.keys(cliente).length === 0 ? (
    <div>
      <h1 className="font-black text-4xl text-blue-900">No hay resultados</h1>
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 block text-white p-4 uppercase font-bold rounded-md text-xs mt-3"
        onClick={() => navigate("/clientes")}
      >
        Inicio
      </button>
    </div>
  ) : (
    <div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver cliente: {cliente.nombre}
          </h1>
          <p className="mt-3">Información del cliente</p>

          {cliente.nombre && (
            <p className="text-2xl text-gray-600 mt-10">
              <span className="text-gray-800 uppercase font-bold">
                Nombre:{" "}
              </span>
              {cliente.nombre}
            </p>
          )}

          {cliente.email && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Email: </span>
              {cliente.email}
            </p>
          )}

          {cliente.telefono && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Teléfono:{" "}
              </span>
              {cliente.telefono}
            </p>
          )}

          {cliente.empresa && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Empresa:{" "}
              </span>
              {cliente.empresa}
            </p>
          )}

          {cliente.notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Notas: </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;
