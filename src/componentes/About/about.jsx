import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Container, Grid, Typography, Card, CardContent, CardMedia, Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import './About.css'


const useStyles = makeStyles((theme) => ({

  container: {
    backgroundColor: 'transparent',
    padding: theme.spacing(2), 
    borderRadius: '8px', 
    maxWidth: '1500px', 
    margin: '0 auto', 
    marginTop: theme.spacing(2), 
    marginBottom: theme.spacing(0), 
  },
  appBar: {
    backgroundColor: '#0d0d0e',
    marginBottom: theme.spacing(2),
    marginTop: '57px'
  },
  navItem: {
    marginRight: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  cardMedia: {
    height: 200,
    backgroundSize: 'cover',
  },
  cardContent: {
    backgroundColor: '#f5f5f5',
  },
  contactInfo: {
    backgroundColor: 'rgba(98, 99, 105, 0.7)',
    color: '#ffffff',
    padding: theme.spacing(2),
    marginTop: theme.spacing(0),
    borderRadius: '40px',
    height: '320px'
  },
  contactItem: {
    marginBottom: theme.spacing(1),
  },
  serviceListContainer: {
    backgroundColor: 'rgba(98, 99, 105, 0.7)',
    color: '#ffffff',// Gris con transparencia
    padding: theme.spacing(2), // Ajusta según sea necesario
    borderRadius: '40px', // Borde redondeado
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
      <AppBar position="static" className={classes.appBar}>
        <Container>
          <Typography variant="h6" className={classes.navItem}>
            Conoce más de nosotros
          </Typography>
        </Container>
      </AppBar>
      
      <Container>
        <section className={classes.section}>
          <Typography variant="h4">Qué hacemos</Typography>
          <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
      En nuestro servicio, ofrecemos reservas de cabañas para unas vacaciones inolvidables. Nos especializamos en brindar experiencias únicas y acogedoras para nuestros clientes.
    </Typography>
          <Card className={classes.section}>
            <CardMedia
              className={classes.cardMedia}
              image="https://fondosmil.com/fondo/8004.jpg"
              title="Cabaña"
            />
          </Card>
        </section>

        <section className={classes.section}>
          <Typography variant="h4">Regístrate y descubre</Typography>
          <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
            Nos enorgullecemos de ofrecer a nuestros clientes la oportunidad de registrarse y descubrir los mejores lugares para vacacionar. Cuidamos cada detalle para garantizar una experiencia única y sorprendente en cada visita.
          </Typography>
        </section>

        <section className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Nuestros puntos fuertes</Typography>
              <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
                Nuestra principal prioridad es proporcionar una estancia excepcional para nuestros huéspedes. Nos esforzamos por la excelencia en cada aspecto, desde la comodidad de nuestras cabañas hasta la eficiencia de nuestro servicio.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <section className={classes.section}>
  
  <div className={classes.serviceListContainer}>
  <Typography variant="h5">Conoce nuestros servicios</Typography>
    <List>
      {['Desayuno incluido.', 'Canales de televisión satelital', 'Posibilidad de estacionar vehículos', 'Cocina con refrigerador', 'Cama y ropa de cama incluida'].map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} className={classes.List} />
        </ListItem>
      ))}
    </List>
  </div>
</section>
            </Grid>
            <Grid item xs={12} sm={6}>
              
              <Card className={classes.contactInfo}>
              <Typography variant="h5">Ponte en contacto con nosotros</Typography>
                <List>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Teléfono: 123-456-789" />
                  </ListItem>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Facebook: @cabañascbv" />
                  </ListItem>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Instagram: @cabañassvd" />
                  </ListItem>
                </List>
                <Divider />
                <Typography variant="body2" className={classes.contactItem}>
                  ¡Agréganos para mantenerte actualizado con nuestras últimas ofertas y novedades!
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </section>
      </Container>
      </div>
      </div>
  );
}

export default About;