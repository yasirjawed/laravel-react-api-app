import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({children}) => {
    const [user,setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // const [token, _setToken] = useState(123);
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    // Auto fetch user if token exists
    // useEffect(() => {
    //     if (token && !user.id) {
    //         axiosClient.get('/me')
    //         .then(({ data }) => {
    //             setUser(data.user);
    //         })
    //         .catch(() => {
    //             setUser(null);
    //             setToken(null);
    //         });
    //     }
    // }, [token]);

    const logout = () => {
        setUser({})
        setToken(null)
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            logout
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
