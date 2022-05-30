import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../utils/useRefreshToken";
import useAuth from "../../utils/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    console.log(
        'auth for persist current auth detyail for user: ', auth,
        'current email', auth?.emailAddress,
        'type of email', typeof auth?.emailAddress);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.jwToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [auth?.jwToken, refresh])

    useEffect(() => {
        console.log(`persist isLoading: ${isLoading}`)
        console.log(`persist aT: ${JSON.stringify(auth?.jwToken)}`)
    }, [isLoading, auth?.jwToken])

    console.log('persist objects; ', persist);
    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin