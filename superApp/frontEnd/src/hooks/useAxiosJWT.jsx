import {useEffect} from "react";
import axiosJWT from "../config/axios";
import {useAuth} from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosJWT = () => {
    const {auth} = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
    const requestIntercept = axiosJWT.interceptors.request.use((config) => {
        if(!config.headers.Authorization){
            config.headers.Authorization = `Bearer ${auth?.accessToken}`
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    });

    const responseIntercept = axiosJWT.interceptors.response.use((resp) => {
        return resp
    }, (error) => {
        const prevRequest = error?.config;
        if(error?.resp?.status ==="403" && !prevRequest?.sent){
            const newAccessToken = refresh();
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosJWT(prevRequest);
        }
        return Promise.reject(error);
    });

    return () => {
        axiosJWT.interceptors.request.eject(requestIntercept);
        axiosJWT.interceptors.response.eject(responseIntercept);
    }

}, [auth, refresh])
    return axiosJWT;
}

export default useAxiosJWT;

