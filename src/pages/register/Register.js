import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { BiCheckboxChecked } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import axios from './../../utils/axios';

import classes from '../../App.module.scss';

import Header from "../../components/header/Header";


const USER_REGEX = /^[A-z][A-z0-9-_]{5,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstname] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstFocus, setFirstFocus] = useState(false);

    const [lastName, setLastname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [username, setUsername] = useState('');


    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //const [confirmPassword, setConfirmpassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    //const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(USER_REGEX.test(firstName));
    }, [firstName])

    /**
     useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === confirmPassword);
        console.log(validMatch);
    }, [password, confirmPassword, validMatch])
     */
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password.length >= 8);
        console.log(password);
    }, [password, validMatch])



    useEffect(() => {
        setErrMsg('');
    }, [firstName, password /*, confirmPassword] */])

    const submit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(firstName);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        console.log(firstName, password);

        try {
            const response = await axios.post('/api/Identity/registration',
                JSON.stringify({
                    firstName,
                    lastName,
                    emailAddress,
                    username,
                    password
                    //confirmPassword
                }),
                {
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                    
                }
            );
            console.log('response data', response);
            console.log('status', response.status, 'typr of', typeof(response.status));
            localStorage.setItem("data", JSON.stringify(response));
            const saved = localStorage.getItem("data");
            console.log('before parsed', saved)
            let savedObject = JSON.parse(saved);
            console.log('saved data after parsed', savedObject.data);
            if (response.status === 200) {
                setSuccess(true);
                localStorage.clear();
            } else {
                setErrMsg('Not confirmed please try again!');
                localStorage.clear();
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Firstname Taken');
            } else {
                setErrMsg('registration failed')
            }
            errRef.current.focus();
        }

    }

    const registerContent = 'Sign up and take the first step to a new world with us';

    return <>
        <Header content={registerContent} />
        <main className={classes["form-signin"]}>
            {success ? (
                <section style={{ marginBottom: 100 }}>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Login In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={submit} className="form-signin">
                        <label htmlFor="firstName">
                            Firstname:
                            <BiCheckboxChecked className={validFirstName ? "valid" : "hide"} />
                            <FaTimes className={validFirstName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-control"
                            placeholder="name66"
                            required
                            type="text"
                            id="firstName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={e => setFirstname(e.target.value)}
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                        />
                        <p id="uidnote" className={firstFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>

                            6 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <input className="form-control" placeholder="lastname66" required
                            onChange={e => setLastname(e.target.value)}
                        />
                        <input type="email" className="form-control" placeholder="char66@example.com"
                            onChange={e => setEmailAddress(e.target.value)}
                        />
                        <input className="form-control" placeholder="username" required
                            onChange={e => setUsername(e.target.value)}
                        />

                        <label htmlFor="password">
                            Password:

                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="123Pa$$word"
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>

                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        {/**
                         <label htmlFor="confirm_pwd">
                            Confirm Password:

                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="123Pa$$word"
                            onChange={e => setConfirmpassword(e.target.value)}
                            id="confirm_pwd"
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>

                            Must match the first password input field.
                        </p>


                         */}

                        <button
                            className="w-100 btn btn-lg btn-primary"
                            type="submit"
                            disabled={!validFirstName || !validPwd /*|| !validMatch ? true : false*/}
                        >
                            Submit
                        </button>
                    </form>
                </section>
            )}
        </main>
    </>;
};

export default Register;