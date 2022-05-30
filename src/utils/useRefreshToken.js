import axios from "./axios";
import useAuth from './useAuth';

//const LOGIN_URL = '/api/Account/authenticate';
const PSP_lOGIN = 'https://projectsharepointapi.azurewebsites.net/api/Identity/login';


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const emailAddress = auth?.emailAddress;
    const password = auth?.password;
    console.log('resrefsh token email owner: ', auth['emailAddress']);

    const refresh = async () => {
        const response = await axios.post(PSP_lOGIN,
            JSON.stringify({ emailAddress, password }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        console.log(JSON.stringify(response?.data));
        const jwToken = response?.data?.token;
        console.log('jwttoken: ', jwToken);
        const roles = ["Basic"];
        setAuth(prev => {
            console.log("previous data: ", JSON.stringify(prev));
            console.log("new jwt token: ", response?.data?.token);
            return { 
                ...prev, 
                jwToken: response?.data?.token,
                roles: roles
            }
        });
        console.log('refresh first return', auth?.jwToken)
        return auth?.jwToken;
    }
    console.log('refresh OBJECT', refresh);
    return refresh;
};

export default useRefreshToken;