import ProjectCard from "../../components/projectcard/ProjectCard";
import CategoryCard from "../../components/categorycard/CategoryCard";

import { catData } from "../../traindata/catdata";
import { projectData } from "../../traindata/projectdata";
import { useState, useEffect } from 'react';
import axios from "../../utils/axios";

import createRandomImg from '../../traindata/projectdata';

import './allprojects.scss';


const AllProjects = () => {

    const [projects, setProjects] = useState([]);
    
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
    
    
    return (<>
        <div className="p-5 text-center text-success bg-light" style={{ marginTop: '0px' }}>
            <h1 className="mb-3">Project Share Point</h1>
            <h4 className="mb-3">Lets dive into our imaginary world. Invite and survive.</h4>
            <div className="category-box">
                {catData.map((e, i) => {
                    return (
                        <div key={i}>
                            <CategoryCard name={e.name} content={e.content} />
                        </div>
                    );
                })}

            </div>


        </div>
        <article className='bg-dark ' style={{ padding: "100px" }}>
            <div className="all-projects-content">
                {projects.map((e, i) => {
                    return (
                        <div key={i}>
                            <ProjectCard
                                avatar={e.projectName.charAt(0).toUpperCase()}
                                title={e.projectName}
                                date={e.dateCreated}
                                image={createRandomImg()}
                                content={e.projectContent}
                                comments={[]}
                                projectId={e.projectId} />
                        </div>
                    );
                })}
            </div>
        </article>
    </>

    )
}

export default AllProjects