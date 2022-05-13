import ProjectCard from "../../components/projectcard/ProjectCard";
import CategoryCard from "../../components/categorycard/CategoryCard";

import './allprojects.scss';


const AllProjects = () => {
    return (<>
        <div class="p-5 text-center text-success bg-light" style={{ marginTop: '0px' }}>
            <h1 class="mb-3">Project Share Point</h1>
            <h4 class="mb-3">Lets dive into our imaginary world. Invite and survive.</h4>
            <div className="category-box">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>


        </div>
        <article className='bg-dark ' style={{ padding: "100px" }}>
            <div className="all-projects-content">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>


        </article>
    </>

    )
}

export default AllProjects