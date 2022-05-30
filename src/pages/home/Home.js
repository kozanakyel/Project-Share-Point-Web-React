import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header";
import useLogout from "../../utils/useLogout";
import useRefreshToken from "../../utils/useRefreshToken";
import useAuth from './../../utils/useAuth';
import classes from '../../App.module.scss';
import { useState, useEffect } from 'react';

import { projectData } from "../../traindata/projectdata";
import ProjectCard from "../../components/projectcard/ProjectCard";
import axios from "../../utils/axios";

import createRandomImg from '../../traindata/projectdata';


import './home.scss';


const Home = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const navigate = useNavigate();
    const logout = useLogout();

    const [projectName, setName] = useState('');
    const [category, setCategory] = useState('');
    const [textContent, setTextContent] = useState('');

    const [success, setSuccess] = useState(false);

    const [projects, setProjects] = useState([]);

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    console.log('home auth', auth);

    const homeHeader = `Welcome ${auth?.emailAddress} Now we are ready explore your new ideas!`;

    const submit = async (e) => {
        e.preventDefault();


        console.log('beararre for project', auth?.jwToken, projectName, textContent, category);

        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth?.jwToken}`,
            "Accept-Post": "*/*"
        }

        try {
            const response = await axios.post('/api/Projects',
                JSON.stringify({
                    projectName,
                    category,
                    textContent
                }),
                {
                    headers: headers

                }
            );
            console.log('response data', response);
            console.log('status', response.status, 'typr of', typeof (response.status));
            localStorage.setItem("data", JSON.stringify(response));
            const saved = localStorage.getItem("data");
            console.log('before parsed', saved)
            let savedObject = JSON.parse(saved);
            console.log('saved data after parsed', savedObject.data);
            if (response.status === 201) {
                setSuccess(true);
                localStorage.clear();
            } else {

                localStorage.clear();
            }

        } catch (err) {
            if (!err?.response) {
                console.log('error  post projects');
            }

        }
    }

    useEffect(() => {
        axios.get("/api/Projects")
            .then(function (response) {
                console.log('projects get data ', response);
                localStorage.setItem("dataP", JSON.stringify(response?.data));
                const saved = localStorage.getItem("dataP");
                const savedObject = JSON.parse(saved);
                console.log(savedObject);

                setProjects(savedObject);

            });
    }, [])





    return <>
        <Header content={homeHeader} />
        <section className="home-page">
            <div className="flexGrow">
                <button onClick={() => refresh()}>Refresh token</button>
                <button onClick={signOut}>Sign Out</button>
                <button><Link to="/myprofile"> MyProfile page</Link></button>
                <button><Link to="/lounge">Lounge</Link></button>
                <button><Link to="/linkpage">link page</Link></button>
            </div>
            <hr />
            <h1>Create New Project</h1>


            <main className={classes["form-signin"]}>
                {success ? (
                    <section style={{ marginBottom: 100 }}>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/allprojects">Lets See All Projects!!</Link>
                        </p>
                    </section>
                ) : (
                    <section>
                        <form onSubmit={submit} className="form-signin">
                            <label htmlFor="title">title:</label>
                            <input
                                style={{ width: 500 }}
                                type="text"
                                id="title"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={projectName}
                                required
                            />

                            <label htmlFor="category">category:</label>
                            <input
                                style={{ width: 500 }}
                                type="text"
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required
                            />
                            <label htmlFor="content">content:</label>
                            <textarea
                                style={{ width: 500 }}
                                id="content"
                                onChange={(e) => setTextContent(e.target.value)}
                                value={textContent}
                                required
                            />
                            <button>Create Project</button>
                            <p>
                            </p>
                        </form>

                    </section>
                )}
            </main>
        </section>
        <article className='bg-dark ' style={{ padding: "100px" }}>
            <div className="all-projects-content">
                <h3 className="text-success">My Projects</h3>
                {projects.map((e, i) => {
                    return (
                        <div key={i}>
                            <ProjectCard
                                avatar={e.projectName.charAt(0).toUpperCase()}
                                title={e.projectName}
                                date={e.dateCreated}
                                image={createRandomImg()}
                                content={e.projectContent}
                                comments={[]} />
                        </div>
                    );
                })}
            </div>
        </article>
    </>;
};

export default Home;