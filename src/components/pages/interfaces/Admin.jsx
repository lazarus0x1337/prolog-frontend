import React, { useState } from "react";
import '../css/style.css';
import { NavLink } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import Managers from "../admin/Managers";
import Clients from "../admin/Clients";
import Driver from "../admin/Driver";
import DespoVehicules from "../admin/DespoVehicules";
import axios from "axios";
import img1 from "../../images/logo/prolog1.png";
import img2 from "../../images/logo/prolog2.png";
import Image from '../../images/verctbg.jpg';
import StepProgress from "../client/StepProgress";
import Colis from "../client/Colis";
import Vehicules from "../client/Vehicules";

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

function Admin() {
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {  setToggle(!toggle) }

    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);

    function handleClick1() {
        setShow1(true);
        setShow2(false);
        setShow3(false);
        setShow4(false);
        setShow5(false);
    }
    function handleClick2() {
        setShow1(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);
        setShow5(false);
    }
    function handleClick3() {
        setShow1(false);
        setShow2(false);
        setShow3(true);
        setShow4(false);
        setShow5(false);
    }
    function handleClick4() {
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(true);
        setShow5(false);
    }
    function handleClick5() {
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(false);
        setShow5(true);
    }
    return (

        <>
            <div className='container-fluid  min-vh-100 ' style={divStyle}>
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
                                    <i className="bi bi-speedometer2 fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Dashboard</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick3} >
                                    <i className="bi bi-box fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Containers</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick3} >
                                    <i className="bi bi-table fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Costumers</NavLink>
                                </a>
                                <a className='list-group-item py-2' onClick={handleClick2} >
                                    <i className="bi bi-person-gear fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Managers</NavLink>
                                </a>

                                <a className='list-group-item py-2' onClick={handleClick4} >
                                    <i className="bi bi-fuel-pump fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Drivers</NavLink>
                                </a>

                                <a className='list-group-item py-2' onClick={handleClick5} >
                                    <i className="bi bi-truck fs-5 me-3"/>
                                    <NavLink
                                        style={styleNavLink}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Vehicules</NavLink>
                                </a>

                                <a className='list-group-item py-2' >
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
                        {show1 && <Dashboard Toggle={Toggle} /> }
                        {show2 && <Managers Toggle={Toggle} /> }
                        {show3 && <Clients Toggle={Toggle}/> }
                        {show4 && <Driver Toggle={Toggle} /> }
                        {show5 && <DespoVehicules Toggle={Toggle} /> }
                    </div>
                </div>
            </div>

        </>
    );
}
export default Admin;