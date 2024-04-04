import * as React from 'react';
import {useForm} from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import usAvatar from '../../../assets/user.png'
import {AuthContext} from '../../../componentes/AuthProvider/authProvider'
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, retrieveReservations } from '../../../redux/Actions/actions';
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function MakeReview(){
    const {register, reset, handleSubmit, setValue} = useForm()
    const [value, estValue] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [dateRevValid, setDateRevValid] = React.useState(false)
    const [hasPostedValid, setHasPostedValid] = React.useState(false)
    const reservations = useSelector(state => state?.stateA?.resPerProduct?.data)
    const reviews = useSelector(state => state?.stateA?.reviews?.data)
    const {auth} = React.useContext(AuthContext);
    const dispatch = useDispatch()/* knkjdfnkjfd */
    const url = window.location.href;
    const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    
    React.useEffect(()=>{
        if (auth){
        dispatch(retrieveReservations(id, auth?.token?.id, "success"))}
    }, [id, auth?.token?.id]) 

    console.log("reservas==>",reservations)
    console.log("reviews==>",reviews)

    React.useEffect(() => {

    const todayDate = moment().utcOffset('-03:30').format('YYYY-MM-DD')

    const endDate = []

    if (reservations){
    reservations?.map (reserv => endDate.push(reserv.endDate))
    console.log("validacion endDate==>", endDate)
    }

    console.log("fecha de hoy===>", todayDate)
    if (endDate?.length > 0){
    const checkEndDate = moment(endDate[0], "YYYY-MM-DD")
    setDateRevValid(checkEndDate.isBefore(todayDate))
    console.log("es anterior? ==>", checkEndDate.isBefore(todayDate))
    console.log(dateRevValid)
    }

    const reviewsCurrentUser = reviews?.filter(review => review?.userId === auth?.token?.id)
    if (reviewsCurrentUser?.length > 0){
        setHasPostedValid(true)
    }
    }, [reservations, reviews]);


    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

 const onSubmit = (data) => {
        console.log(data)
        const dataToSend = {
            ...data,
            userId: auth?.token?.id,
            name: auth?.token?.name,
            profileImage: auth?.token?.imageUrl || usAvatar
        }
        console.log(dataToSend)
        axios.post(`http://localhost:3002/reviews/products/detail/${id}`, dataToSend)
        .then(response => {
            console.log('Reseña enviada exitosamente:', response.data);
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, null);
          });
          reset()
          estValue(0)
          if(response.data){dispatch(fetchReviews(id))
            const reviewsCurrentUser = reviews?.filter(review => review?.userId === auth?.token?.id)
            if (reviewsCurrentUser?.length > 0){
                setHasPostedValid(true)
            }
        }
    })
    .catch(error => {
        console.error('Error al enviar la reseña:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    });
}

console.log(window.location.href)
    

    if (auth && dateRevValid===true && hasPostedValid===false){
        return (
        <div style={{
            marginTop: '75vh',
            marginLeft: '25vh',
            position: "absolute",
            marginBottom: "200px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h5 style={{ 
            textAlign: "center",
            marginLeft: "1vh"
            }} >   ¿Has vacacionado en este sitio 🏨? </h5> 
            <Typography style={{marginLeft: '350px', marginTop: '-30px', position: 'absolute', marginBottom:"5px"}} component="legend">Califica este hospedaje</Typography> 
            <Rating
            style={{marginLeft: '540px', marginTop: '-30px',position: 'absolute'}}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            estValue(newValue)
            setValue('rating', newValue)
            }}
            />
            <input 
            id="rev" 
            style={{
                width: '600px', 
                height: '9vh', 
                marginLeft: "0vh",
                marginBottom: "-5vh",
                position: "absolute"}} 
            type="textarea" 
            {...register('content', { required: true })}></input>
            <button type="submit" style={{height: '9vh', marginLeft:"615px" ,position: 'absolute'}}>Enviar Reseña</button>
            </form>
        </div>
    )}
    if(!auth) {
        return (
            <h4 style={{
             marginTop: '55vh',
             marginLeft: '113vh', 
             position: 'absolute', 
             textAlign: 'center'}}>
            <Link to="/login">Inicia sesión</Link> para dejarnos tus comentarios<br></br>
            y reseñas acerca de tus experiencias en nuestros hospedajes</h4>
        )
    }
    if(auth && hasPostedValid===true){
        return (
            <h4 style={{
                marginTop: '75vh',
                marginLeft: '25vh', 
                width: '70vh',
                position: 'absolute', 
                textAlign: 'center'}}>
            ¡Gracias por tu reseña! ¡Deseamos que hayas 
            tenido una excelente estadía en este hospedaje!</h4>
        )
    }
    if(auth && reservations?.length > 0 && dateRevValid===false){
        return(
        <h4 style={{
            marginTop: '55vh',
            marginLeft: '113vh', 
            position: 'absolute', 
            textAlign: 'center'}}>
           ¡No olvides dejar una reseña aquí al final de tu estadía!<br></br>
           Comparte tu experiencia aquí con los demás usuarios</h4>
           )
    }
}


