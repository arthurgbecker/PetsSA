import React, { useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState = {
    Loading: true,
    isLogged: false,
    nome: '',
    isAdmin: false,
    token: '',
    idUser: '',
    idRestaurant: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case "logIn":
            return { ...state, isLogged: action.payload, Loading: false }
        case "logOut":
            AsyncStorage.removeItem("token")
            return { ...state, isLogged: false }
        case "verify":
            return { 
                ...state, 
                isLogged: true, 
                Loading: false, 
                idUser: action.payload.id, 
                isAdmin: action.payload.admin, 
                nome: action.payload.nome 
            }
        case "update":
            return {
                ...state,
                update: action.payload
            }
        default:
            return state
    }
}

export const Context = React.createContext();

export const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
    
}
