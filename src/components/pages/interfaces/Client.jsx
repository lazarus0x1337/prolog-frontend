import React, { useState } from "react";
import '../css/style.css';
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Colis from "../client/Colis";
import Vehicules from "../client/Vehicules";
import StepProgress from "../client/StepProgress";
import Image from '../../images/verctbg.jpg';
import axios from "axios";
import img1 from "../../images/logo/prolog1.png";
import img2 from "../../images/logo/prolog2.png";
import sessionStorage from 'sessionstorage';
import Profile from "./Profile";

const styleNavLink = {
    color: "var(--color-font)",
    textDecoration:'none',
    ':hover': {color: "var(--color-font-hover)"}
};



function Client() {
    const navigate = useNavigate();
    const location = useLocation();
    const [id,setId] = useState(new URLSearchParams(location.search).get('id')) // Récupérer la valeur de l'id à partir des query parameters
    const [tk,setTk] = useState(new URLSearchParams(location.search).get('tk'))
    const [fullname,setFullname] = useState(new URLSearchParams(location.search).get('fullname'))
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {  setToggle(!toggle) }

    if(fullname) {
        sessionStorage.setItem("fullname", fullname);
    }
    if(tk) {
        sessionStorage.setItem("token", tk);
    }
    if(id) {
        sessionStorage.setItem("ID", id);
    }

    const [showStep, setShowStep] = useState(true);
    const [showColis, setShowColis] = useState(false);
    const [showVehi, setShowVehi] = useState(false);
    const [showProfile, setshowProfile] = useState(false);
    function handleClick1() {
        setShowStep(true);
        setShowVehi(false);
        setShowColis(false);
        setshowProfile(false);
    }
    function handleClick2() {
        setShowVehi(false);
        setShowStep(false);
        setShowColis(true);
        setshowProfile(false);
    }
    function handleClick3() {
        setShowVehi(true);
        setShowColis(false);
        setShowStep(false);
        setshowProfile(false);
    }
    function handleClick4(){
        setshowProfile(true);
        setShowVehi(false);
        setShowColis(false);
        setShowStep(false);
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
                                 <img src={img2} className="img2"/><img src={img1} className="img1"/>
                                {/*<span className='brand-name' >Welcome</span>*/}
                            </div>
                            <hr style={{borderColor:"var(--color-cercle-small)"}} />
                            <div className='list-group list-group-flush'>

                                <a className='list-group-item py-2' onClick={handleClick1}>
                                    <i className="bi bi-binoculars fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Tracking</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick2} >
                                    <i className="bi bi-box-seam fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>My Packages</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick3} >
                                    <i className="bi bi-truck fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Rented Trucks</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick4} >
                                    <i className="bi bi-person fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Profile</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick3} >
                                    <i className="bi bi-gear fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Setting</NavLink>
                                </a>
                                <a className='list-group-item' onClick={handleLogout}  style={{ position:"absolute",top:"90%",width:"84%"}}>
                                    <i className="bi bi-power fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Logout</NavLink>
                                </a>

                            </div>
                        </div>
                    </div>}

                    {toggle &&  <div className='col-4 col-md-2'/>}
                    <div className='col'>
                        {showStep && <StepProgress Toggle={Toggle}/> }
                        {showColis && <Colis Toggle={Toggle}/> }
                        {showVehi && <Vehicules Toggle={Toggle}/> }
                        {showProfile && <Profile/> }
                    </div>
                </div>
            </div>

        </>
    );
}
export default Client;