import { Link } from 'react-router-dom';
import style from './Landing.module.css'
import ImageGallery from '../../componentes/ImageGallery/ImageGallery'

const Landing=()=>{
 const images=['https://tse1.mm.bing.net/th?id=OIP.gy0hB8b8-0YvJ3ODBAql6QHaEo&pid=Api&P=0&h=180','https://image.freepik.com/foto-gratis/amigos-divirtiendose-alrededor-fogata-noche_109710-4520.jpg','https://tse3.mm.bing.net/th?id=OIP.1-a6tn9mc0gwS1c2OfR-9gHaE7&pid=Api&P=0&h=180','https://tse1.mm.bing.net/th?id=OIP.RP5Eh4uosoD6ZgnX2cqDAwHaFj&pid=Api&P=0&h=180','https://www.interpatagonia.com/plantillas/grandes/33579-00Gr.jpg','https://casasrusticas.org/wp-content/uploads/2021/12/cabanas-rusticas-de-piedra-y-madera-01-1024x683.jpg','https://images.mirai.com/INFOROOMS/100120276/09Tb4L1tXTdhiaVkF2UT/09Tb4L1tXTdhiaVkF2UT_large.jpg','https://i.pinimg.com/originals/ce/8d/fe/ce8dfe3b7a548e752b95085e8766e551.jpg']
     
 
 return(
       <div className={style.cajita}>
          <Link to='/home'>
          <button className={style.miboton}>Comenzar</button>
          </Link>   
          <header className={style.hed}>
           <h1>¡Descubre tu escape perfecto!</h1>
          <h2>Reserva tu cabaña ideal para unas vacaciones inolvidables</h2>
          <p>Explora nuestro oasis de paz y tranquilidad en medio de la naturaleza.¡Bienvenido a tu refugio vacacional!</p>
         </header>

<ImageGallery images={images}/>
<p className={style.parrafo}>Además de disfrutar de nuestras cómodas cabañas, puedes explorar la belleza natural de la zona, hacer senderismo en los senderos cercanos, o disfrutar de una cena en los restaurantes locales.</p>
<footer className={style.foot}>
 <div>
    <div class="row">
      <div class="col-md-12">
        <p>Derechos de autor © 2024.  Todos los derechos reservados.    </p>
      </div>
    </div>
  </div>
</footer>
</div>)}

export default Landing;