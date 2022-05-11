import React from "react"
import { FaAirbnb, FaFoursquare, FaGitSquare } from "react-icons/fa"

const Footer = () => <footer className="page-footer text-light bg-success font-small pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Project Share Point</h5>
                <p>Always Imagine. Go forward and make it! If you want any help. Our team wil be your side.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Contacts</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">psp@info.com</a></li>
                    <li><a href="#!">develop_psp@psp.com</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Socials</h5>
                <ul className="list-unstyled">
                    <li><a href="#!"><FaAirbnb /></a></li>
                    <li><a href="#!"><FaFoursquare /></a></li>
                    <li><a href="#!"><FaGitSquare /></a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="#!"> Ugur AKYEL</a>
    </div>

</footer>

export default Footer