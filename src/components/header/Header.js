import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../projectcard/ProjectCard';

const Header = () => {
    return <>
        <div class="p-5 text-center text-success bg-dark" style={{ marginTop:'0px' }}>
            <h1 class="mb-3">Project Share Point</h1>
            <h4 class="mb-3">Would you like to share your every situation and thought with us? continue to see latest projects</h4>
            <Link class="btn btn-success" to="/allprojects" role="button">Let See Projects</Link>
            
        </div>
    </>
}

export default Header;