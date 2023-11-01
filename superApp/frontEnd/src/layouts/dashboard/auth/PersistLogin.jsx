import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
// @mui
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import PuffLoader from "react-spinners/PuffLoader";

// hooks
import {useAuth} from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }catch(err){
                console.log(err);
            }finally {
                setIsLoading(false);
            }
        }
        
        verifyRefreshToken();

        return (() => {isMounted = false}) 
    }, []);

    return (
        <>
        {isLoading? 
            <div style ={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <PuffLoader color={'blue'}  sx={{ justifyContent: 'center', alignItems: 'center' }}/>
            </div>
        :
            <> 
            <Outlet />
            </>}
        </>
    )
}

export default PersistLogin;