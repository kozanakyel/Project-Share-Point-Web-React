import { Link } from "react-router-dom"

const Myprofile = () => {
    return (
        <section>
            <h1>My Profile Page</h1>
            <br />
            <p>You must have been assigned an my projects and update personel information role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Myprofile