import { useReducer, createContext, useEffect } from "react";

// initial state
const initialState = {
  user: null,
};

// context
const Context = createContext();

// root reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};


// provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
        type: "LOGIN",
        payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};



export { Context, Provider };
