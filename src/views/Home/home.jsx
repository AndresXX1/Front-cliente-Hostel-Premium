import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, CardMedia, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopLocations } from '../../redux/Actions/actions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: '50px'
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    cursor: 'pointer' // Add cursor pointer to indicate clickable
  },
  media: {
    height: 500,
  },

  title: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Sombra para un efecto futurista
    textAlign: 'center', // Centrar el texto
    marginBottom: theme.spacing(2), // Espaciado entre títulos y subtítulos
 },
 subtitle: {
    fontFamily: 'Source Sans Pro',
    color: '#333',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Sombra más suave para el subtítulo
    textAlign: 'center', // Centrar el texto
    marginBottom: theme.spacing(4), // Espaciado entre subtítulos y contenido
 },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const topLocations = useSelector(state => state?.stateA?.topLocations);
  const history = useHistory();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleLocationClick = (location, ranking) => {
    // Redirect to Filter component with selected location info
    history.push('/home', { selectedLocation: location, rankingNumber: ranking });
  };

  useEffect(()=>{
    dispatch(fetchTopLocations())
  },[])

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === topLocations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? topLocations.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
    <section style={{marginTop: "10px"}}>
      <Typography variant="h2" gutterBottom className={classes.title} style={{marginTop:"75px",marginBottom:"-80px"}}>
        ¡Bienvenido a HostelsPremium!
      </Typography>
    </section>

    <section className={classes.section}>
      <Typography variant="h4" gutterBottom className={classes.title} style={{marginTop: "150px", marginBottom: "-50px"}}>
        ¡He aquí los destinos más elegidos por nuestros clientes!
      </Typography>

      <Grid container spacing={4}>
        {topLocations && topLocations.map((location, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} style={{display: index === currentCardIndex ? 'block' : 'none'}}>
            <Card style={{
              height: "500px",
              maxwidth: "700px",
              minWidth: "1800px",
              marginLeft: "20px",
              marginTop: "-100px",
              backgroundColor: "transparent",
              cursor: "pointer" // Añade esta línea para cambiar el cursor a una mano
            }} onClick={() => handleLocationClick(location.productLocation, index + 1)}>
              <CardMedia
                style={{
                  height: "500px",
                }}
                image={`https://source.unsplash.com/featured/?${location.productLocation}`}
                title={location.productName}
              />
              <CardContent>
                <Typography variant="h6" component="h3" color='black'>
                  Puesto #{index + 1}:{location.productLocation}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {location.productName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Botones para ir a la siguiente y anterior tarjeta */}
      { topLocations.length > 1 && (
        <div>
          <Button onClick={goToPreviousCard}>Previous</Button>
          <Button onClick={goToNextCard}>Next</Button>
        </div>
      )}
    </section>
  </div>
  );
};

export default HomePage;