import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import useLogout from "../../utils/useLogout";
import useRefreshToken from "../../utils/useRefreshToken";




const Home = () => {
    const refresh = useRefreshToken();
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }
    
    return <>
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/myprofile">Go to the MyProfile page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={() => refresh()}>Refresh token</button>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    </>;
};

export default Home;