import React from "react";
import CustomCard from "../Card/card"; // Cambiado de Card a CustomCard
import { Grid, Typography } from "@mui/material";
import "./cards.css"; // Importa el archivo CSS donde definiste la clase

const Cards = ({ products }) => {
  const gridSpacing = window.innerWidth < 4 ? 10 : 25;
  const xsSize = products.length < 4 ? 12 / products.length : 3;
  const gridStyle = {
    marginLeft: "-150px", // Desplazar todas las tarjetas 20px hacia la izquierda
  };

  return (
    <Grid container spacing={gridSpacing} className="custom-grid-container" style={gridStyle}>
      {Array.isArray(products) && products.length === 0 ? (
        <Typography variant="body1" color="black" marginLeft= "150px" marginTop="150px" fontSize="25px" border="1px solid red" padding= "10px" borderRadius="5px" backgroundColor="salmon">
          No hay ofertas disponibles.
        </Typography>
      ) : (
        products.map((product) => (
          <Grid item xs={xsSize} key={product.id}>
            <CustomCard 
              id={product.id}
              name={product.name}
              location={product.location}
              season={product.season}
              pricePerNight={product.pricePerNight}
              images={product.images}
              cardWidth="400px" 
              cardHeight="450px" 
            />
          </Grid>//paSubir
        ))
      )}
    </Grid>
  );
};

export default Cards;
