import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";
import {
  getMarcasRequest,
  getMarcaRequest,
  deleteMarcaRequest,
  createMarcaRequest,
  updateMarcaRequest,
} from "../api/marcas.api.js";

export const MarcaContext = createContext();

export function useMarcas() {
  const context = useContext(MarcaContext);
  if (!context) {
    throw new Error("UseMarca no puede unsarse aquí");
  }
  return context;
}

export const MarcaProvider = ({ children }) => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    loadMarcas();
  }, []);

  const loadMarcas = async () => {
    try {
      const response = await getMarcasRequest();
      //console.log(response.data.result);
      setMarcas(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const getMarca = async (id) => {
    try {
      const response = await getMarcaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMarca = async (id) => {
    try {
      const response = await deleteMarcaRequest(id);
      console.log(response);
      if (response.status == 204) {
        setMarcas(marcas.filter((marcas) => marcas.idMarca !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createMarca = async (values) => {
    try {
      const response = await createMarcaRequest(values);
      console.log(response);
      if (response.status == 200) {
        setMarcas([...marcas, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMarca = async (id, values) => {
    try {
      const response = await updateMarcaRequest(id, values);
      if (response.status == 200) {
        loadMarcas();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MarcaContext.Provider
      value={{ marcas, getMarca, deleteMarca, createMarca, updateMarca }}
    >
      {children}
    </MarcaContext.Provider>
  );
};

MarcaProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
