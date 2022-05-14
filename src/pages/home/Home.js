import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header";
import useLogout from "../../utils/useLogout";
import useRefreshToken from "../../utils/useRefreshToken";
import useAuth from './../../utils/useAuth';
import classes from '../../App.module.scss';
import { useState } from 'react';

import { projectData } from "../../traindata/projectdata";
import ProjectCard from "../../components/projectcard/ProjectCard";


import './home.scss';


const Home = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const navigate = useNavigate();
    const logout = useLogout();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    console.log('home auth', auth);

    const homeHeader = `Welcome ${auth?.email} Now we are ready explore your new ideas!`;

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
                <section>
                    <form onSubmit={() => { }} className="form-signin">
                        <label htmlFor="title">title:</label>
                        <input
                            style={{ width: 500 }}
                            type="text"
                            id="title"
                            autoComplete="off"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
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
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required
                        />
                        <button>Create Project</button>
                        <p>
                        </p>
                    </form>

                </section>
            </main>
        </section>
        <article className='bg-dark ' style={{ padding: "100px" }}>
            <div className="all-projects-content">
            <h3 className="text-success">My Projects</h3>
                {projectData.map((e, i) => {
                    return (
                        <div key={i}>
                            <ProjectCard
                                avatar={e.avatar}
                                title={e.title}
                                date={e.date}
                                image={e.image}
                                content={e.content}
                                comments={e.comments} />
                        </div>
                    );
                })}
            </div>
        </article>
    </>;
};

export default Home;