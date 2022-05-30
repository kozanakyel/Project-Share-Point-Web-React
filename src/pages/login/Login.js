import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './../../utils/useAuth';

import axios from './../../utils/axios';

import classes from '../../App.module.scss';
import Header from '../../components/header/Header';


const LOGIN_URL = '/api/Identity/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [emailAddress, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(emailAddress, password);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ emailAddress, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response));

            const jwToken = response?.data?.token;
            const roles = ["Basic"];
            console.log('token login ', jwToken, roles);
            setAuth({ emailAddress, password, roles, jwToken });
            setEmailAddress('');
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


    const headerLogin = 'Would you like to share your every situation and thought with us? continue to see latest projects';

    return (
        <>
            <Header content={headerLogin} />
            <main className={classes["form-signin"]}>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className="form-signin">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            value={emailAddress}
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
                        <button>Login in</button>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                {/*put router link here*/}
                                <Link to="/register">Register</Link>
                            </span>
                        </p>
                    </form>

                </section>
            </main>
        </>
    )
};

export default Login;