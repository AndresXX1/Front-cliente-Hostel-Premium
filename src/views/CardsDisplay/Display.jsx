import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../componentes/Cards/cards";
import Paginado from "../../componentes/Paginado/paginado";
import Filter from "../../componentes/Filter/filter";
import { fetchProducts, searchProducts } from "../../redux/Actions/actions";
import "./home.css";
import HomePage from "../Home/home"

function Home() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.stateA.searchResults);
 
  const totalPages = useSelector((state) => state.stateA.totalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Estado para almacenar los filtros aplicados
  const cardsPerPage = 8; // Número de tarjetas por página

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    dispatch(fetchProducts(filters, currentPage, cardsPerPage)); // Incluir filtros en la solicitud de productos
  }, [dispatch, filters, currentPage, cardsPerPage]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
    setCurrentPage(1);
    if (searchTerm.trim() !== "") {/* dknfjkdn */
      dispatch(searchProducts(searchTerm.trim()))
        .then((response) => {
          if (response.status === 400) {
            setError(true);
          } else {
            setError(false);
          }
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setError(false);
      dispatch(fetchProducts({}, 1, cardsPerPage));
    }
  };

  useEffect(() => {
    setError(searchResults?.length === 0 && searchTerm.trim() !== "");
  }, [searchResults, searchTerm]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts(filters, page, cardsPerPage)); // Incluir filtros en la solicitud de paginación
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reiniciar la página al aplicar filtros
    dispatch(fetchProducts(newFilters, 1, cardsPerPage)); // Incluir filtros en la solicitud de productos
  };

  return (
    <div>
      <HomePage/>
    <div className="homeView">
      <section className="mainContent">
        <div className="filter">
          <Filter onPageChange={onPageChange} applyFilters={applyFilters} />
        </div>

        {error ? (
          <p style={{
            backgroundColor: '#f8d7da', 
            color: '#721c24',
            padding: '10px', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px',
            marginBottom: '10px', 
            display: 'inline-block' 
          }}>
            No se encontraron resultados.
          </p>
        ) : (
          <div className="cardsRows">
           
          </div>
        )}
        <div className="paginado">
        <Paginado
  currentPage={currentPage}
  onPageClick={onPageChange}
  totalPages={totalPages}
  isSearchResult={searchTerm.trim() !== ""}
  filters={filters} // Pasar los filtros al componente Paginado
/>
        </div>
      </section>
      <footer>
     
      </footer>
    </div>
    </div>
  );
}

export default Home;