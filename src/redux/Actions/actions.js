import axios from "axios";
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_SEARCH_BY_NAME,
    NO_EVENTS,
    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILURE,
    CLEAR_SEARCH_RESULTS,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_PAYMONTH_FAILURE,
    UPDATE_USER_PAYMONTH_SUCCESS,
    UPDATE_USER_PAYMONTH_REQUEST,
    FETCH_REVIEWS_FAILURE,
    FETCH_REVIEWS_REQUEST,
    FETCH_REVIEWS_SUCCESS,
    GET_FAVORITES_FAILURE,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    DELETE_FAVSTATE,
    CREATE_RESERVATION_FAILURE,
    CREATE_RESERVATION_SUCCESS,
    CHECK_GOOGLEUSER_EXISTANCE_REQUEST,
    CHECK_GOOGLEUSER_EXISTANCE_SUCCESS,
    CHECK_GOOGLEUSER_EXISTANCE_FAILURE,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_FAILURE,
    RETRIEVE_RESERVATIONS_REQUEST,
    RETRIEVE_RESERVATIONS_SUCCESS,
    RETRIEVE_RESERVATIONS_FAILURE,
    FETCH_TOP_LOCATIONS_REQUEST,
  FETCH_TOP_LOCATIONS_SUCCESS,
  FETCH_TOP_LOCATIONS_FAILURE,
  GET_ALL_USERS_SUCCESS
} from "../action-types/action-types";

import {
  START_RESERVATION_PROCESS,
  START_RESERVATION_SUCCESS,
  START_RESERVATION_FAILURE,
  CONCLUDE_RESERVATION
} from "../action-types/action-types-BuyReservation"

export const setUserData = (userData) => {
    return {
      type: SET_USER_DATA,
      payload: userData,
    };
  };
  
  export const clearUserData = () => {
    return {
      type: CLEAR_USER_DATA,
    };
  };

  export const registerUser = (datauser) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:3002/users/create",
        datauser
      );
      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response && error.response.status ===  400) {
        if (error.response.data.error === "Ya existe un usuario registrado con este email") {
          dispatch({ type: CREATE_USER_FAILURE, payload: "Ya existe un usuario registrado con este email" });
        } else {
          dispatch({ type: CREATE_USER_FAILURE, payload: error.response.data.error || "Error desconocido" });
        }
      } else {
        dispatch({ type: CREATE_USER_FAILURE, payload: "Error interno del servidor." });
      }
    }
  };/* https://back-hostel.onrender.com/ */

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get(`http://localhost:3002/products/search/${name}`);
      const searchName = apiData.data;
      return dispatch({
        type: GET_SEARCH_BY_NAME,
        payload: searchName,
      });
    } catch (e) {
      console.log(e.response.data);
      return dispatch({
        type: NO_EVENTS,
        payload: e.response.data,
      });
    }
  };
};

export const newHotel = (hotel) => {
    return (dispatch) => {
      dispatch({ type: NEW_HOTEL_REQUEST });
      axios.post('http://localhost:3002/products/create', hotel)
        .then(response => {
          dispatch({
            type: NEW_HOTEL_SUCCESS,
            payload: response.data 
          });/* dnfnjd */
        })
        .catch(error => {
          dispatch({
            type: NEW_HOTEL_FAILURE,
            payload: error.message 
          });
        });
    };
  };

  export const getAllProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST }); 
        console.log("Fetching products...");
        const response = await axios.get('http://localhost:3002/products/'); 
        const products = response.data;
        console.log("Products received:", products);
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };

  export const searchProducts = (name) => async (dispatch) => {
    dispatch({ type: SEARCH_PRODUCTS_REQUEST });
  
    try {
      const response = await fetch(`http://localhost:3002/products/search/${name}`);
      const data = await response.json();
  
      if (response.ok) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: data.productsFound,
        });
      } else {
        throw new Error(data.message || 'Failed to search products');
      }
    } catch (error) {
      dispatch({
        type: SEARCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };


  export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
  });
GET_ALL_USERS_REQUEST

  export const fetchProducts = (filters, page, pageSize) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
      try {
        const response = await axios.get('http://localhost:3002/products/filter', {
          params: { ...filters, page: page ||  1, pageSize: pageSize ||  6 },
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const { products, totalCount, totalPages } = response.data;
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: { products, totalCount, totalPages } });
      } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };

  

  export const updateUserProfileRequest = () => ({
    type: UPDATE_USER_PROFILE_REQUEST,
  });
  
  export const updateUserProfileSuccess = (data) => ({
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: data,
  });
  
  export const updateUserProfileFailure = (error) => ({
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: error,
  });
  

  export const updateUserProfileData =
    (idKey, updatedFields) => async (dispatch) => {
      dispatch(updateUserProfileRequest());
  
      try {
        const response = await axios.put(
          `http://localhost:3002/users/perfil/${idKey}`,
          updatedFields
        );
  
        dispatch(updateUserProfileSuccess(response.data));
      } catch (error) {
        console.error("Error al actualizar datos de usuario:", error);
        dispatch(
          updateUserProfileFailure(error.response?.data || "Error en el servidor")
        );
      }
    };



 
    
    export const updatePasswordRequest = () => ({
      type: UPDATE_PASSWORD_REQUEST,
    });
    
    export const updatePasswordSuccess = () => ({
      type: UPDATE_PASSWORD_SUCCESS,
    });
    
    export const updatePasswordFailure = (error) => ({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error,
    });
    
    //action para el pasww
    export const updatePassword = (id, currentPassword, newPassword) => {
      return async (dispatch) => {
        dispatch(updatePasswordRequest());
    
        try {
          const response = await fetch(
            `http://localhost:3002/users/perfil/updatepassword/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                currentPassword,
                newPassword,
              }),
            }
          );
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error (${response.status}): ${errorData.message}`);
          }
    
          dispatch(updatePasswordSuccess());
        } catch (error) {
          dispatch(updatePasswordFailure(error.message));
        }
      };
    };
  

    export const updateUserRequest = () => ({
      type: UPDATE_USER_REQUEST,
    });
    
    export const updateUserSuccess = () => ({
      type: UPDATE_USER_SUCCESS,
    });
    
    export const updateUserFailure = (error) => ({
      type: UPDATE_USER_FAILURE,
      payload: error,
    });
    
    //action para modificar el mail
    export const updateUser = (id, updatedFields) => {
      return async (dispatch) => {
        dispatch(updateUserRequest());
    
        try {
          console.log("Datos enviados al servidor:", { id, updatedFields });
    
          const response = await fetch(
            `http://localhost:3002/users/perfil/update/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedFields),
            }
          );
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          dispatch(updateUserSuccess());
        } catch (error) {
          console.error("Error en la acción:", error);
          dispatch(updateUserFailure(error.message));
        }
      };
    };


    // action para agregar tarjeta
export const updateUserpay = (userId, paymentMethods) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_PAYMONTH_REQUEST });

    try {
      const response = await fetch(
        `http://localhost:3002/users/${userId}/paymentMethods`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentMethods), // Envía solo los datos de la tarjeta, no un objeto anidado
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar paymentMethods");
      }

      const updatedProfile = await response.json();

      dispatch({
        type: UPDATE_USER_PAYMONTH_SUCCESS,
        payload: updatedProfile,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PAYMONTH_FAILURE,
        payload: error.message || "Error al actualizar el perfil del usuario",
      });
    }
  };
};

export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST
});

export const fetchReviewsSuccess = (data) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: data
});

export const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error
});

export const fetchReviews = (ID) => {
  return async (dispatch) => {
    dispatch(fetchReviewsRequest());
    try {
      const response = await axios.get(`http://localhost:3002/reviews/products/${ID}`);
      const data = response.data;
      console.log(typeof data, data)
      if (data) {
        dispatch(fetchReviewsSuccess(data));
      } else {
        dispatch(fetchReviewsSuccess(["No hay reviews"]));
      }
    } catch (error) {
      dispatch(fetchReviewsFailure(error.message));
    }
  };
};




const getFavoritesRequest = () => ({
  type: GET_FAVORITES_REQUEST
});


const getFavoritesSuccess = (data) => ({
  type: GET_FAVORITES_SUCCESS,
  payload: data
});

const getFavoritesFailure = (error) => ({
  type: GET_FAVORITES_FAILURE,
  payload: error
});


export const getFavorites = (id) => {
  return async (dispatch) => {
    dispatch(getFavoritesRequest());

    try {
      const response = await axios.get(`http://localhost:3002/favorites/get/${id}`);
      dispatch(getFavoritesSuccess(response.data));
    } catch (error) {
      dispatch(getFavoritesFailure(error));
    }
  };
};


export const deleteFavState = () => ({
  type: DELETE_FAVSTATE,
  data: {
    data: [],
    loading: false,
    error: null
  }
});


export const createReservation = (productId, userId, startDate, endDate, totalRooms, totalGuests) => {
  return async (dispatch) => {
    try {
    
      const response = await axios.post('http://localhost:3002/recervas/new', {
        productId,
        userId,
        startDate,
        endDate,
        totalRooms,
        totalGuests,
      });

    
      dispatch(createReservationSuccess(response.data));
    } catch (error) {
  
      dispatch(createReservationFailure(error.message));
    }
  };
};


const createReservationSuccess = (reservation) => ({
  type: CREATE_RESERVATION_SUCCESS,
  payload: reservation,
});

const createReservationFailure = (error) => ({
  type: CREATE_RESERVATION_FAILURE,
  payload: error,

});

//para mp

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    try {
      const response = await axios.get("http://localhost:3002/users");
      const users = response.data;
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: users });
    } catch (error) {
      dispatch({ type: GET_ALL_USERS_FAILURE, payload: error.message });
    }
  };
};

const startReservationProcess = () => {
  return {
      type: START_RESERVATION_PROCESS
  };
};

const startReservationSuccess = (reservationData) => {
  return {
      type: START_RESERVATION_SUCCESS,
      payload: reservationData
  };
};

const startReservationFailure = (errorMessage) => {
  return {
      type: START_RESERVATION_FAILURE,
      payload: errorMessage
  };
};

export const concludeReservation = () => {
  return {
      type: CONCLUDE_RESERVATION
  };
};


export const startReservation = (reservationData) => {
  return async (dispatch) => {
      dispatch(startReservationProcess());

      try {
          dispatch(startReservationSuccess(reservationData));
      } catch (error) {
          dispatch(startReservationFailure(error.message));
      }
  };
};

export const checkGoogleId = (GoogleID) => {
  return async (dispatch) => {
    dispatch(checkGoogleIdRequest());

    try {
      const response = await axios.get(`http://localhost:3002/users/detail/${GoogleID}`);
      dispatch(checkGoogleIdSuccess(response.data));
      console.log(response.data)
    } catch (error) {
      dispatch(checkGoogleIdFailure(error.message));
      console.log(error.message)
    }
  };
};

const checkGoogleIdRequest = () => {
  return {
    type: CHECK_GOOGLEUSER_EXISTANCE_REQUEST
  };
};

const checkGoogleIdSuccess = (userData) => {
  return {
    type: CHECK_GOOGLEUSER_EXISTANCE_SUCCESS,
    payload: userData
  };
};

const checkGoogleIdFailure = (errorMessage) => {
  return {
    type: CHECK_GOOGLEUSER_EXISTANCE_FAILURE,
    payload: errorMessage
  };
};

export const retrieveReservations = (productId, userId, reserved) => {
  return (dispatch) => {

      dispatch({ type: RETRIEVE_RESERVATIONS_REQUEST });
      axios.post('http://localhost:3002/recervas/get', 
      { 
        productId: productId,
        userId: userId,
        reserved: reserved 
      } )
          .then((response) => {
              dispatch({
                  type: RETRIEVE_RESERVATIONS_SUCCESS,
                  payload: response.data 
              });
          })
          .catch((error) => {
              
              dispatch({
                  type: RETRIEVE_RESERVATIONS_FAILURE,
                  error: error.message 
              });
          });
  };
};

export const fetchTopLocations = () => {
  return async (dispatch) => {
    dispatch(fetchTopLocationsRequest());
    try {
      const response = await axios.get('http://localhost:3002/recervas/rankLocation');
      // Asegúrate de que estás accediendo a los datos correctamente
      const locations = response.data.map(location => ({
        productId: location.productId,
        reservationCount: location.reservationCount,
        productName: location.productName,
        productLocation: location.productLocation
      }));
      dispatch(fetchTopLocationsSuccess(locations));
    } catch (error) {
      dispatch(fetchTopLocationsFailure(error.message));
    }
  };
};

export const fetchTopLocationsRequest = () => ({
  type: FETCH_TOP_LOCATIONS_REQUEST
});

export const fetchTopLocationsSuccess = (locations) => ({
  type: FETCH_TOP_LOCATIONS_SUCCESS,
  payload: locations
});

export const fetchTopLocationsFailure = (error) => ({
  type: FETCH_TOP_LOCATIONS_FAILURE,
  payload: error
});