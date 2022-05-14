import ProjectCard from "../../components/projectcard/ProjectCard";
import CategoryCard from "../../components/categorycard/CategoryCard";

import { catData } from "../../traindata/catdata";
import { projectData } from "../../traindata/projectdata";

import './allprojects.scss';


const AllProjects = () => {
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
    </>

    )
}

export default AllProjects