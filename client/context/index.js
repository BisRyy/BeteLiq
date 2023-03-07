import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

  const router = useRouter();

  useEffect(() => {
    dispatch({
        type: "LOGIN",
        payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            let res = error.response;
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
              axios 
                .get(`/api/logout`)
                .then((res) => {
                  console.log("/401 error > logout ");
                  dispatch({ type: "LOGOUT" });
                  window.localStorage.removeItem("user");
                  router.push("/login");
                })
                .catch((err) => {
                  console.log("AXIOS INTERCEPTOR LOGOUT ERROR", err);
                  reject(err);
                });
            }
          return Promise.reject(error);
        }
      );

      useEffect(() => {
        const getCsrfToken = async () => {
          const { data } = await axios.get(`/api/csrf-token`);
          // console.log("GET CSRF TOKEN RESPONSE", data);
          axios.defaults.headers["X-CSRF-TOKEN"] = data.csrfToken;
        };
        getCsrfToken();
      }, []);
      

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
