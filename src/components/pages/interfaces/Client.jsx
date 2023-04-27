import React, { useState } from "react";
import '../css/style.css';
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Colis from "../client/Colis";
import Vehicules from "../client/Vehicules";
import StepProgress from "../client/StepProgress";
import Image from '../../images/verctbg.jpeg';
import axios from "axios";
const divStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    width:'auto',
};
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

    const [showStep, setShowStep] = useState(true);
    const [showColis, setShowColis] = useState(false);
    const [showVehi, setShowVehi] = useState(false);

    function handleClick1() {
        setShowStep(true);
        setShowVehi(false);
        setShowColis(false);
    }
    function handleClick2() {
        setShowVehi(false);
        setShowStep(false);
        setShowColis(true);
    }
    function handleClick3() {
        setShowVehi(true);
        setShowColis(false);
        setShowStep(false);
    }


    const handleLogout = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${tk}` // Ajouter le token dans l'en-tête d'autorisation
            }
        };
        axios.post("http://localhost:8080/api/v1/auth/logout",{},config)
            .then(()=>{navigate('/home');})
    }

    return (

        <>
            <div className='container-fluid  min-vh-100 ' style={divStyle}>
                <div className='row '>
                    {toggle && <div className='col-4 col-md-2 class1 vh-100 position-fixed'>

                        <div className='class2 sidebar p-2'>
                            <div className='sidebar__top m-1'>
                                {/*<i className="bi bi-caret-right-fill"/>*/}
                                <span className='brand-name' >Welcome</span>
                            </div>
                            <hr className='text-dark' />
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
                                        className={ (navClass) =>                                                navClass.isActive ? "nav__active nav__link" : "nav__link"}>Rented Trucks</NavLink>
                                </a>

                                <a className='list-group-item py-2' onClick={handleLogout} >
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
                        {showStep && <StepProgress Toggle={Toggle} fullname={fullname}/> }
                        {showColis && <Colis Toggle={Toggle} id={id} tk={tk} fullname={fullname}/> }
                        {showVehi && <Vehicules Toggle={Toggle} fullname={fullname}/> }

                    </div>
                </div>
            </div>

        </>
    );
}
export default Client;