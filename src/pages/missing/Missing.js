import { Link } from "react-router-dom";

import './missing.scss';
import Header from "../../components/header/Header";

const missingContent = 'This page not constructed yet!!!';

const Missing = () => {
    return (<>
    <Header content={missingContent} />
        <article className="article-missing">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    </>
        
    )
}

export default Missing