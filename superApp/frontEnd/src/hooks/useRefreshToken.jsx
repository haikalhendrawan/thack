import axios from "axios";
import {useAuth} from "./useAuth";


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth(); // {user_id:xxx, username: xx, nik:xx, name:xx, accessToken, role:[xx],msg:xx}
    const refresh = async() => {
        const response = await axios.get("http://localhost:3031/refresh", {  
            withCredentials:true
        });
        const {username, role, accessToken, msg} = response.data;
        setAuth({...auth, username, role, accessToken, msg});
        return accessToken;
    }

    return refresh;
}

export default useRefreshToken;