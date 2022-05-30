
import { Link } from "react-router-dom"
import Header from "../../components/header/Header";

import './linkpage.scss';


const LinkPage = () => {
    return (<>
    <Header content={'Content of the site and Routing center'} />
        <article className="article-linkpage">
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/myprofile">MyProfile Page</Link>
            <Link to="/admin">Admin Page</Link>
        </article>
    </>
    )
}

export default LinkPage