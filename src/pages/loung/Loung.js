import { Link } from "react-router-dom";

import './loung.scss'
import Header from "../../components/header/Header";


const Lounge = () => {
    return (<>
    <Header content={'This page is specified for ADministrator'} />
     <article className="article-loung">
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </article>
    </>
        
       
    )
}

export default Lounge