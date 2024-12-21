import {createContext, useContext} from 'react';
import {useCookies} from "react-cookie";
import UserService from "../services/UserService.js";
import {getDate} from "../utils/Helpers.js";
import Cookie from '../utils/Cookies.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [cookies, setCookie] = useCookies(['user', 'access_token'])

    const login = async (loginData) => {
        const user = await UserService.login(loginData)
        setCookie('access_token', user?.access_token, {expires: getDate(7)})
        setCookie('user', JSON.stringify(user), {expires: getDate(7)})
    };

    const registerNewUser = async (data) => {
        const body = await UserService.register(data)
        setCookie('access_token', body.data.access_token, {expires: getDate(7)})
        const user = await UserService.me()
        setCookie('user', JSON.stringify(user), {expires: getDate(7)})
    };

    const isAuthenticated = () => {
        return !!cookies.access_token
    };

    const logout = () => {
        Cookie.remove('access_token');
    };

    return (
        <AuthContext.Provider
            value={{
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
