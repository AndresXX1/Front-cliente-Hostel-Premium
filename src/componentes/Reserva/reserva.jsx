import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../../redux/Actions/actions'
import { AuthContext } from '../AuthProvider/authProvider';
import "./reserva.css"
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import MP from "../../assets/MP.jpg"


const ReservationForm = (props) => {
    
    initMercadoPago('TEST-cffc0dca-c449-485c-b1f5-64e41cd2c3d2', 
    {locale: "es-AR"}
    );
    const [products, setProducts] = useState({});
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);
    const {register, handleSubmit, reset, setValue } = useForm()
    const [MPpref, setMPpref] = useState(null)
    const [errDate, setErrDate] = useState(null)
    const info = useSelector(state => state.stateB.reservData.reservation)
    console.log("USER ID =>", auth.token.id)

    const createPreference = async (data) => {
        try { 
            const body = {
                productId: info.products.id, 
                quantity: data.quantity,
                userId: auth.token.id, 
                startDate: data.startDate,
                endDate: data.endDate,
                totalGuests: data.guests
            }
            console.log(body)
        const response = await axios.post("https://back-hostel.onrender.com/payment/create-order", body);
        console.log(response)
        console.log(response.data)
        const url = response.data;
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
        console.log(setMPpref)
       }
    } 

    const submit = (data) =>{
        const fechaInicial = new Date(data.startDate);
        const fechaFinal = new Date(data.finDate);
        const diferenciaMilisegundos = fechaFinal.getTime() - fechaInicial.getTime();
        const diasDeDiferencia = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
        console.log(diasDeDiferencia)
        if(diasDeDiferencia > 0){
            setErrDate(null) 
        const toSend = {
            startDate: data.startDate,
            endDate: data.finDate,
            quantity: diasDeDiferencia,
            guests: data.guests
        }
       handleBuy(toSend) 
       reset()
       Object.keys(data).forEach((fieldName) => {
                  setValue(fieldName, null);
                });} else {
                    setErrDate("La fecha de Salida no puede ser anterior a la fecha de Entrada")
                }
        
        
    }


     
    console.log(MPpref)

    return (
        <div className="reservation-container">
            <h2 className='titulo'>Reserva tu estadía en "{info.products.name}"</h2>
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
                <input
                    type="date"
                    id="checkInDate"
                    {...register("startDate", { required: true })}        
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkOutDate">Fecha de Salida:</label>
                <input
                    type="date"
                    id="checkOutDate"
                    {...register("finDate", { required: true })}
                />
            </div>
                {errDate && <p style={{color: "red"}}>{errDate}</p>}
               <button type="submit">Reservar</button> 
            </form>
            
          
        </div>
    );
};

export default ReservationForm;


/* onClick={()=>{handleBuy(event)}} */