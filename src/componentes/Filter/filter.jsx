import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Actions/actions";
import style from "./filter.module.css";
import debounce from "lodash/debounce";
import { TextField, IconButton, MenuItem } from "@mui/material";
import { LocationOn, Pool, Sort } from "@mui/icons-material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchBar from "../SearchBar/searchBar";
import Cards from "../../componentes/Cards/cards";
import { useHistory, useLocation } from 'react-router-dom';
import Ayuda from "../CentroDeAyuda/ayuda"





function Filter({ applyFilters }) {
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedPileta, setSelectedPileta] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = useSelector((state) => state.stateA.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const products = useSelector((state) => state.stateA.products);
  const cardsPerPage = 8;
  const dispatch = useDispatch();
  const history = useHistory();
  const [notificationClosed, setNotificationClosed] = useState(false); 
  const location = useLocation();
 const locationState = location.state;
 const selectedLocationInfo = locationState && locationState.selectedLocation ? locationState : null;

 useEffect(() => {
  console.log('Filter component mounted');
  console.log('Location state:', location.state);
  if (selectedLocationInfo && !notificationClosed) {
    setNotificationClosed(false); // Asegurarse de que la notificación se muestre
  }
}, [selectedLocationInfo, notificationClosed]);

   console.log('selectedLocationInfo:', selectedLocationInfo);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
    setCurrentPage(1);
    if (searchTerm.trim() !== "") {
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

  const handleFilterChange = debounce((filters) => {
    dispatch(fetchProducts({ ...filters, page: 1, pageSize }));
    setIsSearchResult(true);
  }, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    setError(searchResults?.length === 0 && searchTerm.trim() !== "");
  }, [searchResults, searchTerm]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts({}, page, cardsPerPage));
  };

  const applyAndHandleFilterChange = (filters) => {
    handleFilterChange(filters);
    applyFilters(filters);
  };

  const handleFilterTemporada = (value) => {
    setSelectedTemporada(value);
    const filters = { temporada: value, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleFilterLocalidad = (value) => {
    setSelectedLocalidad(value);
    const filters = { temporada: selectedTemporada, localidad: value, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleFilterPileta = (value) => {
    setSelectedPileta(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: value, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleOrderPriceChange = (value) => {
    setOrderPrice(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice: value };
    applyAndHandleFilterChange(filters);
  };



  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <TextField
          select
          value={selectedTemporada}
          onChange={(e) => handleFilterTemporada(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <WbSunnyIcon  /> Temporada
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Temporada</MenuItem>
          <MenuItem value="Verano">Verano</MenuItem>
          <MenuItem value="Invierno">Invierno</MenuItem>
          <MenuItem value="Otoño">Otoño</MenuItem>
          <MenuItem value="Primavera">Primavera</MenuItem>
        </TextField>

        <TextField
          select
          value={selectedLocalidad}
          onChange={(e) => handleFilterLocalidad(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <LocationOn /> Localidad
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Localidad</MenuItem>
          <MenuItem value="El Bolsón, Provincia de Río Negro">El Bolsón, Provincia de Río Negro</MenuItem>
          <MenuItem value="Villa Pehuenia, Provincia de Neuquén">Villa Pehuenia, Provincia de Neuquén</MenuItem>
          <MenuItem value='Purmamarca, Provincia de Jujuy'>Purmamarca, Provincia de Jujuy</MenuItem>
          <MenuItem value='Villa Traful, Provincia de Neuquén'>Villa Traful, Provincia de Neuquén</MenuItem>
          <MenuItem value="Las Grutas, Provincia de Río Negro">Las Grutas, Provincia de Río Negro</MenuItem>
          <MenuItem value="San Javier, Provincia de Tucumán">San Javier, Provincia de Tucumán</MenuItem>
          <MenuItem value="Los Reartes, Provincia de Córdoba">Los Reartes, Provincia de Córdoba</MenuItem>
          <MenuItem value="Caviahue, Provincia de Neuquén">Caviahue, Provincia de Neuquén</MenuItem>
          <MenuItem value="Tafí del Valle, Provincia de Tucumán">Tafí del Valle, Provincia de Tucumán</MenuItem>
          <MenuItem value="Villa Meliquina, Provincia de Neuquén">Villa Meliquina, Provincia de Neuquén</MenuItem>
          <MenuItem value="San Marcos Sierras, Provincia de Córdoba">San Marcos Sierras, Provincia de Córdoba</MenuItem>
          <MenuItem value="Cuesta Blanca, Provincia de Córdoba">Cuesta Blanca, Provincia de Córdoba</MenuItem>
          <MenuItem value="El Soberbio, Provincia de Misiones">El Soberbio, Provincia de Misiones</MenuItem>
          <MenuItem value="Villa General Roca, Provincia de Córdoba">Villa General Roca, Provincia de Córdoba</MenuItem>
          <MenuItem value="Colonia Suiza, Provincia de Río Negro">Colonia Suiza, Provincia de Río Negro</MenuItem>
          <MenuItem value="San Antonio de los Cobres, Provincia de Salta">San Antonio de los Cobres, Provincia de Salta</MenuItem>
          <MenuItem value="Tilcara, Provincia de Jujuy">Tilcara, Provincia de Jujuy</MenuItem>
          <MenuItem value="El Condor, Provincia de Río Negro">El Condor, Provincia de Río Negro</MenuItem>
          <MenuItem value="Villa Yacanto, Provincia de Córdoba">Villa Yacanto, Provincia de Córdoba</MenuItem>
          <MenuItem value="Cholila, Provincia de Chubut">Cholila, Provincia de Chubut</MenuItem>
          <MenuItem value="Villa La Angostura, Provincia de Neuquén">Villa La Angostura, Provincia de Neuquén</MenuItem>
          <MenuItem value="Santa Ana, Provincia de Misiones">Santa Ana, Provincia de Misiones</MenuItem>
          <MenuItem value="Las Rabonas, Provincia de Córdoba">Las Rabonas, Provincia de Córdoba</MenuItem>
          <MenuItem value="Yavi, Provincia de Jujuy">Yavi, Provincia de Jujuy</MenuItem>
          <MenuItem value="Villa Ciudad Parque Los Reartes, Provincia de Córdoba">Villa Ciudad Parque Los Reartes, Provincia de Córdoba</MenuItem>
          <MenuItem value="Villa Cura Brochero, Provincia de Córdoba">Villa Cura Brochero, Provincia de Córdoba</MenuItem>
          <MenuItem value="Villa Berna, Provincia de Córdoba">Villa Berna, Provincia de Córdoba</MenuItem>
          <MenuItem value="Los Molles, Provincia de San Luis">Los Molles, Provincia de San Luis</MenuItem>
          <MenuItem value="Los Alerces, Provincia de Chubut">Los Alerces, Provincia de Chubut</MenuItem>
          <MenuItem value="Nono, Provincia de Córdoba">Nono, Provincia de Córdoba</MenuItem>
          <MenuItem value="Lago Puelo, Provincia de Chubut">Lago Puelo, Provincia de Chubut</MenuItem>
          <MenuItem value="La Cumbrecita, Provincia de Córdoba">La Cumbrecita, Provincia de Córdoba</MenuItem>
          <MenuItem value="San Pedro de Colalao, Provincia de Tucumán">San Pedro de Colalao, Provincia de Tucumán</MenuItem>
          <MenuItem value="Villa Lago Meliquina, Provincia de Neuquén">Villa Lago Meliquina, Provincia de Neuquén</MenuItem>
          <MenuItem value="Los Hornillos, Provincia de Córdoba">Los Hornillos, Provincia de Córdoba</MenuItem>
          <MenuItem value="Villa Quila Quina, Provincia de Neuquén">Villa Quila Quina, Provincia de Neuquén</MenuItem>
          <MenuItem value="Capilla del Monte, Provincia de Córdoba">Capilla del Monte, Provincia de Córdoba</MenuItem>
          <MenuItem value="El Chocón, Provincia de Neuquén">El Chocón, Provincia de Neuquén</MenuItem>
          <MenuItem value="Maimará, Provincia de Jujuy">Maimará, Provincia de Jujuy</MenuItem>
          <MenuItem value="Miramar, Provincia de Córdoba">Miramar, Provincia de Córdoba</MenuItem>
          <MenuItem value="El Mollar, Provincia de Tucumán">El Mollar, Provincia de Tucumán</MenuItem>
          <MenuItem value="El Hoyo, Provincia de Chubut">El Hoyo, Provincia de Chubut</MenuItem>
          <MenuItem value="Yacanto de Calamuchita, Provincia de Córdoba">Yacanto de Calamuchita, Provincia de Córdoba</MenuItem>
          <MenuItem value="San Roque, Provincia de Córdoba">San Roque, Provincia de Córdoba</MenuItem>
          <MenuItem value="Villa de Las Rosas, Provincia de Córdoba">Villa de Las Rosas, Provincia de Córdoba</MenuItem>
          <MenuItem value="El Maitén, Provincia de Chubut">El Maitén, Provincia de Chubut</MenuItem>
          <MenuItem value="San José de la Dormida, Provincia de Córdoba">San José de la Dormida, Provincia de Córdoba</MenuItem>
          <MenuItem value="Merlo, Provincia de San Luis">Merlo, Provincia de San Luis</MenuItem>
          <MenuItem value="Potrerillos, Provincia de Mendoza">Potrerillos, Provincia de Mendoza</MenuItem>
        </TextField>

        <TextField
          select
          value={selectedPileta}
          onChange={(e) => handleFilterPileta(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Pool />
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Pileta</MenuItem>
          <MenuItem value="si">Sí</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>

        <TextField
          select
          value={orderPrice}
          onChange={(e) => handleOrderPriceChange(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Sort /> Precio
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Ordenar por precio</MenuItem>
          <MenuItem value="asc">Menor a mayor</MenuItem>
          <MenuItem value="desc">Mayor a menor</MenuItem>
        </TextField>
        
        <div className={style.search}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div>
      
      {selectedLocationInfo && !notificationClosed && (
        <div className={style.notification}>
          <p style={{color:"black"}}>
          
        Aquí podrás seleccionar el filtrado para la localidad: 
        <span className={style.colorlocalidad}>{selectedLocationInfo.selectedLocation}</span> 
        que se seleccionó en el ranking n° 
        <span className={style.colorlocalidad}>{selectedLocationInfo.rankingNumber}</span>.
      
          </p>
          <button className={style.closeButton}
           onClick={() => setNotificationClosed(true)}>X</button>
        </div>
      )}
      
      </div>
      <div style={{
        marginTop: "650px",
        marginRight: "100px",
        marginLeft: "-174px",
        marginBottom: "200px"
      }}>
        <Cards products={searchTerm.trim() !== "" ? searchResults : products} />
      </div>
      <div className="paginado">

        </div>
      <div>
     <Ayuda/>
      </div>
    </div>
  );
}

export default Filter;