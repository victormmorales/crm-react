import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
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
      }, 500);
    };
    obternerClienteAPI();
  }, []);

  return Object.keys(cliente).length === 0 ? (
    <>
      <h1 className="font-black text-4xl text-blue-900">No hay resultados</h1>
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 block text-white p-4 uppercase font-bold rounded-md text-xs mt-3"
        onClick={() => navigate("/clientes")}
      >
        Inicio
      </button>
    </>
  ) : (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar los datos de un cliente
      </p>
      <Formulario cliente={cliente} cargando={cargando} />
    </>
  );
};

export default EditarCliente;
