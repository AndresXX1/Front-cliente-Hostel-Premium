import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../../redux/Actions/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../AuthProvider/authProvider';
import "./reserva.css"
import axios from 'axios'
import {useForm} from 'react-hook-form'
import moment from 'moment'
import MP from "../../assets/MP.jpg"


const ReservationForm = (props) => {
    
    

    
    
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);
    const {register, handleSubmit, reset, setValue } = useForm()
    const [MPpref, setMPpref] = useState(null)
    const [errDate, setErrDate] = useState(null)
    const [startDate, setStartDate] = useState( new Date());
    const [endDate, setEndDate] = useState();
    const [disabledRanges, setDisabledRanges] = useState(null)
    const [products, setProducts] = useState(props.info)
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        
    if (auth){setIsEnabled(true)}
        const products = props?.info;
        if (products) {
            axios.get(`http://localhost:3002/recervas/reservByProduct/${products?.id}`)
                .then((response) => {
                    setDisabledRanges(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching disabled ranges:', error);
                });
        }
    }, [props?.info]);
    

    console.log("esto viene ====>", disabledRanges)

    /* const disabledRanges = [
        { startDate: ('2024-02-25'), endDate: moment('2024-02-28') },
        // Agrega más rangos de fechas deshabilitadas según lo necesites
    ]; */

    
    console.log("USER ID =>", auth?.token?.id)
    console.log("products =>", props?.info)

    const createPreference = async (data) => {
        try { 
            const body = {
                productId: products?.id, 
                userId: auth?.token?.id, 
                quantity: data.quantity,
                startDate: data.startDate,
                endDate: data.endDate,
                totalGuests: Number(data.guests)
            }
            console.log("LO QUE SE ENVIA AL BACK===>", body)
        const response = await axios.post("http://localhost:3002/payment/create-order", body);

        const url = response.data.link;
        return url
        }   
        catch(error){
            console.log(error)
        }
        }
    
     const handleBuy = async (data) => {
        const url = await createPreference(data);
       if (url){
        setMPpref(url)
        
       }
    } 

    const submit = (data) =>{
        const fechaInicial = new Date(startDate);
        const fechaFinal = new Date(endDate);
        const diferenciaMilisegundos = fechaFinal.getTime() - fechaInicial.getTime();
        const diasDeDiferencia = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        console.log(diasDeDiferencia)
        if(diasDeDiferencia > 0){
            setErrDate(null) 
        const toSend = {
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
            quantity: diasDeDiferencia,
            guests: data.guests
        }
        console.log(toSend)
       handleBuy(toSend) 
       reset()
       Object.keys(data).forEach((fieldName) => {
                  setValue(fieldName, null);
                });} else {
                    setErrDate("La fecha de Salida no puede ser anterior a la fecha de Entrada")
                }

        setStartDate(new Date())
        setEndDate(null)
        
        
    }


     /* kdfk */
    console.log(MPpref)

    return (
        <div className="reservation-container">
            <h2 className='titulo'>Reserva tu estadía en "{products?.name.toUpperCase()}"</h2>
            <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
                <label htmlFor="guests">Cantidad de Huéspedes:</label>
                <input
                    type="number"
                    id="guests"
                    min="1"
                    max="10"
                    onKeyPress={(event) => {        
                    const pattern = /[0-9\b]/;
                    if (!pattern.test(event.key)) {
                    event.preventDefault();
                        }
                    }}
                    disabled={!isEnabled}
                    {...register("guests", { required: true })}
                />
            </div>
            {/* <div className="form-group">
                <label htmlFor="rooms">Cantidad de Habitaciones:</label>
                <input
                    type="number"
                    id="rooms"
                    min="1"
                    max="5"
                    {...register("roomsQuan", { required: true })}
                />
            </div> */}
            <div className="form-group">
                <label htmlFor="checkInDate">Fecha de Entrada:</label>
                <DatePicker
  selected={startDate}
  onChange={date => setStartDate(date)} // Actualiza el estado con la fecha seleccionada
  startDate={startDate}
  endDate={endDate}
  selectsStart // Actualiza la prop para indicar que este es el selector de fecha de inicio
  startDatePlaceholderText="Fecha de inicio"
  endDatePlaceholderText="Fecha de fin"
  minDate={new Date()}
  excludeDates={disabledRanges?.flatMap(range => {
    const dates = [];
    const currentDate = moment(range.startDate);
    const end = moment(range.endDate);
    while (currentDate <= end) {
      dates.push(currentDate.toDate());
      currentDate.add(1, 'days');
    }
    return dates;
  })}
  disabled={!isEnabled}
  dateFormat="yyyy-MM-dd" // Actualiza el formato de fecha
/>

            </div>
            <div className="form-group">
                <label htmlFor="checkOutDate">Fecha de Salida:</label>
                <DatePicker
  selected={endDate}
  onChange={date => setEndDate(date)} // Actualiza el estado con la fecha seleccionada
  startDate={startDate}
  endDate={endDate}
  selectsEnd // Actualiza la prop para indicar que este es el selector de fecha de fin
  startDatePlaceholderText="Fecha de inicio"
  endDatePlaceholderText="Fecha de fin"
  minDate={startDate} // Asegura que la fecha de fin no pueda ser anterior a la fecha de inicio
  excludeDates={disabledRanges?.flatMap(range => {
    const dates = [];
    const currentDate = moment(range.startDate);
    const end = moment(range.endDate);
    while (currentDate <= end) {
      dates.push(currentDate.toDate());
      currentDate.add(1, 'days');
    }
    return dates;
  })}
  disabled={!isEnabled}
  dateFormat="yyyy-MM-dd" // Actualiza el formato de fecha
/>
            </div>
                {errDate && <p style={{color: "red"}}>{errDate}</p>}
               <button type="submit" disabled={!isEnabled}>Iniciar Reserva</button> 
            </form>
           {MPpref && <a href={MPpref}>
           <img src={MP} style={{
                        'cursor': 'pointer',
                        "marginTop": "-5vh",
                        "marginLeft": "17vh",
                        "width": "25vh",
                        "height": "6vh"
                        }
                        } />
           </a>
           }          
        </div>
    );
};

export default ReservationForm;


