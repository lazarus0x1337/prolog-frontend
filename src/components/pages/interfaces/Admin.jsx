import React, {useEffect, useState} from "react";
import '../css/style.css';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import Colis from "../admin/Colis";
import Containers from "../admin/Containers"
import User from "../admin/User";
import DespoVehicules from "../admin/DespoVehicules";
import img1 from "../../images/logo/prolog1.png";
import img2 from "../../images/logo/prolog2.png";
import sessionStorage from "sessionstorage";
import axios from "axios";
import Profile from "./Profile";
import {GetUserById} from "../../api/user/GetUserById";

const styleNavLink = {
    color: "var(--color-font)",
    textDecoration:'none',
    ':hover': {color: "var(--color-font-hover)"}
};

function Admin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [id,setId] = useState(new URLSearchParams(location.search).get('id')) // Récupérer la valeur de l'id à partir des query parameters
    const [tk,setTk] = useState(new URLSearchParams(location.search).get('tk'))
    const [fullname,setFullname] = useState('');
    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {  setToggle(!toggle) }

    const [role, setRole] = useState('');

    useEffect( () => {

        if(id) {
            sessionStorage.setItem("ID", id);
        }
        if(tk) {
            sessionStorage.setItem("token", tk);
        }
        GetUserById(tk,id).then( us => {
            setUser(us);
            setFullname(us.fullname);
            sessionStorage.setItem("fullname", us.fullname);
        })



    }, []);

    const [showStates, setShowStates] = useState([
        { name: "show1", value: true },
        { name: "show2", value: false },
        { name: "show3", value: false },
        { name: "show4", value: false },
        { name: "show5", value: false },
        { name: "show6", value: false },
        { name: "show7", value: false },
        { name: "show8", value: false },
        { name: "show9", value: false }
    ]);

    function handleClick(name) {
        setShowStates(
            showStates.map((state) =>
                state.name === name ? { ...state, value: true } : { ...state, value: false }
            )
        );
    }


    const handleLogout = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
            }
        };
        axios.post("http://localhost:8080/api/v1/auth/logout",{},config)
            .then(()=>{navigate('/home');})
    }
    return (

        <>
            <div className='container-fluid  min-vh-100 '>
                <div className='row ' style={{position: "relative"}}>
                    {toggle && <div className='col-4 col-md-2 class1 vh-100 position-fixed'>

                        <div className='class2 sidebar p-2' >
                            <div className='sidebar__top m-1'>
                                <img src={img2} className="img2" alt="OK" />
                                <img src={img1} className="img1" alt="OK" />
                            </div>
                            <hr style={{borderColor:"var(--color-cercle-small)"}} />
                            <div className='list-group list-group-flush'>

                                <a className='list-group-item py-2' onClick={() => handleClick("show1")} >
                                    <i className="bi bi-speedometer2 fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Dashboard</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={() => handleClick("show2")} >
                                    <i className="bi bi-boxes fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Packages</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={() => handleClick("show3")} >
                                    <i className="bi bi-grid-1x2 fs-5 me-3"></i>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Containers</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={() => handleClick("show4")} >
                                    <i className="bi bi-people-fill fs-5 me-3"></i>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Customers</NavLink>
                                </a>

                                <a className='list-group-item py-2' onClick={() => handleClick("show5")} >
                                    <i className="bi bi-fuel-pump fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Drivers</NavLink>
                                </a>

                                <a className='list-group-item py-2'  onClick={() => handleClick("show6")} >
                                    <i className="bi bi-person-lines-fill fs-5 me-3"></i>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Managers</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={() => handleClick("show7")} >
                                    <i className="bi bi-shield-lock fs-5 me-3"></i>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Administrators</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={() => handleClick("show8")} >
                                    <i className="bi bi-truck fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Vehicules</NavLink>
                                </a>

                                <a className='list-group-item py-2' onClick={() => handleClick("show9")}>
                                    <i className="bi bi-person fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Profile</NavLink>
                                </a>

                                <a className='list-group-item py-2'  >
                                    <i className="bi bi-gear fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Setting</NavLink>
                                </a>
                                    <a className='list-group-item' style={{ position:"absolute",top:"90%",width:"84%"}}>
                                    <i className="bi bi-power fs-5 me-3"/>
                                    <NavLink onClick={handleLogout}
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Logout</NavLink>
                                </a>

                            </div>
                        </div>
                    </div>}

                    {toggle &&  <div className='col-4 col-md-2'/>}
                    <div className='col'>
                        {showStates.map((state) => (
                            state.value &&
                            <React.Fragment key={state.name}>
                                {state.name === 'show1' && <Dashboard Toggle={Toggle} />}
                                {state.name === 'show2' && <Colis Toggle={Toggle} />}
                                {state.name === 'show3' && <Containers Toggle={Toggle} />}
                                {state.name === 'show4' && <User Toggle={Toggle} role="CLIENT" />}
                                {state.name === 'show5' && <User Toggle={Toggle} role="DRIVER" />}
                                {state.name === 'show6' && <User Toggle={Toggle} role="MANAGER" />}
                                {state.name === 'show7' && <User Toggle={Toggle} role="ADMIN" />}
                                {state.name === 'show8' && <DespoVehicules Toggle={Toggle} />}
                                {state.name === 'show9' && <Profile Toggle={Toggle} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}
export default Admin;