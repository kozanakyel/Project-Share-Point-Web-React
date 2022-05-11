import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './../../utils/useAuth';

import axios from './../../utils/axios';

import classes from '../../App.module.scss';


const LOGIN_URL = '/api/Account/authenticate';


/**
 *      SuperAdmin,
        Admin,
        Manager,    //Added after lab course
        Moderator,
        Basic
 * */

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data?.data));

            const jwToken = response?.data?.data?.jwToken;
            const roles = response?.data?.data?.roles;
            console.log(jwToken, roles);
            setAuth({ email, password, roles, jwToken });
            setEmail('');
            setPassword('');

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }



    return (
        <>
            <main className={classes["form-signin"]}>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login In</h1>
                    <form onSubmit={handleSubmit} className="form-signin">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Login in In</button>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                {/*put router link here*/}
                                <Link to="/register">Register in</Link>
                            </span>
                        </p>
                    </form>

                </section>
            </main>
        </>
    )
};

export default Login;