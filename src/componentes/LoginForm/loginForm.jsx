import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import axios from "axios";
import styles from "./loginForm.module.css";
import { AuthContext } from "../AuthProvider/authProvider";
import * as ReactRedux from 'react-redux';
import { checkGoogleId } from "../../redux/Actions/actions";
import { registerUser } from "../../redux/Actions/actions";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError: setFormError, clearErrors } = useForm();
  const [errorState, setErrorState] = useState(null);
  const history = useHistory();
  const { setAuth } = useContext(AuthContext); 
  const [error, setError] = useState(null);
  const dispatch = ReactRedux.useDispatch()
  const googlecheck = ReactRedux.useSelector(state => state.stateA.checkGoogle)
  const clientID = '1066333447186-evqflps97jn0k7585c92i4ve45g64hoj.apps.googleusercontent.com'

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3002/users/login', data);
      if (response.data) {
        
        const authData = {
          token: response.data,
        };
        console.log("se esta haciendo el login", authData)
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); 
        history.push("/");
      } else {
        setErrorState('Error: The response is not valid');
      }
    } catch (error) {
      setErrorState('Error al iniciar sesión: ' + error.message);
    }
  };//dsdad

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);


  const onSuccess = async (response) => {
   

    try {
        dispatch(checkGoogleId(response.profileObj.googleId));
        if (googlecheck.data) {
          const toLogIn = {
            email: googlecheck.data.email,
            password: googlecheck.data.password
          }
          onSubmit(toLogIn)
            console.log("GoogleUser ya registrado", googlecheck.data)
            history.push("/");
        } else {
            const toSend = {
                name: response.profileObj.givenName,
                surName: response.profileObj.familyName,
                email: response.profileObj.email,
                password: "Google10.",
                googleId: response.profileObj.googleId
            };
           await dispatch(registerUser(toSend));
           const LogIn = {
            email: response.profileObj.email,
            password: "Google10."
           }
           onSubmit(LogIn)
            console.log("Es tu primera vez con logIn de Google, te hemos registrado")        
        }
    } catch (error) {
        console.error('Error en checkGoogleId:', error);
    }
    history.push("/home");
};

   const onFailure = () => {
    setError("Algo salió mal");
  };


  const handleEmailChange = (e) => {
    clearErrors("email");
    const value = e.target.value;
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError("email", {
        type: "manual",
        message: "Ingrese un correo electrónico válido",
      });
    }
  };

  const handlePasswordChange = (e) => {
    clearErrors("password");
    const value = e.target.value;
    if (
      !value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setFormError("password", {
        type: "manual",
        message:
          "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.borde}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "El correo electrónico es requerido" })}
              onChange={handleEmailChange}
              className={errors.email ? `${styles.input} ${styles.error}` : styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div className={styles.passwordInputContainer}>
            <label htmlFor="password">Contraseña:</label>
            <div className={styles.passwordInput}>
              <input
                type="password"
                id="password"
                {...register("password", { required: "La contraseña es requerida" })}
                onChange={handlePasswordChange}
                className={errors.password ? `${styles.input} ${styles.error}` : styles.input}
              />
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
        <div className={styles.google}>
          <GoogleLogin
            clientId="1066333447186-evqflps97jn0k7585c92i4ve45g64hoj.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            redirectUri='http://localhost:5173/home'
          />
        </div>
        <p className="text-center mt-3" style={{color: 'black', marginLeft: '5px'}} >¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        {errorState && <p className={styles.error}>{errorState}</p>} 
      </div>
    </div>
  );
} 
