import axios from "./axios";
import useAuth from './useAuth';

const LOGIN_URL = '/api/Account/authenticate';


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const email = auth?.email;
    const password = auth?.password;
    console.log('resrefsh token email owner: ', auth['email']);

    const refresh = async () => {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        console.log(JSON.stringify(response?.data?.data));
        const jwToken = response?.data?.data?.jwToken;
        console.log('jwttoken: ', jwToken);
        setAuth(prev => {
            console.log("previous data: ", JSON.stringify(prev));
            console.log("new jwt token: ", response?.data?.data?.jwToken);
            return { 
                ...prev, 
                jwToken: response?.data?.data?.jwToken,
                roles: response?.data?.data?.roles
            }
        });
        return response?.data?.data?.jwToken;
    }
    return refresh;
};

export default useRefreshToken;