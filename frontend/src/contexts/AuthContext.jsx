import { createContext, useContext, useEffect, useState } from 'react'
import {useCookies} from "react-cookie";
import UserService from "../services/UserService.js";
import {getDate} from "../utils/Helpers.js";
import Cookie from '../utils/Cookies.js';
import LoadingIndicator from '../components/LoadingIndicator.jsx'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [cookies, setCookie] = useCookies(['access_token'])
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = cookies.access_token;

            if (!!token && !currentUser) {
                try {
                    const user = await UserService.me();
                    setCurrentUser(user);
                } catch (error) {
                    logout();
                }
            }

            setIsLoading(false);
        };

        initializeAuth();
    }, [currentUser]);


    const login = async (loginData) => {
        const user = await UserService.login(loginData)
        setCookie('access_token', user?.access_token, {expires: getDate(7)})
    };

    const registerNewUser = async (data) => {
        const user = await UserService.register(data)
        setCookie('access_token', user.access_token, {expires: getDate(7)})
    };

    const isAuthenticated = () => {
        return !!cookies.access_token
    };

    const logout = () => {
        Cookie.remove('access_token');
        setCurrentUser(null);
    };

    if (isLoading) {
        return <><LoadingIndicator /></>;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated,
                login,
                registerNewUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    return useContext(AuthContext);
}
