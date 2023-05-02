import React, { useState } from "react";
import '../css/style.css';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import img1 from "../../images/logo/prolog1.png";
import img2 from "../../images/logo/prolog2.png";
import Image from '../../images/verctbg.jpg';
import Colis from "../manager/Colis";
import Container from "../manager/Container";
import sessionStorage from "sessionstorage";
import axios from "axios";
import Driver from "../manager/Driver";

const styleNavLink = {
    color: "var(--color-font)",
    textDecoration:'none',
    ':hover': {color: "var(--color-font-hover)"}
};

function Manager() {

    const navigate = useNavigate();
    const location = useLocation();
    const [id,setId] = useState(new URLSearchParams(location.search).get('id'))
    const [tk,setTk] = useState(new URLSearchParams(location.search).get('tk'))
    const [fullname,setFullname] = useState(new URLSearchParams(location.search).get('fullname'))
    if(fullname) {
        sessionStorage.setItem("fullname", fullname);
    }
    if(tk) {
        sessionStorage.setItem("token", tk);
    }
    if(id) {
        sessionStorage.setItem("ID", id);
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
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {  setToggle(!toggle) }

    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);


    function handleClick1() {
        setShow1(true);
        setShow2(false);
        setShow3(false);
        setShow4(false);

    }
    function handleClick2() {
        setShow1(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);

    }
    function handleClick3() {
        setShow1(false);
        setShow2(false);
        setShow3(true);
        setShow4(false);

    }
    function handleClick4() {
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(true);

    }
    function handleClick5() {

    }
    return (

        <>
            <div className='container-fluid  min-vh-100 ' >
                <div className='row ' style={{position: "relative"}}>
                    {toggle && <div className='col-4 col-md-2 class1 vh-100 position-fixed'>

                        <div className='class2 sidebar p-2' >
                            <div className='sidebar__top m-1'>
                                <img src={img2} className="img2"/>
                                <img src={img1} className="img1"/>
                            </div>
                            <hr style={{borderColor:"var(--color-cercle-small)"}} />
                            <div className='list-group list-group-flush'>

                                <a className='list-group-item py-2' onClick={handleClick1}>
                                    <i className="bi bi-box-seam fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Colis</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick2} >
                                    <i className="bi bi-boxes fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Container</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick3} >
                                    <i className="bi bi-fuel-pump fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Drivers</NavLink>
                                </a>
                                <a className='list-group-item py-2'  >
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
                        {show1 && <Colis Toggle={Toggle} /> }
                        {show2 && <Container Toggle={Toggle} /> }
                        {show3 && <Driver Toggle={Toggle}/> }
                        {/*{show4 && <Setting Toggle={Toggle} /> }*/}
                    </div>
                </div>
            </div>

        </>
    );
}
export default Manager;