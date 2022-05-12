import { Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';

import Layout from './pages/layout/Layout';
import Myprofile from './pages/myprofile/Myprofile';
import Admin from './pages/admin/Admin';
import Missing from './pages/missing/Missing';
import Unauthorized from './pages/unauthorized/Unauthorized';
import Loung from './pages/loung/Loung';
import LinkPage from './pages/linkpage/LinkPage';
import AllProjects from './pages/allprojects/AllProjects'; 

import RequireAuth from './components/requireauth/RequireAuth';
import PersistLogin from './components/persistlogin/PersistLogin';

import Footer from './components/footer/Footer';


const ROLES = [
    "Basic",
    "Admin",
    "Manager",
    "SuperAdmin",
    "Moderator"
];

function App() {
    return (

        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="linkpage" element={<LinkPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="allprojects" element={<AllProjects />} />

                    {/* we want to protect these routes */}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
                            <Route path="myprofile" element={<Myprofile />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
                            <Route path="admin" element={<Admin />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
                            <Route path="loung" element={<Loung />} />
                        </Route>
                    </Route>
                    {/* catch all */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
